import { useEffect, useState } from "react"
import { getListOfPeriodsOfMonthRegister, getMonthRegisterByYearAndMonth } from "../../../fetchs/monthRegister/monthRegisterFetchs"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function MonthRegisterViewer({ path }) {
    const token = cookies.get('Token')
    const [periods, setPeriods] = useState([])
    const [years, setYears] = useState([])
    const [months, setMonths] = useState([])
    const year = document.getElementById('month-register-viewer-year')
    const month = document.getElementById('month-register-viewer-month')

    useEffect(async () => {
        const data = await getListOfPeriodsOfMonthRegister(token, path)
        setPeriods(data)
        console.log(data)
        data.forEach(it => setYears([...years, it.year]))
        console.log(data[0].month)
        setMonths(data[0].month)
    }, [])

    const handleChangeSelectYear = event => changeMonth(event.target.value)

    const changeMonth = year => {
        changeArrayOfMonth(year)
    }

    const changeArrayOfMonth = year => {
        const key = periods.findIndex(p => p.year == year)
        console.log(key)
        setMonths(periods[key].month)
    }

    const [values, setValues] = useState([])
    const [yearData, setYearData] = useState([])
    const [monthData, setMonthData] = useState([])
    const showMonthRegister = async () => {
        const data = await getMonthRegisterByYearAndMonth(year.value, month.value, token, path)
        setYearData(data.year)
        setMonthData(data.month)
        setValues(data.values)
    }

    return (
        <div>
            <div className="form-group">
                <label htmlFor='month-register-viewer-year'>Year</label>
                <select className="form-control" id='month-register-viewer-year' onChange={handleChangeSelectYear}>
                    {years.map((opt, index) => <option key={index}>{opt}</option>)}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor='month-register-viewer-month'>Month</label>
                <select className="form-control" id='month-register-viewer-month'>
                    {months.map((opt, index) => <option key={index}>{opt}</option>)}
                </select>
            </div>
            <button type="button" className="btn btn-primary" id="month-register-viewer-month" onClick={showMonthRegister}>Mostrar</button>

            <table className='table table-striped'>
            <thead>
                <tr>
                    <th scope='col'>Account</th>
                    <th scope='col'>Type</th>
                    <th scope='col' className='display'>Currency</th>
                    <th scope='col'>Balance</th>
                </tr>
            </thead>
            <tbody>
                {
                    values.map((e, index) => <tr key={index}>
                        <td>{e.accountName}</td>
                        <td>{e.type}</td>
                        <td className='display'>{e.currency}</td>
                        <td>{e.balance}</td>
                    </tr>)
                }
            </tbody>
        </table>
        </div>
    )
}

export default MonthRegisterViewer