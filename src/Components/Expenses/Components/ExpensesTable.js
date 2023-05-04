import { useState, useEffect } from 'react'
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ExpensesTables({ path }) {
    const token = cookies.get('Token')

    const [lastExpenses, setLastExpenses] = useState([])

    const getLastTenExpenses = async () => {
        const requiredOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const res = await fetch(`${path}/registers`, requiredOptions)
        const data = await res.json()
        setLastExpenses(data)
        /* fetch(`${path}/registers`, requiredOptions)
            .then((res) => res.json())
            .then((data) => setLastExpenses(data)) */
    }

    useEffect(() => {
        console.log("antes")
        getLastTenExpenses()
        console.log("despues")
        console.log(window.outerWidth)
        if (window.outerWidth < 413) {
            import ("./ExpensesTable.css")
        }
    }, [])

    const [status, setStatus] = useState(true)

    const handleChangeInput = (event) => {
        setStatus(event.target.checked)
    }

    const changeStatusOfExpense = (id) => {
        const requiredOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                id: id
            })
        }

        if (status == true) {
            fetch(`${path}/registers/status`, requiredOptions)
                .then((res) => res.json())
                .then(() => { })
        }
    }

    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope='col'>Fecha</th>
                    <th scope='col'>Cuenta</th>
                    <th scope='col' className='display'>Moneda</th>
                    <th scope='col'>Importe</th>
                    <th scope='col' className='display'>Medio de pago</th>
                    <th scope='col' className='display'>Cargado?</th>
                    <th scope='col' className='display'>Comentarios</th>
                </tr>
            </thead>
            <tbody>
                {
                    lastExpenses.map((e, index) => <tr key={index}>
                        <td>{e.date}</td>
                        <td>{e.debit}</td>
                        <td className='display'>{e.debitCurrency}</td>
                        <td>{e.debitAmount}</td>
                        <td className='display'>{e.credit}</td>
                        <td className='display'>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={(a) => { handleChangeInput(a); changeStatusOfExpense(e._id) }} checked={e.load}></input>
                            </div>
                        </td>
                        <td className='display'>
                            <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title={e.comments}>
                                Tooltip on top
                            </button>
                        </td>
                    </tr>)
                }
            </tbody>
        </table>

    )
}

export default ExpensesTables