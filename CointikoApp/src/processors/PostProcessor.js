import { fetchPosts } from "../api";
import { GetPostCodes } from "../utils";
import { ErrorMsg } from "../values";

export const getLatestPost = (offset, categoryCode) => {
    let postList = [];
    return fetchPosts(offset, categoryCode)
        .then(response => {
            // check if response status is ok
            if (response.ok) {
                // response status is ok
                // get body from response
                return response.json()
                    .then(paresedResp => {
                        console.log("Fetch Post response body", paresedResp);
                        return {
                            postList: paresedResp,
                            getPostsStatus: GetPostCodes.GET_POST_SUCCESS
                        };
                    })
                    .catch(error => {
                        console.log(error);
                        return {
                            postList: postList,
                            getPostsStatus: GetPostCodes.GET_POST_FAIL,
                            error: ErrorMsg.ERROR_FETCH_POST
                        }
                    });
            } else {
                // response status is not ok
                return {
                    postList: postList,
                    getPostsStatus: GetPostCodes.GET_POST_FAIL,
                    error: ErrorMsg.ERROR_FETCH_POST
                };
            }

        })
        .catch(error => {
            console.log(error);
            return {
                postList: postList,
                getPostsStatus: GetPostCodes.GET_POST_FAIL,
                error: ErrorMsg.ERROR_FETCH_POST
            };
        })
}


