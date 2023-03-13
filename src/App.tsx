import './App.scss';
import {getCurrencySymbolsReq} from "./api/currencyApi";
import {PRIMARY_CURRENCY_LIST} from "./const";
import { useState } from 'react';
import {SyntheticEvent} from "react";
import {useEffect} from "react";
import Header from './components/Header/index'

type ActiveFormType = {
    currency: string,
    value?: number
}

const App = () => {
    const [leftForm, setLeftForm] = useState<ActiveFormType>({
        currency: 'USD',
        value: 0
    });

    const [rightForm, setRightForm] = useState<ActiveFormType>({
        currency: 'UAH',
        value: 0
    });

  const aaa = async () => {
    const {symbols} = await getCurrencySymbolsReq();

    const symbolsKeys: string[] = Object.keys(symbols);

    const sortedSymbols = symbolsKeys.sort((symbol) => {
        return PRIMARY_CURRENCY_LIST.includes(symbol) ? -1 : 1;
    })

  };

  void aaa()

  return (
    <div className={'wrapper'}>
       <Header />
    </div>
  );
}

export default App;
