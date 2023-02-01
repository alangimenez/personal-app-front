function QuotesTable({cotizacion}) {
    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope='col'>Ticket</th>
                    <th scope='col'>Fecha</th>
                    <th scope='col'>Ùltimo precio</th>
                    <th scope='col'>Precio de cierre</th>
                    <th scope='col'>Volumen</th>
                    <th scope='col'>TIR</th>
                </tr>
            </thead>
            <tbody>
                {
                    cotizacion.map(e => <tr>
                        <td>{e.bondName}</td>
                        <td>{e.date}</td>
                        <td>{e.lastPrice}</td>
                        <td>{e.closePrice}</td>
                        <td>{e.volume}</td>
                        <td>{e.tir}</td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}

export default QuotesTable