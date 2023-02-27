import ModalBody from "../../Utils/ModalBody"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"
import { useState, useEffect } from "react"

function ModalClosePeriodCreditCard({ path }) {

    const [creditCard, setCreditCard] = useState([])
    const [creditCardNames, setCreditCardNames] = useState([])
    const [period, setPeriod] = useState([])
    const [disabled, setDisabled] = useState(true)

    const getOpenPeriodByCreditCard = () => {
        fetch(`${path}/expensecreditcard/period/OPEN`)
            .then(res => res.json())
            .then(data => {
                setCreditCard(data)
                const array = []
                data.map(it => array.push(it.name))
                array.unshift("")
                setCreditCardNames(array)
                /* setPeriod(data[0].openPeriods) */
            })
    }

    useEffect(() => {
        getOpenPeriodByCreditCard()
        getExpensesByCreditCardAndPeriod()
    }, [])

    const handleChangeSelectAB = (event) => {
        const key = creditCard.findIndex(at => at.name == event.target.value)
        setPeriod(creditCard[key].openPeriods)
        // showDetailOfPeriodOfCreditCard(event.target.value, document.getElementById('close-period-credit-card-period').value)
    }

    const [creditCardDetail, setCreditCardDetail] = useState([])
    const getExpensesByCreditCardAndPeriod = () => {
        console.log("paso")
        fetch(`${path}/expensecreditcard/OPEN`)
            .then(res => res.json())
            .then(data => {
                setCreditCardDetail(data)
            })
    }

    const [expensesDetail, setExpensesDetail] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)
    const showDetailOfPeriodOfCreditCard = () => {
        const name = document.getElementById('close-period-credit-card-name').value
        const period = document.getElementById('close-period-credit-card-period').value
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

    const closePeriod = () => {
        document.getElementById('close-period-credit-card-close').disabled = true
        document.getElementById('close-period-credit-card-select').disabled = true
        document.getElementById('close-period-credit-card-save').disabled = true
        document.getElementById('close-period-credit-card-msg').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("close-period-credit-card-name").value,
                "period": document.getElementById("close-period-credit-card-period").value,
                "status": 'CLOSED'
            })
        }

        fetch(`${path}/expensecreditcard/period/status`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('close-period-credit-card-msg').innerHTML = 'El periodo fue cerrado con éxito'
                document.getElementById('close-period-credit-card-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('close-period-credit-card-msg').innerHTML = 'Estamos cerrando el periodo de la tarjeta'
                    document.getElementById('close-period-credit-card-msg').style.display = "none"
                    document.getElementById('close-period-credit-card-close').disabled = false
                    document.getElementById('close-period-credit-card-select').disabled = false
                    document.getElementById('close-period-credit-card-save').disabled = false

                    document.getElementById("close-period-credit-card-name").value = ""
                    document.getElementById("close-period-credit-card-period").value = ""

                    setExpensesDetail([])
                }, 2000)
            })
    }

    return (
        <>
            <ModalButton target={'#close-period-credit-card'}>
                Cerrar periodo de tarjeta de crédito
            </ModalButton>
            <ModalBody id={'close-period-credit-card'}>
                <form>
                    <div className="form-group">
                        <label htmlFor='close-period-credit-card-name'>Tarjeta</label>
                        <select className="form-control" id='close-period-credit-card-name' onChange={handleChangeSelectAB}>
                            {creditCardNames.map(opt => <option>{opt}</option>)}
                        </select>
                    </div>
                    {/* <Select text={'Tarjeta'} id={'close-period-credit-card-name'} options={creditCardNames} onChange={handleChangeSelectAB} /> */}
                    <Select text={'Periodo a cerrar'} id={'close-period-credit-card-period'} options={period} />
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
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="close-period-credit-card-close">Close</button>
                    <button type="button" className="btn btn-secondary" id="close-period-credit-card-select" onClick={showDetailOfPeriodOfCreditCard}>Select</button>
                    <button type="button" className="btn btn-primary" onClick={closePeriod} id="close-period-credit-card-save" disabled={disabled}>Save changes</button>
                </div>

                <InfoMessage id={'close-period-credit-card-msg'} type='alert alert-info'>
                    Estamos cerrando el periodo de la tarjeta
                </InfoMessage>

            </ModalBody>
        </>
    )
}

export default ModalClosePeriodCreditCard