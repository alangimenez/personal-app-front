import { useState, useEffect } from 'react'

function ExpensesTables({ path }) {

    const [lastExpenses, setLastExpenses] = useState([])

    const getLastTenExpenses = () => {
        const requiredOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`${path}/expenses`, requiredOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setLastExpenses(data);
            })
    }

    useEffect(() => getLastTenExpenses(), [])

    const [status, setStatus] = useState(true)

    const handleChangeInput = (event) => {
        setStatus(event.target.checked)
    }

    const changeStatusOfExpense = (id) => {
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id
            })
        }

        if (status == true) {
            fetch(`${path}/expenses/status`, requiredOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
        }
    }

    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope='col'>Fecha</th>
                    <th scope='col'>Cuenta</th>
                    <th scope='col'>Moneda</th>
                    <th scope='col'>Importe</th>
                    <th scope='col'>Medio de pago</th>
                    <th scope='col'>Cargado?</th>
                </tr>
            </thead>
            <tbody>
                {
                    lastExpenses.map(e => <tr>
                        <td>{e.date}</td>
                        <td>{e.debit}</td>
                        <td>{e.debitCurrency}</td>
                        <td>{e.debitAmount}</td>
                        <td>{e.credit}</td>
                        <td>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={(a) => {handleChangeInput(a); changeStatusOfExpense(e._id)} } checked={e.load}></input>
                            </div>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

    )
}

export default ExpensesTables