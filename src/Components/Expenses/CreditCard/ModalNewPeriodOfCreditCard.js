import { useEffect, useState } from "react"
import LabelInput from "../../Utils/LabelInput"
import ModalBody from "../../Utils/ModalBody"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"

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

    const createPeriod = () => {
        document.getElementById('modal-new-period-close').disabled = true
        document.getElementById('modal-new-period-save').disabled = true
        document.getElementById('modal-new-period-msg').style.display = "unset"
        const requestOptionsCreditCard = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("modal-new-period-name").value,
                "debtAccount": document.getElementById("modal-new-period-debt-account").value
            })
        }

        fetch(`${path}/creditcard`, requestOptionsCreditCard)
            .then(res => res.json())
            .then(data => {
                document.getElementById('modal-new-period-msg').innerHTML = 'Estamos creando el periodo de la tarjeta'
            })

        const requestOptionsExpenseCreditCard = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("modal-new-period-name").value,
                "debtAccount": document.getElementById("modal-new-period-debt-account").value,
                "closeDate": document.getElementById("modal-new-period-close-date").value,
                "paymentDate": document.getElementById("modal-new-period-payment-date").value,
                "period": document.getElementById("modal-new-period-period").value
            })
        }

        fetch(`${path}/expensecreditcard/period`, requestOptionsExpenseCreditCard)
            .then(res => res.json())
            .then(data => {
                document.getElementById('modal-new-period-msg').innerHTML = 'La tarjeta fue creada con éxito'
                document.getElementById('modal-new-period-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('modal-new-period-msg').innerHTML = 'Estamos creando la tarjeta'
                    document.getElementById('modal-new-period-msg').style.display = "none"
                    document.getElementById('modal-new-period-name').value = ""
                    document.getElementById('modal-new-period-debt-account').value = ""
                    document.getElementById('modal-new-period-close-date').value = ""
                    document.getElementById('modal-new-period-payment-date').value = ""
                    document.getElementById('modal-new-period-close').disabled = false
                    document.getElementById('modal-new-period-save').disabled = false
                }, 2000)
            })
    }

    useEffect(() => { getLiquidAccounts() }, [])

    return (
        <>
            <ModalButton target={'#modal-new-period'}>
                Crear nueva tarjeta
            </ModalButton>
            <ModalBody id={'modal-new-period'}>
                <form>
                    <LabelInput text={'Nombre de la tarjeta'} id={'modal-new-period-name'} type={'string'} />
                    <Select text={'Cuenta a debitar'} id={'modal-new-period-debt-account'} options={liquidAccounts} />
                    <Select text={'Periodo inicial'} id={'modal-new-period-period'} options={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']} />
                    <LabelInput text={'Fecha de cierre del periodo inicial'} id={'modal-new-period-close-date'} type={'date'} />
                    <LabelInput text={'Fecha de pago del periodo inicial'} id={'modal-new-period-payment-date'} type={'date'} />
                </form>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="modal-new-period-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={createPeriod} id="modal-new-period-save">Save changes</button>
                </div>

                <InfoMessage id={'modal-new-period-msg'} type='alert alert-info'>
                    Estamos creando la tarjeta
                </InfoMessage>

            </ModalBody>
        </>
    )
}

export default ModalNewPeriodOfCreditCard