import { FC, useState } from 'react';
import Cell from './components/Cell';
import HeaderColumn from './components/HeaderColumn';
import { DELAY_TIME } from './constants';
import { useFetching } from './hooks/useFetching';
import './styles.css';
import { CurrencyData } from './types/types';
import { SOURCES } from './constants';

interface AppProps {
  initUrls: string[];
  pollUrls: string[];
}

const App: FC<AppProps> = ({ initUrls, pollUrls }) => {

  const [data, setData] = useState<CurrencyData[]>([]);

  useFetching({
    initialDataUrl: initUrls,
    pollDataUrl: pollUrls,
    setData: setData,
    pollInterval: DELAY_TIME,
  })

  const amountRates: { rates: CurrencyData['rates'] }[] = [];
  data.map(source => {
    if (source.rates) {
      amountRates.push({ rates: source.rates });
    }
  });

  return data.length > 0 ? (
    <div>
      <table className='table' border={1}>
        <HeaderColumn dataSources={SOURCES} />
        <tbody>
          <Cell allSoursesRates={amountRates} currency={"RUB"}>RUB/CUPCAKE</Cell>
          <Cell allSoursesRates={amountRates} currency={"USD"}>USD/CUPCAKE</Cell>
          <Cell allSoursesRates={amountRates} currency={"EUR"}>EUR/CUPCAKE</Cell>
          <Cell allSoursesRates={amountRates} currency={"RUB"}>RUB/USD</Cell>
          <Cell allSoursesRates={amountRates} currency={"USD"}>RUB/EUR</Cell>
          <Cell allSoursesRates={amountRates} currency={"EUR"}>EUR/USD</Cell>
        </tbody>
      </table>
    </div>
  ) : (
    <h2>Loading data...</h2>
  );
}

export default App