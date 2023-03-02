import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import LabelInput from "../Utils/LabelInput"
import InfoMessage from "../Utils/InfoMessage"
import { useState, useEffect } from "react"
import Select from "../Utils/Select"
import LabelTextArea from "../Utils/LabelTextArea"

function ModalNewTransfer({ path }) {

    const saveTransfer = () => {
        document.getElementById('modal-new-transfer-close').disabled = true
        document.getElementById('modal-new-transfer-save').disabled = true
        document.getElementById('modal-new-transfer-msg').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "date": document.getElementById('modal-new-transfer-date').value,
                "currency": document.getElementById('modal-new-transfer-currency').value,
                "credit": document.getElementById('modal-new-transfer-account-from').value,
                "comments": document.getElementById('modal-new-transfer-comments').value,
                "expenses": [{
                    "debtAccount": document.getElementById('modal-new-transfer-account-to').value,
                    "debtAmount": document.getElementById('modal-new-transfer-amount').value,
                    "discountAmount": 0
                }]
            })
        };

        fetch(`${path}/registers/batch`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('modal-new-transfer-msg').innerHTML = 'La transferencia fue registrada con éxito'
                document.getElementById('modal-new-transfer-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('modal-new-transfer-msg').innerHTML = 'Estamos registrando la transferencia'
                    document.getElementById('modal-new-transfer-msg').style.display = "none"
                    document.getElementById('modal-new-transfer-close').disabled = false
                    document.getElementById('modal-new-transfer-save').disabled = false
                    document.getElementById('modal-new-transfer-date').value = ""
                    document.getElementById('modal-new-transfer-currency').value = ""
                    document.getElementById('modal-new-transfer-account-from').value = ""
                    document.getElementById('modal-new-transfer-comments').value = ""
                    document.getElementById('modal-new-transfer-account-to').value = ""
                    document.getElementById('modal-new-transfer-amount').value = ""
                }, 2000)
            })
    }

    const [accounts, setAccounts] = useState([])
    const getAccounts = () => {
        fetch(`${path}/account/liquid`)
            .then((res) => res.json())
            .then((data) => setAccounts(data))
    }

    useEffect(() => { getAccounts() }, [])

    return (
        <>
            <ModalButton target={'#modal-new-transfer'}>
                Registrar transferencia
            </ModalButton>
            <ModalBody id={'modal-new-transfer'}>
                <form>
                    <LabelInput text={'Fecha de operación'} id={'modal-new-transfer-date'} type={'date'} />
                    <div className="form-group">
                        <label htmlFor='modal-new-transfer-account-from'>Cuenta de origen</label>
                        <select className="form-control" id='modal-new-transfer-account-from'>
                            {accounts.map(opt => <option>{opt}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor='modal-new-transfer-account-to'>Cuenta de destino</label>
                        <select className="form-control" id='modal-new-transfer-account-to'>
                            {accounts.map(opt => <option>{opt}</option>)}
                        </select>
                    </div>
                    <LabelInput text={'Monto de transferencia'} id={'modal-new-transfer-amount'} type={'number'} />
                    <Select text={'Moneda'} id={'modal-new-transfer-currency'} options={['ARS', 'USD']} />
                    <LabelTextArea text={'Comentarios'} id={'modal-new-transfer-comments'} />
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="modal-new-transfer-close">Cerrar</button>
                    <button type="button" className="btn btn-primary" id="modal-new-transfer-save" onClick={saveTransfer}>Registar transferencia</button>
                </div>
                <InfoMessage id={'modal-new-transfer-msg'} type={'alert alert-info'}>
                    Estamos registrando la transferencia
                </InfoMessage>
            </ModalBody>
        </>
    )
}

export default ModalNewTransfer