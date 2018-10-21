import { combineReducers } from 'redux';
import HomeReducer from './HomeReducers';
import PostListReducer from './PostListReducer';

export default combineReducers({
    home: HomeReducer,
    posts: PostListReducer
})