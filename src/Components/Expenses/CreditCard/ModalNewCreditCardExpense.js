import DataContext from "../../Context/Context"
import InfoMessage from "../../Utils/InfoMessage"
import LabelInput from "../../Utils/LabelInput"
import LabelTextArea from "../../Utils/LabelTextArea"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"
import ModalBody from "../../Utils/ModalBody"
import { useState, useEffect, useContext } from "react"
import NewInputs from "../../Expenses/NewInputs"

function ModalNewCreditCardExpense({ path }) {

    const { items, resetItems } = useContext(DataContext)

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

        const creditKey = creditCard.findIndex(cc => cc.name == document.getElementById('new-expense-credit-card-name').value)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("new-expense-credit-card-name").value,
                "date": document.getElementById("new-expense-credit-card-date").value,
                "expenses": accountsAmounts,
                "currency": 'ARS',
                "comments": document.getElementById("new-expense-credit-card-comments").value,
                "period": document.getElementById("new-expense-credit-card-period").value,
                "benefitMP": mp,
                "credit": creditCard[creditKey].credit
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
                    document.getElementById("new-expense-credit-card-period").value = ""
                    mp = false
                    const parent = document.getElementById('newInputsRoot')
                    while (parent.firstChild) {
                        parent.firstChild.remove()
                    }
                    resetItems()
                }, 2000)
            })
    }

    const [creditCard, setCreditCard] = useState([])
    const [creditCardNames, setCreditCardNames] = useState([])
    const [period, setPeriod] = useState([])

    const getOpenPeriodByCreditCard = () => {
        fetch(`${path}/expensecreditcard/period/OPEN`)
            .then(res => res.json())
            .then(data => {
                setCreditCard(data)
                const array = []
                data.map(it => array.push(it.name))
                setCreditCardNames(array)
                setPeriod(data[0].openPeriods)
            })
    }

    useEffect(() => { getOpenPeriodByCreditCard() }, [])

    const handleChangeSelectA = (event) => {
        const key = creditCard.findIndex(at => at.name == event.target.value)
        setPeriod(creditCard[key].openPeriods)
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
                        {/* <Select text={'Tarjeta'} id={'new-expense-credit-card-name'} options={creditCardNames} onChange={handleChangeSelectA}/> */}
                        <div className="form-group">
                            <label htmlFor='new-expense-credit-card-name'>Tarjeta</label>
                            <select className="form-control" id='new-expense-credit-card-name' onChange={handleChangeSelectA}>
                                {creditCardNames.map(opt => <option>{opt}</option>)}
                            </select>
                        </div>
                        <Select text={'Periodo'} id={'new-expense-credit-card-period'} options={period} />
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