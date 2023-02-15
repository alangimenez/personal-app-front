function TableDetail({ columns = [], rows = [], path }) {

    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    {
                        columns.map(e =>
                            <td><strong>{e}</strong></td>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows.map(e => <tr>
                        <td>{e.assetType}</td>
                        <td>{e.subtotal}</td>
                        <td>{e.percentage}</td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}

export default TableDetail