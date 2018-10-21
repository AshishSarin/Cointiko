import { fetchPosts } from "../api";
import { GetPostCodes } from "../utils";

export const getLatestPost = (offset) => {
    let postList = [];
    return fetchPosts(offset)
        .then(response => {
            console.log(response);
            // check if response status is ok
            if (response.ok) {
                // response status is ok
                // get body from response
                return response.json()
                    .then(paresedResp => {
                        console.log(paresedResp);
                        return {
                            postList: paresedResp,
                            getPostsStatus: GetPostCodes.GET_POST_SUCCESS
                        };
                    })
                    .catch(error => {
                        console.log(error);
                        return {
                            postList: postList,
                            getPostsStatus: GetPostCodes.GET_POST_SUCCESS,
                            error: 'Error in fetching new posts'
                        }
                    });
            } else {
                // response status is not ok
                return {
                    postList: postList,
                    getPostsStatus: GetPostCodes.GET_POST_FAIL,
                    error: 'Error in fetching new posts'
                };
            }

        })
        .catch(error => {
            console.log(error);
            return {
                postList: postList,
                getPostsStatus: GetPostCodes.GET_POST_FAIL,
                error: 'Error in fetching new posts'
            };
        })
}