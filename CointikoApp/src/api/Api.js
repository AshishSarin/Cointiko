import { URLConstants } from "./UrlConstants";


const LIMIT_PER_PAGE = 30;
export const fetchPosts = (offset, categoryCode) => {
    var postUrl = URLConstants.GET_POSTS + "?per_page="
        + LIMIT_PER_PAGE + "&offset="
        + offset
        + (categoryCode ? "&categories=" + categoryCode : "")
        + "&_embed";
    console.log('fetchPost API called', postUrl);
    return fetch(postUrl, {
        method: 'GET'
    }).then(response => {
        console.log('fetchPost API Response', response);
        return response;
    }).catch(error => {
        console.log('fetchPost API Error', error);
    })
}
