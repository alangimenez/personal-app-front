import DataContext from "../Context/Context"
import InfoMessage from "../Utils/InfoMessage"
import LabelInput from "../Utils/LabelInput"
import LabelTextArea from "../Utils/LabelTextArea"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import ModalBody from "../Utils/ModalBody"
import { useState, useEffect, useContext } from "react"
import NewInputs from "../Expenses/NewInputs"

function ModalNewCreditCardExpense({ path }) {

    const { items, resetItems, getAccountOptions, accountsOptions } = useContext(DataContext)

    const saveExpenseInCreditCard = () => {
        let mp = document.getElementById('new-expense-credit-card-mp').checked
        let refund = document.getElementById('new-expense-credit-card-refund').checked

        document.getElementById('new-expense-credit-card-close').disabled = true
        document.getElementById('new-expense-credit-card-save').disabled = true
        if (mp) {
            document.getElementById('new-expense-credit-card-msg').innerHTML = 'Estamos registrando el beneficio'
        }
        document.getElementById('new-expense-credit-card-msg').style.display = "unset"

        const accountsAmounts = []
        for (let i = 0; i < items; i++) {
            const eachExpense = {
                "debtAccount": document.getElementById(`account${i}`).value,
                "debtAmount": document.getElementById(`amount${i}`).value,
                "discountAmount": document.getElementById(`discount${i}`).value
            }
            accountsAmounts.push(eachExpense)
        }

        const creditKey = periodsOfCreditCards.findIndex(cc => cc.name == document.getElementById('new-expense-credit-card-name').value)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("new-expense-credit-card-name").value,
                "date": document.getElementById("new-expense-credit-card-date").value,
                "expenses": accountsAmounts,
                "currency": 'ARS',
                "comments": document.getElementById("new-expense-credit-card-comments").value,
                "year": document.getElementById("new-expense-credit-card-year").value,
                "month": document.getElementById("new-expense-credit-card-month").value,
                "benefitMP": mp,
                "credit": periodsOfCreditCards[creditKey].credit
            })
        }

        if (mp) {
            fetch(`${path}/mercadopago/batch`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    document.getElementById('new-expense-credit-card-msg').innerHTML = "Estamos guardando el gasto"
                    if (refund) {
                        document.getElementById('new-expense-credit-card-msg').innerHTML = "Estamos registrandolo para devolución"
                    }
                })
        }

        if (refund) {
            fetch(`${path}/refund/expense`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    document.getElementById('new-expense-credit-card-msg').innerHTML = "Estamos guardando el gasto"
                })
        }

        fetch(`${path}/expensecreditcard`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                document.getElementById('new-expense-credit-card-msg').innerHTML = 'El gasto fue guardado con éxito'
                document.getElementById('new-expense-credit-card-msg').className = 'alert alert-success'
                setTimeout(() => {
                    document.getElementById('new-expense-credit-card-msg').innerHTML = 'Estamos guardando el gasto'
                    document.getElementById('new-expense-credit-card-msg').style.display = "none"
                    document.getElementById('new-expense-credit-card-close').disabled = false
                    document.getElementById('new-expense-credit-card-save').disabled = false

                    document.getElementById("new-expense-credit-card-date").value = ""
                    document.getElementById("new-expense-credit-card-comments").value = ""
                    document.getElementById("new-expense-credit-card-year").value = ""
                    document.getElementById("new-expense-credit-card-month").value = ""
                    mp = false
                    const parent = document.getElementById('newInputsRoot')
                    while (parent.firstChild) {
                        parent.firstChild.remove()
                    }
                    resetItems()
                }, 2000)
            })
    }

    const [periodsOfCreditCards, setPeriodsOfCreditCards] = useState([])
    const [creditCardNames, setCreditCardNames] = useState([])
    const [year, setYear] = useState([])
    const [month, setMonth] = useState([])

    const getOpenPeriodByCreditCard = () => {
        fetch(`${path}/expensecreditcard/period/OPEN`)
            .then(res => res.json())
            .then(data => {
                setPeriodsOfCreditCards(data)
                const array = []
                data.map(it => array.push(it.name))
                array.unshift("")
                setCreditCardNames(array)
            })
    }

    useEffect(() => { 
        getOpenPeriodByCreditCard()
        if(accountsOptions.length == 0) {
            getAccountOptions()
        }
     }, [])

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

    return (
        <div>
            <ModalButton target={'#new-expense-credit-card'}>
                Ingresar nuevo gasto con tarjeta
            </ModalButton>
            <ModalBody id={'new-expense-credit-card'}>
                <>
                    <form>
                        <LabelInput text={'Fecha'} id={'new-expense-credit-card-date'} type={'date'} />
                        <div className="form-group">
                            <label htmlFor='new-expense-credit-card-name'>Tarjeta</label>
                            <select className="form-control" id='new-expense-credit-card-name' onChange={handleChangeSelectCreditCard}>
                                {creditCardNames.map((opt, index) => <option key={index}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor='new-expense-credit-card-year'>Año</label>
                            <select className="form-control" id='new-expense-credit-card-year' onChange={handleChangeSelectYear}>
                                {year.map((opt, index) => <option key={index}>{opt}</option>)}
                            </select>
                        </div>
                        <Select text={'Mes'} id={'new-expense-credit-card-month'} options={month} />
                        <LabelTextArea text={'Comentarios'} id={'new-expense-credit-card-comments'} />
                        <NewInputs path={path} />

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="new-expense-credit-card-mp"></input>
                            <label className="form-check-label" htmlFor="new-expense-credit-card-mp">
                                Beneficio Mercado Pago 30%
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="new-expense-credit-card-refund"></input>
                            <label className="form-check-label" htmlFor="new-expense-credit-card-refund">
                                Gasto a cuenta
                            </label>
                        </div>

                    </form>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-expense-credit-card-close">Close</button>
                        <button type="button" className="btn btn-primary" onClick={saveExpenseInCreditCard} id="new-expense-credit-card-save">Save changes</button>
                    </div>

                    <InfoMessage type='alert alert-info' id={'new-expense-credit-card-msg'}>
                        Estamos guardando el gasto
                    </InfoMessage>
                </>
            </ModalBody>
        </div>
    )
}

export default ModalNewCreditCardExpense