import InfoMessage from "../Utils/InfoMessage"
import LabelInput from "../Utils/LabelInput"
import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import SuccessMessage from "../Utils/SuccessMessage"

function ModalNewAccount({path}) {

    const saveAccount = () => {
        document.getElementById('new-account-close').disabled = true
        document.getElementById('new-account-save').disabled = true
        document.getElementById('new-account-msg-processing').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": document.getElementById("name-account").value,
                "type": document.getElementById('type-account').value,
                "assetType": document.getElementById('asset-type').value,
                "ticket": document.getElementById('asset-ticket').value,
                "balance": document.getElementById('asset-balance').value,
                "currency": document.getElementById('asset-currency').value
            })
        }

        fetch(`${path}/account`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById('new-account-msg-processing').style.display = "none"
                document.getElementById('new-account-msg-successfull').style.display = "unset"
                setTimeout(() => {
                    document.getElementById('new-account-msg-successfull').style.display = "none"
                    document.getElementById('new-account-close').disabled = false
                    document.getElementById('new-account-save').disabled = false
                    document.getElementById("name-account").value = ""
                    document.getElementById("type-account").value = ""
                    document.getElementById("asset-type").value = ""
                    document.getElementById("asset-ticket").value = ""
                    document.getElementById("asset-balance").value = ""
                    document.getElementById("asset-currency").value = ""
                }, 2000)
            })

    }

    return (
        <>
            <ModalButton target={'#new-account'}>
                Crear nueva cuenta
            </ModalButton>
            <ModalBody id={'new-account'}>
                <form>
                    <LabelInput text={'Nombre de cuenta'} id={'name-account'} type={'string'} />
                    <Select text={'Tipo de cuenta'} id={'type-account'} options={['A', 'R-', 'R+']} />
                    <Select text={'Tipo de activo'} id={'asset-type'} options={['FCI', 'CEDEAR', 'ADR', 'Liquidez', 'Titulo público', 'ON', 'Cripto', 'Otros']} />
                    <LabelInput text={'Ticket'} id={'asset-ticket'} type={'string'} />
                    <LabelInput text={'Saldo'} id={'asset-balance'} type={'number'} />
                    <Select text={'Moneda'} id={'asset-currency'} options={['ARS', 'USD']} />
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-account-close">Cerrar</button>
                    <button type="button" className="btn btn-primary" onClick={saveAccount} id="new-account-save">Crear cuenta</button>
                </div>
                <InfoMessage text={'Estamos creando la cuenta'} id={'new-account-msg-processing'} />
                <SuccessMessage text={'La cuenta fue creada con éxito'} id={'new-account-msg-successfull'} />
            </ModalBody>
        </>
    )
}

export default ModalNewAccount