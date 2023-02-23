import { useEffect, useState } from "react"

function TableSubDetail({ columns = [], rows = [] }) {

    const [subtotal, setSubtotal] = useState(0)
    const sum = () => {
        let st = 0
        rows.map(r => {
            st = st + r.subtotal
        })
        setSubtotal(st)
    }

    useEffect(() => { sum() }, [])

    return (
        <table className='table table-striped'>
            <thead>
                <tr>
                    {
                        columns.map(e =>
                            <td><strong>{e}</strong></td>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows.map(e => <tr>
                        <td>{e.ticket}</td>
                        <td>{e.currency}</td>
                        <td>{e.priceArsBna.toLocaleString('es')}</td>
                        <td>{e.priceUsdBna.toLocaleString('es')}</td>
                        <td>{e.priceArsMep.toLocaleString('es')}</td>
                        <td>{e.priceUsdMep.toLocaleString('es')}</td>
                        <td>%{(e.percentageOverTotal*100).toFixed(2)}</td>
                    </tr>)
                }
                <tr>
                    <td><strong>Subtotal</strong></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><strong>{subtotal.toLocaleString('es')}</strong></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableSubDetail