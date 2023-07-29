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
    const getLiquidAndFciBalance = async () => {
        const res = await fetch(`${path}/account/liquid-fci`, requestOptionsLiquidFci)
        if (res.status === 401) {
            logout()
        }
        const data = await res.json()
        setBalance(data)
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
        <>
            {balance.map((it, index) =>
                <li className="nav-item" key={index}>{it.name}: ${it.balance.toLocaleString('es')}</li>
            )}
            <li className="nav-item" key="hola">Beneficio Mercado Pago remanente: ${benefitMP}</li>
        </>
    )
}

export default Balance