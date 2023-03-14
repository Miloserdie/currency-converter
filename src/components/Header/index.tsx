import { getCurrencyConvertReq } from '../../api/currencyApi';
import {useEffect, useState} from "react";
import './style.scss'

const Header = () => {
    const [usd, setUsd] = useState<number>(0);
    const [eur, setEur] = useState<number>(0);

    const handleGetUahExchangeRates = async () => {
        const [eur, usd] = await Promise.all([
            getCurrencyConvertReq('UAH', 'EUR', 1),
            getCurrencyConvertReq('UAH', 'USD', 1)
        ])

        setEur(+eur.toFixed(3));

        setUsd(+usd.toFixed(3));
    };

    useEffect(() => {
       void handleGetUahExchangeRates();
    }, [])

    return (
        <header className={'header'}>
            <div className={'container'}>
                <div className={'header__wrapper'}>
                    <h1 className={'header__title'}>Конвертер валют</h1>
                    <div className={'header__info'}>
                        <p className={'info-item'}>Курс гривні</p>
                        <p className={'info-item'}>USD: {usd}</p>
                        <p className={'info-item'}>EUR: {eur}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;