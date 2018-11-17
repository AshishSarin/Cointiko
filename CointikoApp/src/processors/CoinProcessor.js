import { fetchCoinPrices } from "../api";
import { GetCoinPricesCodes, CryptoCoinIds } from "../utils";
import { ErrorMsg } from "../values";

export const getLatestCoinPrices = () => {
    return fetchCoinPrices()
        .then(response => {
            // check if response status is ok
            if (response.ok) {
                // response status is ok
                // get body from response
                return response.json()
                    .then(paresedResp => {
                        console.log("Fetch coin prices response body", paresedResp);
                        let coinPriceList = getCoinPriceList(paresedResp)
                        return {
                            coinPriceList: coinPriceList,
                            getCoinPricesStatus: GetCoinPricesCodes.GET_COIN_PRICES_SUCCESS
                        };
                    })
                    .catch(error => {
                        console.log(error);
                        return {
                            getCoinPricesStatus: GetCoinPricesCodes.GET_COIN_PRICES_FAIL,
                            error: ErrorMsg.ERROR_FETCH_COIN_PRICES
                        }
                    });
            } else {
                // response status is not ok
                return {
                    getCoinPricesStatus: GetCoinPricesCodes.GET_COIN_PRICES_FAIL,
                    error: ErrorMsg.ERROR_FETCH_COIN_PRICES
                };
            }

        })
        .catch(error => {
            console.log(error);
            return {
                getCoinPricesStatus: GetCoinPricesCodes.GET_COIN_PRICES_FAIL,
                error: ErrorMsg.ERROR_FETCH_COIN_PRICES
            };
        })
}


getCoinPriceList = (priceList) => {
    const coinPriceList = [
        { id: CryptoCoinIds.BITCOIN, coinName: "Bitcoin", shortName: "BTC" },
        { id: CryptoCoinIds.ETHEREUM, coinName: "Ethereum", shortName: "ETH" },
        { id: CryptoCoinIds.BITCOIN_CASH, coinName: "Bitcoin Cash", shortName: "BCH" },
        { id: CryptoCoinIds.XRP, coinName: "XRP", shortName: "XRP" },
        { id: CryptoCoinIds.LITECOIN, coinName: "Litecoin", shortName: "LTC" },
        { id: CryptoCoinIds.CARDANO, coinName: "Cardano", shortName: "ADA" },
        { id: CryptoCoinIds.IOTA, coinName: "IOTA", shortName: "IOTA" }
    ];

    for (let i = 0; i < coinPriceList.length; i++) {
        let shortName = coinPriceList[i].shortName;
        let coinPrice = priceList.RAW[shortName];
        coinPriceList[i].coinPrice = coinPrice.USD.PRICE
        coinPriceList[i].change = coinPrice.USD.CHANGEPCT24HOUR;
    }

    return coinPriceList;

}

