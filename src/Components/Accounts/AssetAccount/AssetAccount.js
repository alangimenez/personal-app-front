import LabelInput from "../../Utils/LabelInput"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"
import AccountsMain from "../AccountsMain";
import { useState, useEffect } from "react";
import { createAccount, associateAccountWithAssetType } from "../AccountsFetchs/AccountFetchs"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function NewAssetAccount({ path }) {
    const token = cookies.get('Token')

    const saveAssetAccount = async () => {
        const name = document.getElementById('new-asset-account-name')
        const currency = document.getElementById('new-asset-account')
        const assetType = document.getElementById('new-asset-account-asset-type')
        const ticket = document.getElementById('new-investment-account-ticket')
        const btnClose = document.getElementById('new-asset-account-close')
        const btnCreate = document.getElementById('new-asset-account-create')
        const msg = document.getElementById('new-asset-account-message')

        btnClose.disabled = true
        btnCreate.disabled = true
        msg.style.display = "unset"

        // 1st fetch
        const dataFetchNewAccount = await createAccount(name.value, assetType.value, "A", ticket.value, currency.value, token, path)

        if (dataFetchNewAccount.error) {
            msg.className = "alert alert-danger"
            msg.innerHTML = dataFetchNewAccount.message
            resetMessages(btnClose, btnCreate, msg, name, currency, ticket, assetType)
            return
        }

        // 2nd fetch
        msg.innerHTML = "Estamos asociando la cuenta al tipo de activo"

        const dataFetchAssociateAccount = await associateAccountWithAssetType(ticket.value, assetType.value, token, path)

        if (dataFetchAssociateAccount.error) {
            msg.className = "alert alert-danger"
            msg.innerHTML = dataFetchAssociateAccount.message
        } else {
            msg.className = "alert alert-success"
            msg.innerHTML = "La cuenta fue creada con éxito"
        }

        resetMessages(btnClose, btnCreate, msg, name, currency, ticket, assetType)
    }

    const resetMessages = (btnClose, btnCreate, msg, name, currency, ticket, assetType) => {
        setTimeout(() => {
            btnClose.disabled = false
            btnCreate.disabled = false
            msg.style.display = "none"
            msg.className = "alert alert-info"
            msg.innerHTML = "Estamos creando la cuenta"

            name.value = ""
            currency.value = ""
            ticket.value = ""
            assetType.value = ""
        }, 2000)
    }

    const [assetType, setAssetType] = useState([])
    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }
    const getAssetTypes = () => {
        fetch(`${path}/assettype`, requestOptionsGet)
            .then(res => res.json())
            .then(data => {
                let array = []
                data.map(at => array.push(at.assetType))
                setAssetType(array)
            })
    }

    useEffect(() => { getAssetTypes() }, [])

    return (
        <div>
            <AccountsMain />
            <h1>Nueva cuenta de activo</h1>
            <form>
                <LabelInput text={'Nombre de cuenta'} id={'new-asset-account-name'} type={'string'} />
                <Select text={'Moneda'} id={'new-asset-account'} options={['ARS', 'USD']} />
                <Select text={'Tipo de activo'} id={'new-asset-account-asset-type'} options={assetType} />
                <LabelInput text={'Ticket'} id={'new-investment-account-ticket'} type={'string'} />
            </form>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-asset-account-close">Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={saveAssetAccount} id="new-asset-account-create">Crear cuenta</button>
            </div>
            <InfoMessage id={'new-asset-account-message'} type='alert alert-info'>
                Estamos creando la cuenta
            </InfoMessage>
        </div>
    )
}

export default NewAssetAccount