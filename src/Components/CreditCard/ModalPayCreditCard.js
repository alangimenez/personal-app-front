import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import { useState, useEffect } from "react"
import InfoMessage from "../Utils/InfoMessage"

function ModalPayCreditCard({ path }) {

    const [creditCard, setCreditCard] = useState([])
    const [creditCardNames, setCreditCardNames] = useState([])
    const [period, setPeriod] = useState([])
    const [disabled, setDisabled] = useState(true)

    const getClosedPeriodByCreditCard = () => {
        fetch(`${path}/expensecreditcard/period/CLOSED`)
            .then(res => res.json())
            .then(data => {
                setCreditCard(data)
                const array = []
                data.map(it => array.push(it.name))
                array.unshift("")
                setCreditCardNames(array)
            })
    }

    useEffect(() => {
        getClosedPeriodByCreditCard()
        getExpensesByCreditCardAndPeriod()
    }, [])

    const handleChangeSelectAB = (event) => {
        const key = creditCard.findIndex(at => at.name == event.target.value)
        setPeriod(creditCard[key].openPeriods)
    }

    const [creditCardDetail, setCreditCardDetail] = useState([])
    const getExpensesByCreditCardAndPeriod = () => {
        fetch(`${path}/expensecreditcard/CLOSED`)
            .then(res => res.json())
            .then(data => {
                setCreditCardDetail(data)
            })
    }

    const [expensesDetail, setExpensesDetail] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const showDetailOfPeriodOfCreditCard = () => {
        const name = document.getElementById('pay-credit-card-name').value
        const period = document.getElementById('pay-credit-card-period').value
        creditCardDetail.map(ccd => {
            if (ccd.name == name && ccd.period == period) {
                setExpensesDetail(ccd.expenses)

                let total = 0
                ccd.expenses.map(e => {
                    total = total + e.amount
                })
                setTotalAmount(total)
            }
        })

        setDisabled(false)
    }

    const payPeriod = () => {
        document.getElementById('pay-credit-card-close').disabled = true
        document.getElementById('pay-credit-card-select').disabled = true
        document.getElementById('pay-credit-card-save').disabled = true
        document.getElementById('pay-credit-card-msg').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("pay-credit-card-name").value,
                "period": document.getElementById("pay-credit-card-period").value,
                "status": 'PAID'
            })
        }

        fetch(`${path}/expensecreditcard/period/status`, requestOptions)
            .then(res => res.json())
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
                    document.getElementById("pay-credit-card-period").value = ""

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
                        <select className="form-control" id='pay-credit-card-name' onChange={handleChangeSelectAB}>
                            {creditCardNames.map((opt, index) => <option key={index}>{opt}</option>)}
                        </select>
                    </div>
                    <Select text={'Periodo a pagar'} id={'pay-credit-card-period'} options={period} />
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
                            expensesDetail.map(e => <tr>
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