import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';

import { routes } from './routes';
import configureStore from './store/configureStore';

import { PrivateRoute } from './components/location';

import registerServiceWorker from './registerServiceWorker';

import './assets/public.scss';
import './assets/iconfont/iconfont.css';

const isLogin = sessionStorage.getItem('isLogin');

const store = configureStore();
const history = createHistory();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route path="/" exact={true} render={() => (
            isLogin ? <Redirect to='/pay/welcome' /> : <Redirect to='/pay/home' />
          )} />
          {
            routes.map((route, i) => (
              <PrivateRoute key={i} {...route} />
            ))
          }
          {
            // 如果找不到当前路由，那么根据是否登录来进行页面的跳转
            isLogin ? <Redirect to='/pay/welcome' /> : <Redirect to='/pay/home' />
          }
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
};

// Do this once
registerServiceWorker();

// Render once
render();