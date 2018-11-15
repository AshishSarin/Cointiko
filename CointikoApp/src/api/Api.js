import { URLConstants } from "./UrlConstants";


const LIMIT_PER_PAGE = 30;
export const fetchPosts = (offset, categoryCode) => {
    let postUrl = URLConstants.GET_POSTS + "?per_page="
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


export const fetchCoinPrices = () => {
    let coinPriceUrl = URLConstants.COIN_PRICES + '?fsyms=BTC,ETH,BCH,XRP,LTC,ADA,IOTA&tsyms=USD';
    console.log('fetchCoinPrices API Called', coinPriceUrl);
    return fetch(coinPriceUrl, {
        method: 'GET'
    }).then(response => {
        console.log('fetchCoin API Response', response);
        return response;
    }).catch(error => {
        console.log('fetchPost API Error', error);
    })
}
