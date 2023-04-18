import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function AllAccounts({ path }) {
    const token = cookies.get('Token')

    const [resultNegative, setResultNegative] = useState([])
    const [resultPositive, setResultPositive] = useState([])
    const [assets, setAssets] = useState([])
    const getAllAccounts = async () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        }

        const res = await fetch(`${path}/account`, requestOptions)
        const data = await res.json()
        const resultNegative = []
        const resultPositive = []
        const assets = []

        data.map(it => {
            switch (it.type) {
                case 'R-':
                    resultNegative.push(it.name)
                    break
                case 'R+':
                    resultPositive.push(it.name)
                    break
                case 'A':
                    assets.push(it.name)
                    break
                default:
                    assets.push(it.name)
            }
        })

        setResultNegative(resultNegative.sort())
        setResultPositive(resultPositive.sort())
        setAssets(assets.sort())
    }

    useEffect(() => { getAllAccounts() })

    return (
        <div className="container">
            <h3>Cuentas de resultado negativo</h3>
            <ul>
                {resultNegative.map((it, index) => <li key={index}>{it}</li>)}
            </ul>
            <h3>Cuentas de resultado positivo</h3>
            <ul>
                {resultPositive.map((it, index) => <li key={index}>{it}</li>)}
            </ul>
            <h3>Cuentas de activo</h3>
            <ul>
                {assets.map((it, index) => <li key={index}>{it}</li>)}
            </ul>
        </div>
    )
}

export default AllAccounts