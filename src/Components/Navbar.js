function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {/* <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li> */}
                    <li className="nav-item">
                        <a className="nav-link" href="/ingresos">Ingresos</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className="nav-link" href="/gastos">Gastos</a>
                    </li> */}
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/gastos" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Egresos
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/gastos">Gastos</a>
                            <a className="dropdown-item" href="/creditcard">Tarjeta de crédito</a>
                            <a className="dropdown-item" href="/refund">Devoluciones de gastos</a>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="/inversiones" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Inversiones
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" href="/inversiones">Resumen</a>
                            <a className="dropdown-item" href="/cashflow">Cashflow</a>
                            <a className="dropdown-item" href="/inversiones/historico">Inversiones historicas</a>
                            <a className="dropdown-item" href="/portfolio">Portfolio</a>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar