import axios from "axios";
import {PRIMARY_CURRENCY_LIST} from "../const";

const currencyUrl = `https://api.apilayer.com/exchangerates_data`;

export type Rates = {
    [key: string]: number
}

type CurrencyData = {
    success: boolean
    rates: Rates
}

export const getCurrencySymbolsReq = async (): Promise<CurrencyData> => {
    try {
        const {data} = await axios.get(`${currencyUrl}/latest`, {
            params: {
                symbols: PRIMARY_CURRENCY_LIST.toString(),
                base: 'UAH',
            },
            headers: {
                'apikey': process.env.REACT_APP_CURRENCY_API_KEY
            }
        })

        return data
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getCurrencyConvertReq = async (convertTo: string, convertFrom: string, amount: number): Promise<number> => {
    try {
        const {data} = await axios.get(`${currencyUrl}/convert`, {
            params: {
                to: convertTo,
                from: convertFrom,
                amount: amount
            },
            headers: {
                'apikey': process.env.REACT_APP_CURRENCY_API_KEY
            }
        })

        return data.result
    } catch (error) {
        return Promise.reject(error);
    }
}