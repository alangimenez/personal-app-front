import TableOfRefunds from "./TableOfRefunds/TableOfRefunds"

function RefundMain({ path }) {
    return (
        <div className="container">
            <h1>Devoluciones de gastos</h1>
            <TableOfRefunds path={path} />
        </div>
    )
}

export default RefundMain