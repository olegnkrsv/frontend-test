import { useCallback, useEffect } from "react";
import { DELAY_TIME, INIT_URLS, POLL_URLS } from "../constants";
import { CurrencyData } from "../types/types";
import { throttle } from "../utils";

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
      setTimeout(() => {
        setData([]);
        pollData();
      }, 5000)
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

  const throttledPollData = throttle(pollData, DELAY_TIME);

  useEffect(() => {
    throttledPollData();
  }, [throttledPollData]);

};
