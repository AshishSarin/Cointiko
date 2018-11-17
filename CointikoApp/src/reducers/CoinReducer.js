import { CoinActions } from "../actions/Types";
import update from 'react-addons-update';

const INITIAL_STATE = {
    isCoinPricesLoading: false,
    errorCoinPriceLoading: "",
    coinPriceList: []
}

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case CoinActions.UPDATE_COIN_PRICE_LIST:
            return update(state, {
                isCoinPricesLoading: { $set: true },
                errorCoinPriceLoading: { $set: "" }
            });

        case CoinActions.UPDATE_COIN_PRICE_LIST_SUCCESS:
            return update(state, {
                isCoinPricesLoading: { $set: false },
                coinPriceList: { $set: action.payload }
            });

        case CoinActions.UPDATE_COIN_PRICE_LIST_FAIL:
            return update(state, {
                isCoinPricesLoading: { $set: false },
                errorCoinPriceLoading: { $set: action.payload }
            });

        case CoinActions.CLEAR_ERROR_COIN_PRICE:
            return update(state, {
                errorCoinPriceLoading: { $set: "" }
            });

        default:
            return state;
    }

}