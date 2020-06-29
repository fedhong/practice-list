import { createStore, applyMiddleware } from 'redux';
import counterReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import { watchIncrementAsync, watchDecrementAsync } from '../sagas/index'

const sagaMiddleware = createSagaMiddleware();
const store = createStore(counterReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watchIncrementAsync);
sagaMiddleware.run(watchDecrementAsync);

export default store;