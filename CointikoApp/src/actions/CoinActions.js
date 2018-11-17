import { CoinActions } from "./Types";
import { getLatestCoinPrices } from "../processors";
import { GetCoinPricesCodes } from "../utils";
import { ErrorMsg } from "../values";


export const updateCoinPrices = () => {
    return (dispatch) => {
        console.log('updateCoinPrices called');
        dispatch({ type: CoinActions.UPDATE_COIN_PRICE_LIST });

        getLatestCoinPrices()
            .then(response => {
                if (response.getCoinPricesStatus == GetCoinPricesCodes.GET_COIN_PRICES_SUCCESS) {
                    // prices were succesfully fetched from api
                    // dispatch it to reducer
                    dispatch({
                        type: CoinActions.UPDATE_COIN_PRICE_LIST_SUCCESS,
                        payload: response.coinPriceList
                    });
                } else {
                    // coin prices fetch operation failed
                    updateCoinPriceFail(dispatch, response.error);
                }
            })
            .catch(error => {
                console.log(error);
                updateCoinPriceFail(dispatch, ErrorMsg.ERROR_FETCH_COIN_PRICES);
            })
    }
}

export const clearCoinPriceError = () => {
    return {
        type: CoinActions.CLEAR_ERROR_COIN_PRICE
    }
}


const updateCoinPriceFail = (dispatch, errMsg) => {
    dispatch({ type: CoinActions.UPDATE_COIN_PRICE_LIST_FAIL, error: errMsg });
}
