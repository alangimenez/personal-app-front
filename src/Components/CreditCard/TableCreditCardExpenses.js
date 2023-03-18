import Select from "../Utils/Select"
import { useEffect, useState } from "react"

function TableCreditCardExpenses({ path }) {

    const [periodsOfCreditCards, setPeriodsOfCreditCards] = useState([])
    const [creditCardNames, setCreditCardNames] = useState([])
    const getPeriodsOfCreditCard = () => {
        fetch(`${path}/expensecreditcard/period/ALL`)
            .then(res => res.json())
            .then(data => {
                setPeriodsOfCreditCards(data)
                getDataOfCreditCards(data)
            })
    }

    const getDataOfCreditCards = data => {
        const arrayOfNames = []
        data.map(ccd => {
            if (!arrayOfNames.includes(ccd.name)) {
                arrayOfNames.push(ccd.name)
            }
        })
        arrayOfNames.unshift("")
        setCreditCardNames(arrayOfNames)
        
    }

    useEffect(() => { getPeriodsOfCreditCard() }, [])

    const [year, setYear] = useState([])
    const [month, setMonth] = useState([])
    const [keyOfCreditCard, setKeyOfCreditCard] = useState(0)
    const handleChangeSelectCreditCard = event => changeCreditCard(event.target.value)

    const changeCreditCard = name => {
        const {key, year} = changeArrayOfYears(name)
        changeArrayOfMonths(year, key)
    }

    const handleChangeSelectYear = (event) => changeArrayOfMonths(event.target.value, keyOfCreditCard)

    const changeArrayOfYears = name => {
        const key = periodsOfCreditCards.findIndex(ccp => ccp.name == name)
        setKeyOfCreditCard(key)
        const arrayOfYears = []
        periodsOfCreditCards[key].openPeriods.map(p => arrayOfYears.push(p.year))
        setYear(arrayOfYears)
        return {
            "key": key,
            "year": arrayOfYears[0]
        }
    }

    const changeArrayOfMonths = (year, key) => {
        const keyOfPeriod = periodsOfCreditCards[key].openPeriods.findIndex(p => p.year == year)
        const arrayOfMonths = []
        periodsOfCreditCards[key].openPeriods[keyOfPeriod].month.map(p => arrayOfMonths.push(p))
        setMonth(arrayOfMonths)
    }

    const [expenses, setExpenses] = useState([])
    const [status, setStatus] = useState("")
    const [closeDate, setCloseDate] = useState("")
    const [paymentDate, setPaymentDate] = useState("")
    const [totalAmount, setTotalAmount] = useState(0)
    const showExpenses = () => {
        const name = document.getElementById('table-credit-card-expenses-name').value
        const year = document.getElementById('table-credit-card-expenses-year').value
        const month = document.getElementById('table-credit-card-expenses-month').value

        fetch(`${path}/expensecreditcard/expenses?name=${name}&year=${year}&month=${month}`)
            .then(res => res.json())
            .then(data => {
                setExpenses(data[0].expenses)
                setStatus(data[0].status)
                setCloseDate(data[0].closeDate)
                setPaymentDate(data[0].paymentDate)

                let total = 0
                data[0].expenses.map(e => {
                    total = total + e.amount
                })
                setTotalAmount(total)
            })
    }

    return (
        <>
            <form>
                <div className="form-group">
                    <label htmlFor='table-credit-card-expenses-name'>Tarjeta</label>
                    <select className="form-control" id='table-credit-card-expenses-name' onChange={handleChangeSelectCreditCard}>
                        {creditCardNames.map((opt, index) => <option key={index}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='table-credit-card-expenses-year'>Año</label>
                    <select className="form-control" id='table-credit-card-expenses-year' onChange={handleChangeSelectYear}>
                        {year.map((opt, index) => <option key={index}>{opt}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='table-credit-card-expenses-month'>Mes</label>
                    <select className="form-control" id='table-credit-card-expenses-month'>
                        {month.map((opt, index) => <option key={index}>{opt}</option>)}
                    </select>
                </div>
                <button type="button" className="btn btn-primary" id="table-credit-card-expenses-get" onClick={showExpenses}>Mostrar</button>
            </form>

            <p>Status: <strong>{status}</strong>. Cierre: <strong>{closeDate}</strong>. Vencimiento: <strong>{paymentDate}</strong>.</p>

            <table className='table table-striped'>
                <thead>
                    <tr>
                        <td><strong>Fecha</strong></td>
                        <td><strong>Cuenta</strong></td>
                        <td><strong>Importe</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((e, index) => <tr key={index}>
                            <td>{e.date}</td>
                            <td>{e.account}</td>
                            <td>{e.amount}</td>
                        </tr>)
                    }
                    <tr>
                        <td><strong>Total</strong></td>
                        <td></td>
                        <td><strong>{totalAmount.toLocaleString('es')}</strong></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default TableCreditCardExpenses