import { FC, PropsWithChildren } from 'react';
import { CurrencyData } from '../types/types';
import { NUM_AFTER_COMMA } from '../constants';


interface CellDataProps {
    allSoursesRates: { rates: CurrencyData['rates'] }[];
    currency: keyof CurrencyData['rates'];
    minValue: number;
}

const Cell: FC<PropsWithChildren<CellDataProps>> = ({ allSoursesRates, currency, minValue, children }) => {

    // allSoursesRates.forEach(source => {
    //     source.rates[currency] = Number(source?.rates[currency].toFixed(NUM_AFTER_COMMA));  // округление до 3 знаков после запятой
    // })

    return (
        <tr className='cell'>
            <td>{children}</td>
            {allSoursesRates.map((source, index) => {
                const rate = source.rates[currency];
                const isMinValue = rate === minValue;
                return (
                <td className={isMinValue ? 'cell-min'
                        : ''
                    }>
                    {rate.toFixed(NUM_AFTER_COMMA)}
                </td>
                );
            })}

        </tr>
    )
}

export default Cell