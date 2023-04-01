import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Balance({ path }) {

    const [balance, setBalance] = useState([])
    const token = cookies.get('Token')

    const requestOptionsLiquidFci = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };
    const getLiquidAndFciBalance = () => {
        fetch(`${path}/account/liquid-fci`, requestOptionsLiquidFci)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBalance(data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    const [benefitMP, setBenefitMP] = useState(0)
    const requestOptionsMercadoPagoLast = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };
    const getBenefitMP = () => {
        fetch(`${path}/mercadopago/last`, requestOptionsMercadoPagoLast)
            .then(res => res.json())
            .then(data => setBenefitMP(data[0].discountTotal - data[0].discountConsumed)
            )
    }

    useEffect(() => { getLiquidAndFciBalance(); getBenefitMP() }, [])

    const logout = () => {
        cookies.remove('Token', { path: '/' })
        window.location.href = '/login'
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">a</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {balance.map((it, index) =>
                        <li className="nav-item" style={{ marginLeft: 5, marginRight: 5 }} key={index}>{it.name}: ${it.balance}</li>
                    )}
                    <li className="nav-item" style={{ marginLeft: 5, marginRight: 5 }}>Beneficio MP remanente: ${benefitMP}</li>
                </ul>
            </div>
            <button className="btn btn-dark" onClick={logout}>Logout</button>
        </nav>
    )
}

export default Balance