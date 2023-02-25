import { useEffect, useState } from "react"
import LabelInput from "../../Utils/LabelInput"
import ModalBody from "../../Utils/ModalBody"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"

function ModalNewCreditCard({path}) {

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
        document.getElementById('new-credit-card-close').disabled = true
        document.getElementById('new-credit-card-save').disabled = true
        document.getElementById('new-credit-card-msg').style.display = "unset"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("new-credit-card-name").value,
                "debtAccount": document.getElementById("new-credit-card-debt-account").value
            })
        }

        fetch(`${path}/creditcard`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('new-credit-card-msg').innerHTML = 'La cuenta fue creada con éxito'
                document.getElementById('new-credit-card-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('new-credit-card-msg').innerHTML = 'Estamos creando la tarjeta'
                    document.getElementById('new-credit-card-msg').style.display = "none"
                    document.getElementById('new-credit-card-name').value = ""
                    document.getElementById('new-credit-card-debt-account').value = ""
                    document.getElementById('new-credit-card-close').disabled = false
                    document.getElementById('new-credit-card-save').disabled = false
                }, 2000)
            })
    }

    useEffect(() => { getLiquidAccounts() }, [])

    return (
        <>
            <ModalButton target={'#new-credit-card'}>
                Crear nueva tarjeta
            </ModalButton>
            <ModalBody id={'new-credit-card'}>
                <form>
                    <LabelInput text={'Nombre de la tarjeta'} id={'new-credit-card-name'} type={'string'} />
                    <Select text={'Cuenta a debitar'} id={'new-credit-card-debt-account'} options={liquidAccounts} />
                </form>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-credit-card-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveCreditCard} id="new-credit-card-save">Save changes</button>
                </div>

                <InfoMessage id={'new-credit-card-msg'} type='alert alert-info'>
                    Estamos creando la tarjeta
                </InfoMessage>

            </ModalBody>
        </>
    )
}

export default ModalNewCreditCard