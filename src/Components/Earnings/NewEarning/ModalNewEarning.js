import { useState, useEffect } from "react"
import LabelInput from "../../Utils/LabelInput"
import Select from "../../Utils/Select"
import ModalButton from "../../Utils/ModalButton"
import ModalBody from "../../Utils/ModalBody"
import LabelTextArea from "../../Utils/LabelTextArea"
import InfoMessage from "../../Utils/InfoMessage"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ModalNewEarning({ path }) {
    const token = cookies.get('Token')

    const saveEarning = () => {
        document.getElementById('modal-new-earning-close').disabled = true
        document.getElementById('modal-new-earning-save').disabled = true
        document.getElementById('modal-new-earning-msg').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "date": document.getElementById('modal-new-earning-date').value,
                "debitCurrency": document.getElementById('modal-new-earning-currency').value,
                "creditCurrency": document.getElementById('modal-new-earning-currency').value,
                "credit": document.getElementById('modal-new-earning-account-earning').value,
                "comments": document.getElementById('modal-new-earning-comments').value,
                "creditAmount": document.getElementById('modal-new-earning-amount').value,
                "debit": document.getElementById('modal-new-earning-account-to').value,
                "debitAmount": document.getElementById('modal-new-earning-amount').value
            })
        };

        fetch(`${path}/registers/earning`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('modal-new-earning-msg').innerHTML = 'El ingreso fue registrado con éxito'
                document.getElementById('modal-new-earning-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('modal-new-earning-msg').innerHTML = 'Estamos registrando el ingreso'
                    document.getElementById('modal-new-earning-msg').style.display = "none"
                    document.getElementById('modal-new-earning-close').disabled = false
                    document.getElementById('modal-new-earning-save').disabled = false
                    document.getElementById('modal-new-earning-date').value = ""
                    document.getElementById('modal-new-earning-currency').value = ""
                    document.getElementById('modal-new-earning-account-earning').value = ""
                    document.getElementById('modal-new-earning-comments').value = ""
                    document.getElementById('modal-new-earning-account-to').value = ""
                    document.getElementById('modal-new-earning-amount').value = ""
                }, 2000)
            })
    }

    const [accounts, setAccounts] = useState([])
    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }
    const getAccounts = () => {
        fetch(`${path}/account/liquid`, requestOptionsGet)
            .then((res) => res.json())
            .then((data) => setAccounts(data))
    }

    const [earningAccounts, setEarningAccounts] = useState([])
    const getEarningAccounts = () => {
        fetch(`${path}/account/type/R+`, requestOptionsGet)
            .then((res) => res.json())
            .then((data) => setEarningAccounts(data))
    }

    useEffect(() => { getAccounts(); getEarningAccounts() }, [])

    return (
        <>
            <ModalButton target={'#modal-new-earning'}>
                Registrar ingreso
            </ModalButton>
            <ModalBody id={'modal-new-earning'}>
                <form>
                    <LabelInput text={'Fecha de operación'} id={'modal-new-earning-date'} type={'date'} />
                    <Select text={'Fuente de ingreso'} id={'modal-new-earning-account-earning'} options={earningAccounts} />
                    {/* <div className="form-group">
                        <label htmlFor='modal-new-earning-account-earning'>Fuente de ingreso</label>
                        <select className="form-control" id='modal-new-earning-account-earning'>
                            {earningAccounts.map(opt => <option>{opt}</option>)}
                        </select>
                    </div> */}
                    <Select text={'Cuenta de acreditación'} id={'modal-new-earning-account-to'} options={accounts} />
                    {/* <div className="form-group">
                        <label htmlFor='modal-new-earning-account-to'>Cuenta de acreditación</label>
                        <select className="form-control" id='modal-new-earning-account-to'>
                            {accounts.map(opt => <option>{opt}</option>)}
                        </select>
                    </div> */}
                    <LabelInput text={'Monto'} id={'modal-new-earning-amount'} type={'number'} />
                    <Select text={'Moneda'} id={'modal-new-earning-currency'} options={['ARS', 'USD']} />
                    <LabelTextArea text={'Comentarios'} id={'modal-new-earning-comments'} />
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="modal-new-earning-close">Cerrar</button>
                    <button type="button" className="btn btn-primary" id="modal-new-earning-save" onClick={saveEarning}>Registar ingreso</button>
                </div>
                <InfoMessage id={'modal-new-earning-msg'} type={'alert alert-info'}>
                    Estamos registrando el ingreso
                </InfoMessage>
            </ModalBody>
        </>
    )
}

export default ModalNewEarning