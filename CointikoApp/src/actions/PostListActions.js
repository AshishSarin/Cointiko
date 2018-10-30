import { PostListActions } from "./Types";
import { getLatestPost, getLatestBlockPost } from "../processors";
import { GetPostCodes, PostCategoriesCodes } from "../utils";
import { ErrorMsg } from "../values";



export const updatePostList = (offset) => {
    // return { type: NewsListActions.UPDATE_NEWS_LIST_SUCCESS };
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




const updatePostListFail = (dispatch, errMsg) => {
    dispatch({ type: PostListActions.UPDATE_POST_LIST_FAIL, error: errMsg });
}

