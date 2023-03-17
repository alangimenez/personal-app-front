function TableDetail({ columns = [], rows = [], path }) {

    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    {
                        columns.map((e, index) =>
                            <td key={index}><strong>{e}</strong></td>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows.map((e, index) => <tr key={index}>
                        <td>{e.assetType}</td>
                        <td>{e.arsBna.toLocaleString('es')}</td>
                        <td>{e.usdBna.toLocaleString('es')}</td>
                        <td>{e.arsMep.toLocaleString('es')}</td>
                        <td>{e.usdMep.toLocaleString('es')}</td>
                        <td>%{(e.percentage*100).toFixed(2)}</td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}

export default TableDetail