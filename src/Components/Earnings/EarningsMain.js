import ModalNewEarning from "./NewEarning/ModalNewEarning"
import TableEarnings from "./TableEarnings/TableEarnings"

function EarningsMain({ path }) {
    return (
        <>
            <h1>Ingresos</h1>
            <ModalNewEarning path={path} />
            <TableEarnings path={path} />
        </>
    )
}

export default EarningsMain