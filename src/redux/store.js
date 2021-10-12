import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from 'redux-thunk'

import rootReducer from './rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
);


export default store;
