import './App.scss';
import {getCurrencySymbolsReq} from "./api/currencyApi";
import {PRIMARY_CURRENCY_LIST} from "./const";

function App() {
  const aaa = async () => {
    const {symbols} = await getCurrencySymbolsReq();

    const symbolsKeys: string[] = Object.keys(symbols);

    const sortedSymbols = symbolsKeys.sort((symbol) => {
        return PRIMARY_CURRENCY_LIST.includes(symbol) ? -1 : 1;
    })

  };

  void aaa()

  return (
    <div className="App">
        <div>

        </div>
        <div>

        </div>
    </div>
  );
}

export default App;
