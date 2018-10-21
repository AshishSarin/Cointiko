import { URLConstants } from "./UrlConstants";


const LIMIT_PER_PAGE = 10
export const fetchPosts = (offset) => {
    var postUrl = URLConstants.GET_POSTS + "?per_page=" + LIMIT_PER_PAGE + "&offset=" + offset + "&_embed";
    console.log('postUrl', postUrl);
    return fetch(postUrl, {
        method: 'GET'
    });
}