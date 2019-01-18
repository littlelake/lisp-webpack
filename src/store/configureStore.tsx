import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import makeRootReducer from './reducers';
import { reducers } from '../routes';

const configureStore = (initialState?: any) => {
  const environment = window || this;
  const history = createHistory();
  const historyMiddleware = routerMiddleware(history);
  const middlewares = [thunkMiddleware, historyMiddleware];

  const store: any = createStore(
    makeRootReducer(reducers),
    initialState,
    compose(
      applyMiddleware(...middlewares),

      // 开发环境下给 redux 配置开发工具
      process.env.NODE_ENV === 'development' && environment.__REDUX_DEVTOOLS_EXTENSION__ ?
        environment.__REDUX_DEVTOOLS_EXTENSION__() :
        f => f
    )
  );

  // 支持webpack reducer 热替换
  if ((module as any).hot) {
    (module as any).hot.accept('./reducers', () => {
      const reducer = require('./reducers').default;
      store.replaceReducer(reducer(store.asyncReducers));
    });
  }

  return store;
};

export default configureStore;