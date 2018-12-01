import update from 'react-addons-update';
import { PostListActions } from '../actions/Types';
const INITIAL_STATE = {
    savePostList: []
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostListActions.SAVE_POST:
            if (state.savePostList.findIndex(post => post.id === action.payload.id) === -1) {
                return update(state, {
                    savePostList: { $push: [action.payload] }
                });
            }
            return state;

        case PostListActions.REMOVE_SAVED_POST:

            let indexToRemove = state.savePostList.findIndex(post => post.id === action.payload);
            if (indexToRemove !== -1) {
                return update(state, {
                    savePostList: { $splice: [[indexToRemove, 1]] }
                });
            }
            return state;

        default:
            return state;
    }
}