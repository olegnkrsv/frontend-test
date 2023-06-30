import { useCallback, useEffect } from "react";
import { CurrencyData } from "../types/types";
import { throttle } from "../utils";

interface FetchDataProps {
  initialDataUrl: string[];
  pollDataUrl: string[];
  setData: (data: CurrencyData[]) => void;
  pollInterval: number;
}

export const useFetching = ({ initialDataUrl, pollDataUrl, setData, pollInterval }: FetchDataProps) => {
  const fetchData = useCallback(async (urls: string[]) => {
    try {
      const response = await Promise.all(
        urls.map(url => fetch(url).then(response => response.json()))
      )
      const newData = response.map(response => response as CurrencyData);
      
      setData(newData);
    } catch (error) {
      console.error('Error is:', error)
      setTimeout(() => {
        setData([]);
        pollData();
      }, 5000)
    }
  }, [setData]);

  const pollData = async () => {
    await fetchData(pollDataUrl);
  };

  const throttledPollData = throttle(pollData, pollInterval);


  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchData(initialDataUrl);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    throttledPollData();
  }, [throttledPollData]);
  return fetchData
};
