import { useEffect, useState } from 'react';
import Cell from './components/Cell';
import HeaderColumn from './components/HeaderColumn';
import { ERROR_DELAY, INIT_URLS, POLL_INTERVAL, POLL_URLS, SOURCES } from './constants';
import './styles.css';
import { CurrencyData } from './types/types';
import { debounce } from './utils';

const App = () => {

  const [data, setData] = useState<CurrencyData[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async (urls: string[]) => {
      try {
        const responses = await Promise.all(urls.map(url => fetch(url).then(response => response.json())));
        const newData = responses.map(response => response as CurrencyData);
        setData(newData);
        setError('');
      } catch (error) {
        setError(`Error! ${error} while fetching data. Please check your network connectivity.`);
        setTimeout(() => {
          setData([]);
          pollData();
        }, ERROR_DELAY);
      }
    };

    const fetchInitialData = async () => {
      await fetchData(INIT_URLS);
    };

    const debouncedFetchData = debounce(fetchData, 1000);

    const pollData = async () => {
      await debouncedFetchData(POLL_URLS);
    };

    fetchInitialData();
    const intervalId = setInterval(pollData, POLL_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

// функция расчета минимального значения выбранной валюты среди всех источников
  const calculateMinValue = (currency: keyof CurrencyData['rates']): number => {
    const rates = data.map(source => source.rates[currency]);
    return Math.min(...rates);
  };

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
            <Cell allSoursesRates={amountRates} currency={"RUB"} minValue={calculateMinValue('RUB')}>RUB/CUPCAKE</Cell>
            <Cell allSoursesRates={amountRates} currency={"USD"} minValue={calculateMinValue('USD')}>USD/CUPCAKE</Cell>
            <Cell allSoursesRates={amountRates} currency={"EUR"} minValue={calculateMinValue('EUR')}>EUR/CUPCAKE</Cell>
            <Cell allSoursesRates={amountRates} currency={"RUB"} minValue={calculateMinValue('RUB')}>RUB/USD</Cell>
            <Cell allSoursesRates={amountRates} currency={"USD"} minValue={calculateMinValue('USD')}>RUB/EUR</Cell>
            <Cell allSoursesRates={amountRates} currency={"EUR"} minValue={calculateMinValue('EUR')}>EUR/USD</Cell>
          </tbody>
        </table>

      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default App