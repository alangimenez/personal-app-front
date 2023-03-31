import { useEffect, useState } from "react"

function ExpensesTableForExcel({ path }) {

    const [lastExpenses, setLastExpenses] = useState([])

    const getLastTenExpenses = () => {
        const requiredOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`${path}/registers`, requiredOptions)
            .then((res) => res.json())
            .then((data) => setLastExpenses(data))
    }

    useEffect(() => getLastTenExpenses(), [])

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Dia</th>
                        <th scope='col'>Debe</th>
                        <th scope='col'>Importe</th>
                        <th scope='col'>Moneda</th>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Haber</th>
                        <th scope='col'>Importe</th>
                        <th scope='col'>Moneda</th>
                        <th scope='col'>Descripción</th>
                        <th scope='col'>Comentario</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        lastExpenses.map((e, index) => <tr key={index}>
                            <td>{e.date}</td>
                            <td></td>
                            <td>{e.debitAmount}</td>
                            <td>{e.debitCurrency}</td>
                            <td>{e.debit}</td>
                            <td></td>
                            <td>{e.debitAmount}</td>
                            <td>{e.debitCurrency}</td>
                            <td>{e.credit}</td>
                            <td>{e.comments}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    )
}

export default ExpensesTableForExcel