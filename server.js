const fs = require('fs-extra');
const path = require('path');
// 用来压缩的成 zip
const archiver = require('archiver');
// 要上传的文件名
const uploadDirName = 'web-oms';
// 压缩的格式
const fileType = 'zip';
// 要丢进压缩包的静态文件路径
const buildPath = 'build';
// 要上传的文件路径
const uploadFilePath = path.resolve(__dirname, `${uploadDirName}.${fileType}`);

try {
  fs.copySync(path.resolve(__dirname, './public/favicon.ico'), path.resolve(__dirname, buildPath, 'favicon.ico'));
  fs.copySync(path.resolve(__dirname, buildPath), path.resolve(__dirname, uploadDirName, uploadDirName));

  // 如果是生产环境，压缩成 zip 
  if (process.env.NODE_ENV === 'production') {
    // 如果存在之前的压缩文件，删除
    if (fs.existsSync(uploadFilePath)) {
      fs.unlinkSync(uploadFilePath);
    }
    // 设置输出文件名
    const outputFileName = fs.createWriteStream(uploadFilePath);
    // 设置压缩格式和级别
    const archive = archiver(fileType, {
      zlib: { level: 9 }
    });
    // 抛出错误
    archive.on('error', function (err) {
      throw err;
    });
    archive.pipe(outputFileName);
    // 从打包后的文件路径中把要压缩的文件丢进来
    archive.directory(uploadDirName, false);
    // 执行压缩
    archive.finalize();
    // 压缩完成
    console.log(`压缩完成，在根目录中，文件名：${uploadDirName}.${fileType}`);
  }

} catch (error) {
  console.log(error);
};