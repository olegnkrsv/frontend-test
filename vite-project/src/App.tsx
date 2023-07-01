import { useState } from 'react';
import Cell from './components/Cell';
import HeaderColumn from './components/HeaderColumn';
import { SOURCES } from './constants';
import { useFetching } from './hooks/useFetching';
import './styles.css';
import { CurrencyData } from './types/types';

const App = () => {

  const [data, setData] = useState<CurrencyData[]>([]);
  const [error, setError] = useState<string>('');

  useFetching({
    setData: setData,
    setError: setError,
  })

  // добавление в массив amountRates всех rates 
  const amountRates: { rates: CurrencyData['rates'] }[] = [];
  data.forEach(source => {
    if (source.rates) {
      amountRates.push({ rates: source.rates });
    }
  });

  return (
    <div>
      {error && <h3>{error}</h3>}
      {data.length > 0 ? (
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

      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App