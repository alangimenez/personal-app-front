import { Link } from "react-router-dom"

function AccountsMain() {
    return (
        <div>
            <button className="btn btn-dark"><Link className="nav-link" to="/account/asset">Nueva cuenta de activo</Link></button>
            <button className="btn btn-dark"><Link className="nav-link" to="/account/expense">Nueva cuenta de gastos</Link></button>
            <button className="btn btn-dark"><Link className="nav-link" to="/account/investment">Nueva cuenta de inversiones</Link></button>
        </div>
    )
}

export default AccountsMain