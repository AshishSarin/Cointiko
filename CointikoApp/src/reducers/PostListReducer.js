import update from 'react-addons-update';
import { PostListActions } from "../actions/Types";

const INITIAL_STATE = {
    // initial state objects for home post list
    postList: [], featuredPostList: [], isPostListLoading: false,
    errorPostLoading: "", isAllPostLoaded: false
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PostListActions.UPDATE_POST_LIST:
            return update(state, {
                isPostListLoading: { $set: true },
                errorPostLoading: { $set: "" }
            });

        // return { ...state, isPostListLoading: true, errorPostLoading: "" };
        case PostListActions.UPDATE_POST_LIST_SUCCESS: {
            let newPostList = [];
            if (state.postList.length === 0) {
                // length of initial list is 0
                // add an extra item for caraousel
                newPostList.push({});
            }
            newPostList.push(...action.payload);
            let featuredList = [];
            if (state.featuredPostList.length === 0 && newPostList.length > 0) {
                for (let k = 1; k < 6 && k < newPostList.length; k++) {
                    featuredList.push(newPostList[k])
                }
            }
            return update(state, {
                isPostListLoading: { $set: false },
                isAllPostLoaded: { $set: (action.payload.length === 0) },
                postList: { $push: newPostList },
                featuredPostList: { $push: featuredList }
            });
        }
        case PostListActions.UPDATE_POST_LIST_FAIL:
            return update(state, {
                isPostListLoading: { $set: false },
                errorPostLoading: { $set: action.error }
            });
        // return { ...state, isPostListLoading: false, errorPostLoading: action.error };

        default:
            return state;
    }
}

const getUpdatedList = (oldList, newList) => {
    return oldList.push(...newList);
}