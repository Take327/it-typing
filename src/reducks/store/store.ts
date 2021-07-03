import userReducer from '../user/reducers'
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
    combineReducers(
        { user: userReducer }
    ),
    applyMiddleware(thunk));

export default store;