import { FC, PropsWithChildren } from 'react';
import { CurrencyData } from '../types/types';
import { NUM_AFTER_COMMA } from '../constants';


interface CellDataProps {
    allSoursesRates: { rates: CurrencyData['rates'] }[];
    currency: keyof CurrencyData['rates'];
    minValue: number;
}

const Cell: FC<PropsWithChildren<CellDataProps>> = ({ allSoursesRates, currency, minValue, children }) => {

    return (
        <tr className='cell'>
            <td>{children}</td>
            {allSoursesRates.map((source, index) => {
                const rate = source.rates[currency];
                const isMinValue = rate === minValue;
                return (
                <td key={index} className={isMinValue ? 'cell-min' // index в key здесь в рамках исключения
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