import { useEffect, useState } from "react"

function HistoricalInvestment({path}) {

    const [mensajeInput, setMensajeInput] = useState("")

    const handleChangeInput = (event) => {
        setMensajeInput(event.target.value)
    }

    const [historicalInvestment, setHistoricalInvestment] = useState([])
    const getHistoricalInvestment = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`${path}/investment`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                setHistoricalInvestment(data);
                console.log(data);
            })
    }

    useEffect(() => {
        getHistoricalInvestment()
    }, [])

    return (
        <div className="container">

            <div >
                <label htmlFor='password'>Password</label>
                <input id="password" className='form-control' onChange={handleChangeInput} style={{ width: 200 + 'px' }} type='password'></input>
            </div>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Ticket</th>
                        <th scope='col'>Purchase date</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Purchase price</th>
                        <th scope='col'>Currency</th>
                        <th scope='col'>Asset type</th>
                        <th scope='col'>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        historicalInvestment.map(e => <tr>
                            <td>{e.name}</td>
                            <td>{e.ticket}</td>
                            <td>{e.operationDate}</td>
                            <td>{e.operationQuantity}</td>
                            <td>{e.operationPrice}</td>
                            <td>{e.operationCurrency}</td>
                            <td>{e.assetType}</td>
                            <td>{e.operation}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}


export default HistoricalInvestment