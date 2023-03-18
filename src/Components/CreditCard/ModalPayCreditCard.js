import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import { useState, useEffect } from "react"
import InfoMessage from "../Utils/InfoMessage"

function ModalPayCreditCard({ path }) {

    const [periodsOfCreditCards, setPeriodsOfCreditCards] = useState([])
    const [creditCardNames, setCreditCardNames] = useState([])
    const [period, setPeriod] = useState([])
    const [disabled, setDisabled] = useState(true)

    const getClosedPeriodByCreditCard = () => {
        fetch(`${path}/expensecreditcard/period/CLOSED`)
            .then(res => res.json())
            .then(data => {
                setPeriodsOfCreditCards(data)
                const array = []
                data.map(it => array.push(it.name))
                array.unshift("")
                setCreditCardNames(array)
            })
    }

    useEffect(() => { getClosedPeriodByCreditCard() }, [])

    const [year, setYear] = useState([])
    const [month, setMonth] = useState([])
    const [keyOfCreditCard, setKeyOfCreditCard] = useState(0)
    const handleChangeSelectCreditCard = (event) => {
        const { key, year } = changeArrayOfYears(event.target.value)
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

    const [expensesDetail, setExpensesDetail] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const showDetailOfPeriodOfCreditCard = () => {
        const name = document.getElementById('pay-credit-card-name').value
        const year = document.getElementById('pay-credit-card-year').value
        const month = document.getElementById('pay-credit-card-month').value
        
        fetch(`${path}/expensecreditcard/expenses?name=${name}&year=${year}&month=${month}`)
            .then(res => res.json())
            .then(data => {
                setExpensesDetail(data[0].expenses)

                let total = 0
                data[0].expenses.map(e => {
                    total = total + e.amount
                })
                setTotalAmount(total)
            })

        setDisabled(false)
    }

    const payPeriod = () => {
        document.getElementById('pay-credit-card-close').disabled = true
        document.getElementById('pay-credit-card-select').disabled = true
        setDisabled(true)
        document.getElementById('pay-credit-card-msg').style.display = "unset"

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("pay-credit-card-name").value,
                "year": document.getElementById("pay-credit-card-year").value,
                "month": document.getElementById("pay-credit-card-month").value,
                "status": 'PAID'
            })
        }

        fetch(`${path}/expensecreditcard/period/status`, requestOptions)
            .then(res => res.json())
            .then(() => {
                setExpensesDetail([])
                setTotalAmount(0)
            })
            .then(data => {
                document.getElementById('pay-credit-card-msg').innerHTML = 'El pago del periodo fue registrado con éxito'
                document.getElementById('pay-credit-card-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('pay-credit-card-msg').innerHTML = 'Se está registrando el pago de la tarjeta'
                    document.getElementById('pay-credit-card-msg').style.display = "none"
                    document.getElementById('pay-credit-card-close').disabled = false
                    document.getElementById('pay-credit-card-select').disabled = false
                    document.getElementById('pay-credit-card-save').disabled = false

                    document.getElementById("pay-credit-card-name").value = ""
                    document.getElementById("pay-credit-card-year").value = ""
                    document.getElementById("pay-credit-card-month").value = ""

                    setExpensesDetail([])
                }, 2000)
            })
    }


    return (
        <>
            <ModalButton target={'#pay-credit-card'}>
                Pagar tarjeta de crédito
            </ModalButton>
            <ModalBody id={'pay-credit-card'}>
                <form>
                    <div className="form-group">
                        <label htmlFor='pay-credit-card-name'>Tarjeta</label>
                        <select className="form-control" id='pay-credit-card-name' onChange={handleChangeSelectCreditCard}>
                            {creditCardNames.map((opt, index) => <option key={index}>{opt}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='pay-credit-card-year'>Año</label>
                        <select className="form-control" id='pay-credit-card-year' onChange={handleChangeSelectYear}>
                            {year.map((opt, index) => <option key={index}>{opt}</option>)}
                        </select>
                    </div>
                    <Select text={'Mes'} id={'pay-credit-card-month'} options={month} />
                </form>

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
                            expensesDetail.map((e, index) => <tr key={index}>
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

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="pay-credit-card-close">Close</button>
                    <button type="button" className="btn btn-secondary" id="pay-credit-card-select" onClick={showDetailOfPeriodOfCreditCard}>Select</button>
                    <button type="button" className="btn btn-primary" onClick={payPeriod} id="pay-credit-card-save" disabled={disabled}>Save changes</button>
                </div>

                <InfoMessage id={'pay-credit-card-msg'} type='alert alert-info'>
                    Se está registrando el pago de la tarjeta
                </InfoMessage>

            </ModalBody>
        </>
    )
}

export default ModalPayCreditCard