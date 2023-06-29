const HeaderColumn = ( {dataSources}:   { dataSources: string[] }) => {
    return (
        <thead>
            <tr>
                <th>Pair name/market</th>
                {dataSources.map((source) => (
                    <th key={source}>{source}</th>
                ))}
            </tr>
        </thead>
    )
}

export default HeaderColumn