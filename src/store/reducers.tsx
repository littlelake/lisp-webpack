import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/**
 * @descriptio 生成reducer
 * @param {any} asyncReducers 异步reducer 
 */
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers,
    routing: routerReducer
  });
};

export default makeRootReducer;