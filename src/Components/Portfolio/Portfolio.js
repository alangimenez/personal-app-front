import { useEffect, useState } from "react"
import TableDetail from "./Tables/TableDetail"
import TableSubDetail from "./Tables/TableSubDetail"
import OtherQuotes from "./OtherQuotes"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Portfolio({ path }) {
    const token = cookies.get('Token')

    const [portfolio, setPortfolio] = useState([])
    const [detail, setDetail] = useState([])

    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }
    const getPortfolio = () => {
        fetch(`${path}/investment/portfolio`, requestOptionsGet)
            .then(res => res.json())
            .then(data => {
                setDetail(data.detail)
                setPortfolio(data);
            })
    }

    useEffect(() => {
        getPortfolio()
    }, [])

    return (
        <div className="container">
            <OtherQuotes path={path }/>
            <h2>Total por tipo de activo</h2>
            <TableDetail
                columns={['Tipo de activo', 'BNA ARS', 'BNA USD', 'MEP ARS', 'MEP USD', '% sobre total']}
                rows={portfolio.totalDetail}
                path={path}
            />
            {
                detail.map((atd, index) =>
                    <div key={index}>
                        <h3>Subtotal de {atd.value}</h3>
                        <TableSubDetail
                            columns={['Ticket', 'Moneda', 'Cantidad', 'BNA ARS', 'BNA USD', 'MEP ARS', 'MEP USD', '% sobre total']}
                            rows={atd.subdetail}
                        />
                    </div>
                )
            }

        </div>
    )
}

export default Portfolio