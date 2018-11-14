import update from 'react-addons-update';
import { PostListActions } from '../actions/Types';
const INITIAL_STATE = {
    savePostList: []
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostListActions.SAVE_POST:
            return update(state, {
                savePostList: { $push: [action.payload] }
            });
        default:
            return state;
    }
}