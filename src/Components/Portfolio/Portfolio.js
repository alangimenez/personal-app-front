import DataContext from "../Context/Context"
import { useEffect, useState, useContext } from "react"
import TableDetail from "./Tables/TableDetail"
import TableSubDetail from "./Tables/TableSubDetail"

function Portfolio({ path }) {

    const [portfolio, setPortfolio] = useState([])
    const [detail, setDetail] = useState([])

    const getPortfolio = () => {
        fetch(`${path}/investment/portfolio`)
            .then((res) => res.json())
            .then((data) => {
                setDetail(data.detail)
                setPortfolio(data);
            })
    }

    useEffect(() => {
        getPortfolio()
    }, [])

    return (
        <div className="container">
            <h2>Total por tipo de activo</h2>
            <TableDetail
                columns={['Tipo de activo', 'Subtotal', '% sobre total']}
                rows={portfolio.totalDetail}
                path={path}
            />
            {
                detail.map(atd =>
                    <>
                        <h2>Subtotal de {atd.value}</h2>
                        <TableSubDetail
                            columns={['Ticket', 'Cantidad', 'Precio', 'Subtotal', '% sobre total']}
                            rows={atd.subdetail}
                        />
                    </>
                )
            }

        </div>
    )
}

export default Portfolio