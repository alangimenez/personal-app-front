import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { getRegistersForExcel, changeStatus } from '../../../../fetchs/registers/registersFetchs'
const cookies = new Cookies();

function ExpensesTableForExcel({ path }) {
    const token = cookies.get('Token')

    const [lastExpenses, setLastExpenses] = useState([])

    useEffect(async () => {
        setLastExpenses(await getRegistersForExcel(token, path))
    }, [])

    const [status, setStatus] = useState(true)

    const handleChangeInput = (event) => {
        setStatus(event.target.checked)
    }

    const changeStatusOfRegister = async (id) => {
        if (status == true) {
            await changeStatus(id, token, path)
        }
    }

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
                            <td className='display'>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="flexCheckChecked" onChange={(a) => { handleChangeInput(a); changeStatusOfRegister(e._id) }} checked={e.load}></input>
                                </div>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    )
}

export default ExpensesTableForExcel