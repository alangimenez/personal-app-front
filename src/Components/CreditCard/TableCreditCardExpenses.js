import Select from "../Utils/Select"
import { useEffect, useState } from "react"

function TableCreditCardExpenses({ path }) {

    const [creditCardDetail, setCreditCardDetail] = useState([])
    const [creditCardNames, setCreditCardNames] = useState([])
    const getExpensesByCreditCard = () => {
        fetch(`${path}/expensecreditcard`)
            .then(res => res.json())
            .then(data => {
                setCreditCardDetail(data)
                getCreditCardNames(data)
            })
    }

    const getCreditCardNames = (data) => {
        const arrayOfNames = []
        data.map(ccd => {
            if (!arrayOfNames.includes(ccd.name)) {
                arrayOfNames.push(ccd.name)
            }
        })
        setCreditCardNames(arrayOfNames)

        getPeriofOfEachCreditCard(arrayOfNames, data)
    }

    const [creditCardPeriods, setCreditCardPeriods] = useState([])
    const getPeriofOfEachCreditCard = (arrayNames, data) => {
        const arrayOfPeriodByCreditCard = []
        arrayNames.map(an => {
            const period = []
            data.map(d => {
                if (d.name == an) {
                    period.push(d.period)
                }
            })
            arrayOfPeriodByCreditCard.push({
                "name": an,
                "periods": period
            })
        })
        setCreditCardPeriods(arrayOfPeriodByCreditCard)
    }

    useEffect(() => { getExpensesByCreditCard() }, [])

    const [year, setYear] = useState([])
    const [month, setMonth] = useState([])
    const [keyOfCreditCard, setKeyOfCreditCard] = useState(0)
    const handleChangeSelectCreditCard = event => {
        const key = creditCardPeriods.findIndex(ccp => ccp.name == event.target.value)
        setKeyOfCreditCard(key)
        const arrayOfYears = []
        console.log(creditCardPeriods[key])
        creditCardPeriods[key].openPeriods.map(p => arrayOfYears.push(p.year))
        setYear(arrayOfYears)
    }

    const handleChangeSelectYear = (event) => {
        const keyOfPeriod = creditCardPeriods[keyOfCreditCard].openPeriods.findIndex(p => p.year == event.target.value)
        const arrayOfMonths = []
        creditCardPeriods[keyOfCreditCard].openPeriods[keyOfPeriod].month.map(p => arrayOfMonths.push(p))
        setMonth(arrayOfMonths)
    }

    const [expenses, setExpenses] = useState([])
    const [status, setStatus] = useState("")
    const [closeDate, setCloseDate] = useState("")
    const [paymentDate, setPaymentDate] = useState("")
    const [totalAmount, setTotalAmount] = useState(0)
    const showExpenses = () => {
        const name = document.getElementById('table-credit-card-expenses-name').value
        const period = document.getElementById('table-credit-card-expenses-period').value

        const key = creditCardDetail.findIndex(ccd => ccd.name == name && ccd.period == period)
        setExpenses(creditCardDetail[key].expenses)
        setStatus(creditCardDetail[key].status)
        setCloseDate(creditCardDetail[key].closeDate)
        setPaymentDate(creditCardDetail[key].paymentDate)

        let total = 0
        creditCardDetail[key].expenses.map(e => {
            total = total + e.amount
        })
        setTotalAmount(total)
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
                    <label htmlFor='new-expense-credit-card-name'>Año</label>
                    <select className="form-control" id='new-expense-credit-card-name' onChange={handleChangeSelectCreditCard}>
                        {year.map(opt => <option>{opt}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor='new-expense-credit-card-year'>Mes</label>
                    <select className="form-control" id='new-expense-credit-card-year' onChange={handleChangeSelectYear}>
                        {month.map(opt => <option>{opt}</option>)}
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