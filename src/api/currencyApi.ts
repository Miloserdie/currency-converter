import axios from "axios";

const currencyUrl = `https://api.apilayer.com/exchangerates_data`;

type Symbol = {
    [key: string]: string
}

type CurrencyData = {
    success: boolean
    symbols: Symbol
}

export const getCurrencySymbolsReq = async (): Promise<CurrencyData> => {
    try {
        const {data} = await axios.get(`${currencyUrl}/symbols`, {
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