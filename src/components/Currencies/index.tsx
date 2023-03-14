import {useEffect, useState} from 'react';
import SymbolSelect from "../CurrencySelect";
import {getCurrencySymbolsReq, Rates} from "../../api/currencyApi";
import './style.scss';

type CurrenciesInfoObject = {
    selectedRate: number
    selectedCurrency: string,
    inputValue: string
}

const Currencies = () => {
    const [rates, setRates] = useState<Rates>({});
    const [leftCurrencyInfo, setLeftCurrencyInfo] = useState<CurrenciesInfoObject>({
        selectedRate: 0,
        selectedCurrency: 'UAH',
        inputValue: ''
    });
    const [rightCurrencyInfo, setRightCurrencyInfo] = useState<CurrenciesInfoObject>({
        selectedRate: 0,
        selectedCurrency: 'USD',
        inputValue: ''
    });

    const handelGetRatesBaseUah = async () => {
        const {selectedCurrency: leftSelectedCurrency} = leftCurrencyInfo;
        const {selectedCurrency: rightSelectedCurrency} = rightCurrencyInfo;

        const {rates} = await getCurrencySymbolsReq();

        setRates(rates);

        setLeftCurrencyInfo({
            ...leftCurrencyInfo,
            selectedRate: rates[leftSelectedCurrency],
        });

        setRightCurrencyInfo({
            ...rightCurrencyInfo,
            selectedRate: rates[rightSelectedCurrency]
        });
    }

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        const name = target.name;
        const value = target.value;
        const {
            selectedRate: rightSelectedRate,
            selectedCurrency: rightSelectedCurrency
        } = rightCurrencyInfo;
        const {
            selectedRate: leftSelectedRate,
            selectedCurrency: leftSelectedCurrency
        } = leftCurrencyInfo;

        if (name.includes('left')) {
            setLeftCurrencyInfo({
                ...leftCurrencyInfo,
                inputValue: value
            });

            setRightCurrencyInfo({
                ...rightCurrencyInfo,
                inputValue: rightSelectedCurrency === 'UAH'
                    ? (+value / leftSelectedRate).toFixed(2)
                    : (+value / leftSelectedRate * rightSelectedRate).toFixed(2)
            });
        } else {
            setRightCurrencyInfo({
                ...rightCurrencyInfo,
                inputValue: value
            })

            setLeftCurrencyInfo({
                ...leftCurrencyInfo,
                inputValue: leftSelectedCurrency === 'UAH'
                    ? (+value / rightSelectedRate).toFixed(2)
                    : (+value / rightSelectedRate * leftSelectedRate).toFixed(2)
            });
        }
    }

    const handleOptionChange = (e: React.FormEvent<HTMLSelectElement>) => {
        const target = e.currentTarget
        const name = target.name
        const value = target.value;
        const {
            inputValue: rightInputValue,
            selectedRate: rightSelectedRate,
            selectedCurrency: rightSelectedCurrency
        } = rightCurrencyInfo;
        const {
            inputValue: leftInputValue,
            selectedRate: leftSelectedRate,
            selectedCurrency: leftSelectedCurrency
        } = leftCurrencyInfo;

        if (name.includes('left')) {

            setLeftCurrencyInfo({
                selectedCurrency: value,
                selectedRate: rates[value],
                inputValue: value === 'UAH'
                    ? value === rightSelectedCurrency
                        ? rightInputValue
                        : (+leftInputValue / rightSelectedRate).toFixed(2)
                    : (+rightInputValue / rightSelectedRate * rates[value]).toFixed(2)
            })
        } else {
            setRightCurrencyInfo({
                selectedCurrency: value,
                selectedRate: rates[value],
                inputValue: value === 'UAH'
                    ? value === leftSelectedCurrency
                        ? leftInputValue
                        : (+leftInputValue / leftSelectedRate).toFixed(2)
                    : (+leftInputValue / leftSelectedRate * rates[value]).toFixed(2)
            });
        }
    }

    useEffect(() => {
        void handelGetRatesBaseUah();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className={'currencies'}>
            <div className={'container'}>
                <div className={'currencies__wrapper'}>
                    <div className={'currencies__side'}>
                        <input
                            className={'currencies__input'}
                            placeholder={'0'}
                            onFocus={() => setLeftCurrencyInfo({
                                ...leftCurrencyInfo,
                                inputValue: leftCurrencyInfo.inputValue === '0.00' ? '' : leftCurrencyInfo.inputValue
                            })} onChange={handleInputChange}
                            value={leftCurrencyInfo.inputValue}
                            name={'left-input'}
                            type="number"/>
                        <SymbolSelect
                            rates={rates}
                            selectName={'left-select'}
                            handleOptionChange={handleOptionChange}
                            selectedOption={leftCurrencyInfo.selectedCurrency}/>
                    </div>
                    <div className={'currencies__side'}>
                        <input
                            className={'currencies__input'}
                            placeholder={'0'}
                            onFocus={() => setRightCurrencyInfo({
                                ...rightCurrencyInfo,
                                inputValue: rightCurrencyInfo.inputValue === '0.00' ? '' : rightCurrencyInfo.inputValue
                            })}
                            onChange={handleInputChange}
                            value={rightCurrencyInfo.inputValue}
                            name={'right-input'} type="number"/>
                        <SymbolSelect
                            rates={rates}
                            selectName={'right-select'}
                            handleOptionChange={handleOptionChange}
                            selectedOption={rightCurrencyInfo.selectedCurrency}/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Currencies;