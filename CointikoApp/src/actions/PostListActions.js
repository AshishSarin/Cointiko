import { PostListActions } from "./Types";
import { getLatestPost, getLatestBlockPost } from "../processors";
import { GetPostCodes, PostCategoriesCodes } from "../utils";
import { ErrorMsg } from "../values";



export const updatePostList = (offset) => {
    return (dispatch) => {
        console.log('updateNewsList called');
        dispatch({ type: PostListActions.UPDATE_POST_LIST });

        getLatestPost(offset)
            .then(response => {
                if (response.getPostsStatus == GetPostCodes.GET_POST_SUCCESS) {
                    // post was succesfully fetched from api
                    // dispatch it to reducer
                    dispatch({
                        type: PostListActions.UPDATE_POST_LIST_SUCCESS,
                        payload: response.postList
                    });
                } else {
                    // post fetch operation failed
                    updatePostListFail(dispatch, response.error);
                }
            })
            .catch(error => {
                console.log(error);
                updatePostListFail(dispatch, "Error in getting posts");
            })
    }
}

export const refreshPostList = (afterPostId) => {
    return (dispatch) => {
        console.log('refreshPostList called');
        dispatch({ type: PostListActions.REFRESH_POST_LIST });

        getLatestPost(offset)
            .then(response => {
                if (response.getPostsStatus == GetPostCodes.GET_POST_SUCCESS) {
                    // post was succesfully fetched from api
                    // dispatch it to reducer
                    dispatch({
                        type: PostListActions.REFRESH_POST_LIST_SUCCESS,
                        payload: response.postList
                    });
                } else {
                    // post fetch operation failed
                    updatePostListFail(dispatch, response.error);
                }
            })
            .catch(error => {
                console.log(error);
                refreshPostListFail(dispatch, "Error in getting posts");
            })
    }
}

export const savePost = (postId) => {
    return {
        type: PostListActions.SAVE_POST,
        payload: postId
    }
}


const updatePostListFail = (dispatch, errMsg) => {
    dispatch({ type: PostListActions.UPDATE_POST_LIST_FAIL, error: errMsg });
}


const refreshPostListFail = (dispatch, errMsg) => {
    dispatch({ type: PostListActions.REFRESH_POST_LIST_FAIL, error: errMsg });
}

