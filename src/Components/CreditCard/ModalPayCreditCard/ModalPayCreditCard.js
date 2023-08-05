import ModalBody from "../../Utils/ModalBody"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"
import { useState, useEffect } from "react"
import InfoMessage from "../../Utils/InfoMessage"
import { getClosedPeriodByCreditCard, getExpensesDetailByNameMonthAndYear, payPeriodOfCC } from "../CreditCardFetchs/CreditCardFetchs"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ModalPayCreditCard({ path }) {
    const token = cookies.get('Token')
    const nameValue = document.getElementById('pay-credit-card-name')
    const yearValue = document.getElementById('pay-credit-card-year')
    const monthValue = document.getElementById('pay-credit-card-month')
    const buttonClose = document.getElementById('pay-credit-card-close')
    const buttonSelect = document.getElementById('pay-credit-card-select')
    const infoMessage = document.getElementById('pay-credit-card-msg')

    const [periodsOfCreditCards, setPeriodsOfCreditCards] = useState([])
    const [creditCardNames, setCreditCardNames] = useState([])
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        const closedPeriod = await getClosedPeriodByCreditCard(token, path)
        setPeriodsOfCreditCards(closedPeriod.periodsCC)
        setCreditCardNames(closedPeriod.ccNames)
    }

    const [year, setYear] = useState([])
    const [month, setMonth] = useState([])
    const [keyOfCreditCard, setKeyOfCreditCard] = useState(0)
    const handleChangeSelectCreditCard = event => {
        const { key, year } = changeArrayOfYears(event.target.value)
        changeArrayOfMonths(year, key)
    }

    const handleChangeSelectYear = event => changeArrayOfMonths(event.target.value, keyOfCreditCard)

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
    const showDetailOfPeriodOfCreditCard = async () => {
        const expenses = await getExpensesDetailByNameMonthAndYear(nameValue.value, yearValue.value, monthValue.value, token, path)
        setExpensesDetail(expenses.expenseDetail)
        setTotalAmount(expenses.totalAmount)
        setDisabled(false)
    }

    const payPeriod = () => {
        buttonClose.disabled = true
        buttonSelect.disabled = true
        setDisabled(true)
        infoMessage.style.display = "unset"

        payPeriodOfCC(nameValue.value, yearValue.value, monthValue.value, token, path)
        setExpensesDetail([])
        setTotalAmount(0)
        infoMessage.innerHTML = 'El pago del periodo fue registrado con éxito'
        infoMessage.className = 'alert alert-success'

        setTimeout(() => {
            infoMessage.innerHTML = 'Se está registrando el pago de la tarjeta'
            infoMessage.style.display = "none"
            document.getElementById('pay-credit-card-close').disabled = false
            document.getElementById('pay-credit-card-select').disabled = false
            document.getElementById('pay-credit-card-save').disabled = false

            nameValue.value = ""
            yearValue.value = ""
            monthValue.value = ""

            setExpensesDetail([])
        }, 2000)

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