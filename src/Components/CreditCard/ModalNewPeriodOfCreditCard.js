import { useEffect, useState } from "react"
import LabelInput from "../Utils/LabelInput"
import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import InfoMessage from "../Utils/InfoMessage"

function ModalNewPeriodOfCreditCard({ path }) {

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

    const [creditCards, setCreditCards] = useState([])
    const getCreditCards = () => {
        fetch(`${path}/creditcard`)
            .then(res => res.json())
            .then(data => {
                const array = []
                data.map(d => array.push(d.name))
                setCreditCards(array)
            })
    }

    const createPeriod = () => {
        document.getElementById('modal-new-period-close').disabled = true
        document.getElementById('modal-new-period-save').disabled = true
        document.getElementById('modal-new-period-msg').style.display = "unset"

        const requestOptionsExpenseCreditCard = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("modal-new-period-credit-card").value,
                "debtAccount": document.getElementById("modal-new-period-debt-account").value,
                "closeDate": document.getElementById("modal-new-period-close-date").value,
                "paymentDate": document.getElementById("modal-new-period-payment-date").value,
                "month": document.getElementById("modal-new-period-period").value,
                "year": document.getElementById("modal-new-period-year").value
            })
        }

        fetch(`${path}/expensecreditcard/period`, requestOptionsExpenseCreditCard)
            .then(res => res.json())
            .then(data => {
                document.getElementById('modal-new-period-msg').innerHTML = 'El periodo de tarjeta fue creada con éxito'
                document.getElementById('modal-new-period-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('modal-new-period-msg').innerHTML = 'Estamos creando el periodo de tarjeta'
                    document.getElementById('modal-new-period-msg').style.display = "none"
                    document.getElementById('modal-new-period-credit-card').value = ""
                    document.getElementById('modal-new-period-debt-account').value = ""
                    document.getElementById('modal-new-period-close-date').value = ""
                    document.getElementById('modal-new-period-payment-date').value = ""
                    document.getElementById('modal-new-period-period').value = ""
                    document.getElementById('modal-new-period-year').value = ""
                    document.getElementById('modal-new-period-close').disabled = false
                    document.getElementById('modal-new-period-save').disabled = false
                }, 2000)
            })
    }

    useEffect(() => { getLiquidAccounts(); getCreditCards() }, [])

    return (
        <>
            <ModalButton target={'#modal-new-period'}>
                Crear nuevo periodo de tarjeta
            </ModalButton>
            <ModalBody id={'modal-new-period'}>
                <form>
                    <Select text={'Tarjeta'} id={'modal-new-period-credit-card'} options={creditCards} />
                    <Select text={'Cuenta a debitar'} id={'modal-new-period-debt-account'} options={liquidAccounts} />
                    <Select text={'Mes a crear'} id={'modal-new-period-period'} options={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']} />
                    <Select text={'Año a crear'} id={'modal-new-period-year'} options={['2023', '2024', '2025', '2026', '2027']} />
                    <LabelInput text={'Fecha de cierre del periodo'} id={'modal-new-period-close-date'} type={'date'} />
                    <LabelInput text={'Fecha de pago del periodo'} id={'modal-new-period-payment-date'} type={'date'} />
                </form>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="modal-new-period-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={createPeriod} id="modal-new-period-save">Save changes</button>
                </div>

                <InfoMessage id={'modal-new-period-msg'} type='alert alert-info'>
                    Estamos creando el periodo de la tarjeta
                </InfoMessage>

            </ModalBody>
        </>
    )
}

export default ModalNewPeriodOfCreditCard