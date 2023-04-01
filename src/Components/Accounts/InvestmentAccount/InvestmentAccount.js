import LabelInput from "../../Utils/LabelInput"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"
import AccountsMain from "../AccountsMain";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function NewInvestmentAccount({ path }) {
    const token = cookies.get('Token')

    const saveInvestmentAccount = async () => {
        const name = document.getElementById('new-investment-account-name')
        const currency = document.getElementById('new-investment-account')
        const assetType = document.getElementById('new-investment-account-asset-type')
        const ticket = document.getElementById('new-investment-account-ticket')
        const btnClose = document.getElementById('new-investment-account-close')
        const btnCreate = document.getElementById('new-investment-account-create')
        const msg = document.getElementById('new-investment-account-message')

        btnClose.disabled = true
        btnCreate.disabled = true
        msg.style.display = "unset"

        const requestOptionsAccount = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "name": name.value,
                "type": "R-",
                "assetType": assetType.value,
                "ticket": ticket.value,
                "balance": 0,
                "currency": currency.value
            })
        }

        const resOne = await fetch(`${path}/account`, requestOptionsAccount)
        const dataOne = await resOne.json()
        msg.innerHTML = "Estamos asociando la cuenta al tipo de activo"

        const requestOptionsAssetType = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "ticket": ticket.value,
                "assetType": assetType.value
            })
        }

        const resTwo = await fetch(`${path}/assettype/associate`, requestOptionsAssetType)
        const dataTwo = await resTwo.json()
        msg.className = "alert alert-success"
        msg.innerHTML = "La cuenta fue creada con éxito"

        setTimeout(() => {
            btnClose.disabled = false
            btnCreate.disabled = false
            msg.style.display = "none"
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
            <form>
                <LabelInput text={'Nombre de cuenta'} id={'new-investment-account-name'} type={'string'} />
                <Select text={'Moneda'} id={'new-investment-account'} options={['ARS', 'USD']} />
                <Select text={'Tipo de activo'} id={'new-investment-account-asset-type'} options={assetType} />
                <LabelInput text={'Ticket'} id={'new-investment-account-ticket'} type={'string'} />
            </form>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-investment-account-close">Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={saveInvestmentAccount} id="new-investment-account-create">Crear cuenta</button>
            </div>
            <InfoMessage id={'new-investment-account-message'} type='alert alert-info'>
                Estamos creando la cuenta
            </InfoMessage>
        </div>
    )
}

export default NewInvestmentAccount