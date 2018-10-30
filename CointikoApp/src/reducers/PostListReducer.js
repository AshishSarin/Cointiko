import { PostListActions } from "../actions/Types";

const INITIAL_STATE = {
    // initial state objects for home post list
    postList: [], featuredPostList: [], isPostListLoading: false,
    errorPostLoading: "", isAllPostLoaded: false,
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostListActions.UPDATE_POST_LIST:
            return { ...state, isPostListLoading: true, errorPostLoading: "" };
        case PostListActions.UPDATE_POST_LIST_SUCCESS: {
            let featuredList = state.featuredPostList;
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
            if (featuredList.length === 0 && updatedPostList.length > 0) {
                for (let k = 1; k < 6 && k < updatedPostList.length; k++) {
                    featuredList.push(updatedPostList[k])
                }
            }
            return {
                ...state, postList: updatedPostList,
                isPostListLoading: false, isAllPostLoaded: isAllLoaded,
                featuredPostList: featuredList
            };
        }
        case PostListActions.UPDATE_POST_LIST_FAIL:
            return { ...state, isPostListLoading: false, errorPostLoading: action.error };
        default:
            return state;
    }
}

const getUpdatedList = (oldList, newList) => {
    return oldList.push(...newList);
}