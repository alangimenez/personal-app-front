import { useEffect, useState } from "react"
import LabelInput from "../../Utils/LabelInput"
import ModalBody from "../../Utils/ModalBody"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"
import NewInputs from "../../Expenses/NewInputs"

function ModalNewCreditCardExpense({path}) {

    const [liquidAccounts, setLiquidAccounts] = useState([])
    const getLiquidAccounts = () => {
        fetch(`${path}/account/liquid-fci`)
            .then(res => res.json())
            .then(data => {
                const array = []
                data.map(d => array.push(d.name))
                setLiquidAccounts(array)
            })
    }

    const saveCreditCard = () => {
        document.getElementById('new-expense-credit-card-close').disabled = true
        document.getElementById('new-expense-credit-card-save').disabled = true
        document.getElementById('new-expense-credit-card-msg').style.display = "unset"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("new-expense-credit-card-name").value,
                "debtAccount": document.getElementById("new-expense-credit-card-debt-account").value
            })
        }

        fetch(`${path}/creditcard`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('new-expense-credit-card-msg').innerHTML = 'La cuenta fue creada con éxito'
                document.getElementById('new-expense-credit-card-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('new-expense-credit-card-msg').innerHTML = 'Estamos creando la tarjeta'
                    document.getElementById('new-expense-credit-card-msg').style.display = "none"
                    document.getElementById('new-expense-credit-card-name').value = ""
                    document.getElementById('new-expense-credit-card-debt-account').value = ""
                    document.getElementById('new-expense-credit-card-close').disabled = false
                    document.getElementById('new-expense-credit-card-save').disabled = false
                }, 2000)
            })
    }

    useEffect(() => { getLiquidAccounts() }, [])

    return (
        <>
            <ModalButton target={'#new-expense-credit-card'}>
                Crear nuevo gasto con tarjeta
            </ModalButton>
            <ModalBody id={'new-expense-credit-card'}>
                <form>
                    <Select text={'Tarjeta'} id={'new-expense-credit-card-name'} options={['Tarjeta 1', 'Tarjeta 2']} />
                    <LabelInput text={'Fecha del gasto'} id={'new-expense-credit-card-date'} type={'date'} />
                    <Select text={'Periodo'} id={'new-expense-credit-card-period'} options={['Periodo 1', 'Periodo 2']} />
                    <LabelInput text={'Cantidad de cuotas'} id={'new-expense-credit-payments'} type={'number'} />
                    <NewInputs path={path} />
                </form>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-expense-credit-card-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveCreditCard} id="new-expense-credit-card-save">Save changes</button>
                </div>

                <InfoMessage id={'new-expense-credit-card-msg'} type='alert alert-info'>
                    Estamos guardando el gasto
                </InfoMessage>

            </ModalBody>
        </>
    )
}

export default ModalNewCreditCardExpense