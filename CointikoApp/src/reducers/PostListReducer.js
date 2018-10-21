import { PostListActions } from "../actions/Types";

const INITIAL_STATE = {
    postList: [],
    isPostListLoading: false,
    errorPostLoading: "",
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostListActions.UPDATE_POST_LIST:
            return { ...state, isPostListLoading: true };
        case PostListActions.UPDATE_POST_LIST_SUCCESS: {
            let updatedPostList = state.postList;
            if (updatedPostList.length === 0) {
                // length of initial list is 0
                // add an extra item for caraousel
                updatedPostList.push({});
            }
            updatedPostList.push(...action.payload);
            return { ...state, postList: updatedPostList, isPostListLoading: false };
        }
        case PostListActions.UPDATE_POST_LIST_FAIL:
            return { ...state, isPostListLoading: false, errorPostLoading: action.error };
        default:
            return state;
    }
}