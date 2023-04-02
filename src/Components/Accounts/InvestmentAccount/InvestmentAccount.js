import DataContext from "../../Context/Context"
import LabelInput from "../../Utils/LabelInput"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"
import AccountsMain from "../AccountsMain";
import { useState, useEffect, useContext } from "react";
import Cookies from "universal-cookie";
import NewPeriodOfPayments from "./NewPeriodOfPayment";
const cookies = new Cookies();

function NewInvestmentAccount({ path }) {
    const token = cookies.get('Token')
    const { itemsInvestment, resetItemsInvestment } = useContext(DataContext)

    const saveInvestmentAccount = async () => {
        const name = document.getElementById('new-investment-account-name')
        const currency = document.getElementById('new-investment-account')
        const assetType = document.getElementById('new-investment-account-asset-type')
        const ticket = document.getElementById('new-investment-account-ticket')
        const rate = document.getElementById('new-investment-account-rate')
        const startDate = document.getElementById('new-investment-account-start-date')
        const finishDate = document.getElementById('new-investment-account-finish-date')
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
        msg.innerHTML = "Estamos guardando el cashflow del bono"

        const interestAmount = []
        const amortizationAmount = []
        const dateOfPayment = []
        for (let i = 0; i < itemsInvestment; i++) {
            interestAmount.push(document.getElementById(`interest${i}`).value)
            amortizationAmount.push(document.getElementById(`amortization${i}`).value)
            dateOfPayment.push(document.getElementById(`date${i}`).value)
        }
        const requestOptionsCashflow = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                ticket: ticket.value,
                start: startDate.value,
                finish: finishDate.value,
                rate: rate.value,
                dateOfPayment: dateOfPayment,
                amountInterest: interestAmount,
                amountAmortization: amortizationAmount 
            })
        }
        const resThree = await fetch(`${path}/cashflow`, requestOptionsCashflow)
        msg.className = "alert alert-success"
        msg.innerHTML = "La cuenta fue creada con éxito"

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
            startDate.value = ""
            finishDate.value = ""
            rate.value = ""

            const parent = document.getElementById('new-period-of-payment')
            while (parent.firstChild) {
                parent.firstChild.remove()
            }
            resetItemsInvestment()
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
                <LabelInput text={'Fecha de inicio'} id={'new-investment-account-start-date'} type={'date'} />
                <LabelInput text={'Fecha de fin'} id={'new-investment-account-finish-date'} type={'date'} />
                <LabelInput text={'Tasa de interes'} id={'new-investment-account-rate'} type={'number'} />
            </form>
            <NewPeriodOfPayments />
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