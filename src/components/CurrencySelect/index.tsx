import {useEffect, useState} from 'react';
import {PRIMARY_CURRENCY_LIST} from "../../const";
import {Rates} from "../../api/currencyApi";

type SymbolSelectProps = {
    selectedOption: string
    selectName: string
    rates: Rates
    handleOptionChange: (e: React.FormEvent<HTMLSelectElement>) => void
}


const CurrencySelect = ({selectedOption, selectName, rates, handleOptionChange}: SymbolSelectProps) => {
    const [symbols, setSymbols] = useState<string[]>([]);

    const handleSetSymbols = () => {
        const symbolsArr: string[] = Object.keys(rates);

        const sortedSymbolsArr = symbolsArr.sort((symbol) => {
            return PRIMARY_CURRENCY_LIST.includes(symbol) ? 1 : -1;
        })

        setSymbols(sortedSymbolsArr)
    };

    useEffect(() => {
        handleSetSymbols();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rates]);

    return (
        <select className={'currencies__select'} onChange={handleOptionChange} value={selectedOption} name={selectName}>
            {symbols.map((symbol) => {
                return <option className={'currencies__option'} key={symbol} value={symbol}>{symbol}</option>
            })}
        </select>
    );
};

export default CurrencySelect;