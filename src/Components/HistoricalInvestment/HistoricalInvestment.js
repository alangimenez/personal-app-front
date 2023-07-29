import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function HistoricalInvestment({path}) {

    const [mensajeInput, setMensajeInput] = useState("")
    const token = cookies.get('Token')

    const handleChangeInput = (event) => {
        setMensajeInput(event.target.value)
    }

    const [historicalInvestment, setHistoricalInvestment] = useState([])
    const getHistoricalInvestment = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
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
        if (window.outerWidth < 413) {
            import ("./HistoricalInvestment.css")
        }
    }, [])

    return (
        <div id="historical-investment-table" className="container">
            <table className='table table-striped'>
                <thead>
                    <tr>
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
                        historicalInvestment.map((e, index) => <tr key={index}>
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