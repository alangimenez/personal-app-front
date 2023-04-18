import { Link } from "react-router-dom"

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a className="navbar-brand" href="/">Home</a> */}
            <Link className="navbar-brand" to="/">Home</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/ingresos">Ingresos</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/gastos" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Egresos
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/gastos">Gastos</Link>
                            <Link className="dropdown-item" to="/creditcard">Tarjeta de crédito</Link>
                            <Link className="dropdown-item" to="/refund">Devoluciones de gastos</Link>
                            <Link className="dropdown-item" to="/gastos/para-excel">Listado para excel</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/inversiones" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Inversiones
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/inversiones">Resumen</Link>
                            <Link className="dropdown-item" to="/cashflow">Cashflow</Link>
                            <Link className="dropdown-item" to="/inversiones/historico">Inversiones historicas</Link>
                            <Link className="dropdown-item" to="/portfolio">Portfolio</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Cuentas
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <Link className="dropdown-item" to="/account/asset">Nueva cuenta de activo</Link>
                            <Link className="dropdown-item" to="/account/investment">Nueva cuenta de inversiones</Link>
                            <Link className="dropdown-item" to="/account/expense">Nueva cuenta de gasto</Link>
                            <Link className="dropdown-item" to="/account/earning">Nueva cuenta de ingreso</Link>
                            <Link className="dropdown-item" to="/account/list-of-assets">Ver todas las cuentas</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar