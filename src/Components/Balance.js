import { useEffect, useState } from "react"

function Balance ({path}) {

    const [balance, setBalance] = useState([])

    const getLiquidAndFciBalance = () => {
        fetch(`${path}/account/liquid-fci`)
            .then(res => res.json())
            .then(data => {
                setBalance(data)
                console.log(data)
            })
    }

    const [benefitMP, setBenefitMP] = useState(0)
    const getBenefitMP = () => {
        fetch(`${path}/mercadopago/last`)
            .then(res => res.json())
            .then(data => setBenefitMP(data[0].discountTotal - data[0].discountConsumed)
            )
    }

    useEffect(() => { getLiquidAndFciBalance(); getBenefitMP() }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/"></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {balance.map((it, index) => 
                        <li className="nav-item" style={{marginLeft: 5, marginRight: 5}} key={index}>{it.name}: ${it.balance}</li>
                    )}
                    <li className="nav-item" style={{marginLeft: 5, marginRight: 5}}>Beneficio MP remanente: ${benefitMP}</li>
                </ul>
            </div>
        </nav>
    )
}

export default Balance