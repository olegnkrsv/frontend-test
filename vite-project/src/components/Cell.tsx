import { FC, PropsWithChildren } from 'react';
import { CurrencyData } from '../types/types';


interface CellDataProps {
    data: CurrencyData[];
}

const Cell: FC<PropsWithChildren<CellDataProps>> = ({ data, children }) => {

    const smallestRate = Math.min(...data.map(sourceData => sourceData.rates.RUB))
    const hasMin = data.filter(sourceData => sourceData.rates.RUB === smallestRate).length > 1;

    return (
        <tr className='cell'>
            <td>{children}</td>
            {data.map((sourceData, index) => (
                <td key={index}
                className={!hasMin && sourceData.rates.RUB === smallestRate
                    ? 'cell-min'
                    : ''
                }
                >
                    {sourceData.rates.RUB}
                </td>
            ))}

        </tr>
    )
}

export default Cell