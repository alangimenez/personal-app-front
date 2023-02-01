import { useEffect, useState } from "react"

function Portfolio({path}) {

    const [portfolio, setPortfolio] = useState([])

    const getPortfolio = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`${path}/investment/portfolio`)
            .then((res) => res.json())
            .then((data) => {
                setPortfolio(data);
                console.log(data);
            })
    }

    useEffect(() => {
        getPortfolio()
    }, [])

    return (
        <div className="container">

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Ticket</th>
                        <th scope='col'>Asset type</th>
                        <th scope='col'>Quantity</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        portfolio.map(e => <tr>
                            <td>{e.name}</td>
                            <td>{e.ticket}</td>
                            <td>{e.assetType}</td>
                            <td>{e.actualQuantity}</td>
                            <td>{e.actualPrice}</td>
                            <td>{e.actualQuantity * e.actualPrice}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Portfolio