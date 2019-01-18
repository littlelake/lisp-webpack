import { Main } from '../components/main';

import { Home } from './home';

/**
 * routes 路由数组
 */
export const routes = [{
  path: '/pay',
  component: Main,
  routes: [
    { path: '/pay/home', component: Home, title: '首页' },
  ]
}];

/**
 * reducer
 */
export const reducers = {
};