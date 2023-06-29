import { FC, useCallback, useEffect, useState } from 'react';
import Cell from './components/Cell';
import HeaderColumn from './components/HeaderColumn';
import { useFetching } from './hooks/useFetching';
import './styles.css';
import { CurrencyData } from './types/types';
import { SOURCES } from './utils';

interface AppProps {
  initUrls: string[];
  pollUrls: string[];
}

const App: FC<AppProps> = ({ initUrls, pollUrls }) => {

  const [data, setData] = useState<CurrencyData[]>([]);

  const pollData = useCallback(() => {
    fetchData(pollUrls);
  }, [pollUrls]);

  const fetchData = useFetching({ urls: initUrls, setData: setData, pollFetch: pollData })

  useEffect(() => {
    const fetchInitData = async () => {
      await fetchData(initUrls)
    }
    fetchInitData();
  }, [fetchData, initUrls])

  return data.length > 0 ? (
    <div>
      <table className='table' border={1}>
        <HeaderColumn dataSources={SOURCES} />
        <tbody>
          <Cell data={data}>RUB/{data[0]?.base}</Cell>
          <Cell data={data}>USD/{data[1]?.base}</Cell>
          <Cell data={data}>EUR/{data[2]?.base}</Cell>
          <Cell data={data}>RUB/USD</Cell>
          <Cell data={data}>RUB/EUR</Cell>
          <Cell data={data}>EUR/USD</Cell>
        </tbody>
      </table>
    </div>
  ) : (
    <h2>Loading data...</h2>
  );
}

export default App