import { useEffect, useState } from "react"
import InfoMessage from "../../Utils/InfoMessage"
import LabelInput from "../../Utils/LabelInput"
import ModalBody from "../../Utils/ModalBody"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"

function ModalNewAccount({ path }) {

    const saveAccount = async () => {
        document.getElementById('new-account-close').disabled = true
        document.getElementById('new-account-save').disabled = true
        document.getElementById('new-account-msg').style.display = "unset"

        const requestOptionsAccount = {
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

        await fetch(`${path}/account`, requestOptionsAccount)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById('new-account-msg').innerHTML = 'Asociando la cuenta al tipo de activo'
            })

        const requestOptionsAssetType = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "ticket": document.getElementById("asset-ticket").value,
                "assetType": document.getElementById('asset-type').value
            })
        }

        await fetch(`${path}/assettype/associate`, requestOptionsAssetType)
            .then(res => res.json())
            .then(data => {
                console.log(data)

                document.getElementById('new-account-msg').innerHTML = 'La cuenta fue creada con éxito'

                setTimeout(() => {
                    document.getElementById('new-account-msg').style.display = "none"
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

    const [assetType, setAssetType] = useState([])
    const getAssetTypes = () => {
        fetch(`${path}/assettype`)
            .then(res => res.json())
            .then(data => {
                let array = []
                data.map(at => array.push(at.assetType))
                setAssetType(array)
            })
    }

    useEffect(() => { getAssetTypes() }, [])

    return (
        <>
            <ModalButton target={'#new-account'}>
                Crear nueva cuenta
            </ModalButton>
            <ModalBody id={'new-account'}>
                <form>
                    <LabelInput text={'Nombre de cuenta'} id={'name-account'} type={'string'} />
                    <Select text={'Tipo de cuenta'} id={'type-account'} options={['A', 'R-', 'R+']} />
                    <Select text={'Tipo de activo'} id={'asset-type'} options={assetType} />
                    <LabelInput text={'Ticket'} id={'asset-ticket'} type={'string'} />
                    <LabelInput text={'Saldo'} id={'asset-balance'} type={'number'} />
                    <Select text={'Moneda'} id={'asset-currency'} options={['ARS', 'USD']} />
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-account-close">Cerrar</button>
                    <button type="button" className="btn btn-primary" onClick={saveAccount} id="new-account-save">Crear cuenta</button>
                </div>
                <InfoMessage id={'new-account-msg'} type='alert alert-info'>
                    Estamos creando la cuenta
                </InfoMessage>
            </ModalBody>
        </>
    )
}

export default ModalNewAccount