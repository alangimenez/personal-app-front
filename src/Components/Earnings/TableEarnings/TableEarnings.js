import { getEarningRegisters } from '../EarningsFetchs/EarningsFetchs'
import { useEffect, useState } from 'react'
import Cookies from "universal-cookie";
const cookies = new Cookies();

function TableEarnings({ path }) {
    const token = cookies.get('Token')

    const [earningList, setEarningList] = useState([])

    useEffect(async () => {
        setEarningList(await getEarningRegisters(path, token))
        if (window.outerWidth < 413) {
            import ("./TableEarning.css")
        }
    }, [])

    return (
        <>
            <div id="table-earning">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>Fecha</th>
                            <th scope='col'>Cuenta</th>
                            <th scope='col'>Mon</th>
                            <th scope='col'>Monto</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            earningList.map((e, index) => <tr key={index}>
                                <td>{e.date}</td>
                                <td>{e.credit}</td>
                                <td>{e.creditCurrency}</td>
                                <td>{e.creditAmount}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TableEarnings