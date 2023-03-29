import { useState, useEffect } from 'react'
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Cashflow({ path }) {

    const [cashflow, setCashflow] = useState([])
    const token = cookies.get('Token')

    const getCashFlows = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };

        await fetch(`${path}/cashflow/flow`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setCashflow(data);
                console.log(data)
            })
    }

    useEffect(() => { getCashFlows() }, [])

    return (
        <div className='container'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Bono</th>
                        <th scope='col'>Fecha de pago</th>
                        <th scope='col'>Monto de pago</th>
                        <th scope='col'>Dias restantes para cobro</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cashflow.map((e, index) => <tr key={index}>
                            <td>{e.bondName}</td>
                            <td>{e.dateInterest}</td>
                            <td>{e.amountInterest}</td>
                            <td>{e.remainingsDays}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Cashflow