import { PostListActions } from "../actions/Types";

const INITIAL_STATE = {
    postList: [],
    isPostListLoading: false,
    errorPostLoading: "",
    isAllPostLoaded: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostListActions.UPDATE_POST_LIST:
            return { ...state, isPostListLoading: true, errorPostLoading: "" };
        case PostListActions.UPDATE_POST_LIST_SUCCESS: {
            let updatedPostList = state.postList;
            if (updatedPostList.length === 0) {
                // length of initial list is 0
                // add an extra item for caraousel
                updatedPostList.push({});
            }
            updatedPostList.push(...action.payload);
            let isAllLoaded = false;
            if (action.payload.length === 0) {
                // empty post list
                isAllLoaded = true;
            } else {
                isAllLoaded = false;
            }
            return { ...state, postList: updatedPostList, isPostListLoading: false, isAllPostLoaded: isAllLoaded };
        }
        case PostListActions.UPDATE_POST_LIST_FAIL:
            console.log(action.error);
            return { ...state, isPostListLoading: false, errorPostLoading: action.error };
        default:
            return state;
    }
}