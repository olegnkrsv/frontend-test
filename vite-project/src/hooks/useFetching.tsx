import { useCallback, useEffect } from "react";
import { ERROR_DELAY, INIT_URLS, POLL_URLS } from "../constants";
import { CurrencyData } from "../types/types";

interface FetchDataProps {
  setData: (data: CurrencyData[]) => void;
  setError: (error: string) => void;
}

export const useFetching = ({ setData, setError }: FetchDataProps) => {
  const fetchData = useCallback(async (urls: string[]) => {
    try {
      const response = await Promise.all(
        urls.map(url => fetch(url).then(response => response.json()))
      )
      const newData = response.map(response => response as CurrencyData);
      
      setData(newData);
    } catch (error) {
      setError(`Error! ${error} while fetching data. Please check your network connectivity.`)
      // повторный вызов при ошибке через ERROR_DELAY
      setTimeout(() => {
        setData([]);
        pollData();
      }, ERROR_DELAY)
    }
  }, [setData]);

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData(INIT_URLS);
    };
    fetchInitialData();
  }, []);

  const pollData = async () => {
    await fetchData(POLL_URLS);
  };

  useEffect(() => {
    pollData();
  }, [pollData]);

};
