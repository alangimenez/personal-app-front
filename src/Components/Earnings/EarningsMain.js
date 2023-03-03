import ModalNewEarning from "./NewEarning/ModalNewEarning"

function EarningsMain({ path }) {
    return (
        <>
            <h1>Ingresos</h1>
            <ModalNewEarning path={path} />
        </>
    )
}

export default EarningsMain