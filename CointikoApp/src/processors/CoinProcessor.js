import { fetchCoinPrices } from "../api";
import { GetCoinPricesCodes } from "../utils";
import { ErrorMsg } from "../values";

export const getLatestCoinPrices = () => {
    let coinPriceList = [];
    return fetchCoinPrices()
        .then(response => {
            // check if response status is ok
            if (response.ok) {
                // response status is ok
                // get body from response
                return response.json()
                    .then(paresedResp => {
                        console.log("Fetch coin prices response body", paresedResp);
                        return {
                            coinPriceList: paresedResp,
                            getCoinPricesStatus: GetCoinPricesCodes.GET_COIN_PRICES_SUCCESS
                        };
                    })
                    .catch(error => {
                        console.log(error);
                        return {
                            coinPriceList: coinPriceList,
                            getCoinPricesStatus: GetCoinPricesCodes.GET_COIN_PRICES_FAIL,
                            error: ErrorMsg.ERROR_FETCH_COIN_PRICES
                        }
                    });
            } else {
                // response status is not ok
                return {
                    coinPriceList: coinPriceList,
                    getCoinPricesStatus: GetCoinPricesCodes.GET_COIN_PRICES_FAIL,
                    error: ErrorMsg.ERROR_FETCH_COIN_PRICES
                };
            }

        })
        .catch(error => {
            console.log(error);
            return {
                coinPriceList: coinPriceList,
                getCoinPricesStatus: GetCoinPricesCodes.GET_COIN_PRICES_FAIL,
                error: ErrorMsg.ERROR_FETCH_COIN_PRICES
            };
        })
}

