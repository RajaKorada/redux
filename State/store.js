import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root';
// import sessionsReducer from './reducers/sessions';
import logMiddleware from './middlewares/log';
import apiMiddleware from './middlewares/api';
import errorMiddleware from './middlewares/error';


const store = createStore( rootReducer,  applyMiddleware(apiMiddleware,logMiddleware,errorMiddleware));

window.store = store;

export default store;