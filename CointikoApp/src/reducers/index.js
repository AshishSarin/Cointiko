import { combineReducers } from 'redux';
import HomeReducer from './HomeReducers';
import PostListReducer from './PostListReducer';
import savePostReducer from './SavePostReducer';
import CoinReducer from './CoinReducer';

export default combineReducers({
    home: HomeReducer,
    posts: PostListReducer,
    save: savePostReducer,
    coin: CoinReducer
})