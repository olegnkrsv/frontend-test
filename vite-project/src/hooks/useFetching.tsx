import { FC, useCallback } from "react";
import { CurrencyData } from "../types/types";
import { NUM_AFTER_COMMA } from "../utils";

interface FetchDataProps {
    urls: string[];
    setData: (data: CurrencyData[]) => void;
    pollFetch: (data: string[]) => void;
}

export const useFetching = ({ urls, setData, pollFetch }: FetchDataProps) => {
    const fetchData = useCallback(async (urls: string[]) => {
        try {
            const response = await Promise.all(
                urls.map(url => fetch(url).then(response => response.json()))
            )
            const newData = response.map(response => response as CurrencyData);

            newData.forEach(source => {
                source.rates.RUB = Number(source?.rates.RUB.toFixed(NUM_AFTER_COMMA));
                source.rates.USD = Number(source?.rates.USD.toFixed(NUM_AFTER_COMMA));
                source.rates.EUR = Number(source?.rates.EUR.toFixed(NUM_AFTER_COMMA));
            });

            setData(newData);
            pollFetch(urls);
        } catch (error) {
            console.error('Error is', error)
            setTimeout(() => {
                setData([]);
                pollFetch(urls);
            }, 5000)

        }
    }, [urls, pollFetch, setData]);

    return fetchData;
};

