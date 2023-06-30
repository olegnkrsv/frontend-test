import { FC, PropsWithChildren } from 'react';
import { CurrencyData } from '../types/types';
import { NUM_AFTER_COMMA } from '../constants';


interface CellDataProps {
    allSoursesRates: { rates: CurrencyData['rates'] }[]; // Тип данных для свойства data
    currency: keyof CurrencyData['rates']; // Тип данных для свойства currentRate
}

const Cell: FC<PropsWithChildren<CellDataProps>> = ({ allSoursesRates, currency, children }) => {

    allSoursesRates.forEach(source => {
        source.rates[currency] = Number(source?.rates[currency].toFixed(NUM_AFTER_COMMA));
    })
    const smallestRate = Math.min(...allSoursesRates.map(source => source.rates[currency]))
    const hasMin = allSoursesRates.filter(source => source.rates[currency] === smallestRate).length > 1;

    return (
        <tr className='cell'>
            <td>{children}</td>
            {allSoursesRates.map((source) => (
                <td
                className={!hasMin && source.rates[currency] === smallestRate
                    ? 'cell-min'
                    : ''
                }
                >
                    {source.rates[currency]}
                </td>
            ))}

        </tr>
    )
}

export default Cell