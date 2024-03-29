import LabelInput from "../Utils/LabelInput"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import ModalBody from "../Utils/ModalBody"
import { useState, useEffect } from 'react'
import InfoMessage from "../Utils/InfoMessage"
import LabelTextArea from "../Utils/LabelTextArea"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ModalNewInvestment({ path }) {
    const btnClose = document.getElementById('modal-new-investment-btn-close')
    const btnSave = document.getElementById('modal-new-investment-btn-save')
    const infoMessage = document.getElementById('modal-new-investment-msg')
    const ticket = document.getElementById("modal-new-investment-ticket")
    const purchaseDate = document.getElementById("modal-new-investment-purchase-date")
    const quantity = document.getElementById("modal-new-investment-quantity")
    const purchasePrice = document.getElementById("modal-new-investment-purchase-price")
    const currency = document.getElementById("modal-new-investment-operation-currency")
    const assetType = document.getElementById("modal-new-investment-asset-type")
    const operation = document.getElementById("modal-new-investment-operation")
    const commission = document.getElementById("modal-new-investment-commission")
    const account = document.getElementById("modal-new-investment-account")
    const comments = document.getElementById("modal-new-investment-comments")
    const commissionCurrency = document.getElementById("modal-new-investment-commission-currency")
    const comissionAccount = document.getElementById('modal-new-investment-commission-account')

    const token = cookies.get('Token')

    const saveInvestment = async () => {

        btnClose.disabled = true
        btnSave.disabled = true
        infoMessage.style.display = "unset"

        // first fetch (save investment)
        const requestOptionsInvestment = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "ticket": ticket.value,
                "operationDate": purchaseDate.value,
                "operationQuantity": quantity.value,
                "operationPrice": purchasePrice.value,
                "operationCurrency": currency.value,
                "assetType": assetType.value,
                "operation": operation.value,
                "actualQuantity": quantity.value,
                "commission": commission.value,
                "commissionCurrency": currency.value
            })
        }

        const resOne = await fetch(`${path}/investment`, requestOptionsInvestment)
        const dataOne = await resOne.json()
        console.log("first investment")
        
        infoMessage.innerHTML = 'Estamos creando el registro de inversión'

        let creditAccount
        let debitAccount
        if (operation.value === "Buy") {
            creditAccount = ticket.value
            debitAccount = account.value
        } else {
            creditAccount = account.value
            debitAccount = ticket.value
        }

        const accountsAmounts = {
            "debtAccount": creditAccount,
            "discountAmount": 0,
            "debtAmount": purchasePrice.value * quantity.value
        }

        const requestOptionsRegister = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "date": purchaseDate.value,
                "expenses": [accountsAmounts],
                "credit": debitAccount,
                "currency": currency.value,
                "comments": comments.value,
                "benefitMP": false,
                "investment": true,
                "operation": operation.value,
                "type": ["investment", "expense"],
                "load": false
            })
        }

        const resThree = await fetch(`${path}/registers/batch`, requestOptionsRegister)
        const dataThree = await resThree.json()
        console.log("third investment")
        infoMessage.innerHTML = 'Estamos creando el registro de las comisiones'

        // fourth fetch (save commission)
        const commissionRegister = {
            "debtAccount": "Comisiones",
            "discountAmount": 0,
            "debtAmount": commission.value
        }

        const requestOptionsCommission = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "date": purchaseDate.value,
                "expenses": [commissionRegister],
                "credit": comissionAccount.value,
                "currency": commissionCurrency.value,
                "comments": comments.value,
                "benefitMP": false,
                "operation": operation.value,
                "type": ["expense", "commission"],
                "load": false
            })
        }

        const resFour = await fetch(`${path}/registers/batch`, requestOptionsCommission)
        const dataFour = await resFour.json()
        console.log("fourth investment")
        infoMessage.className = 'alert alert-success'
        infoMessage.innerHTML = 'La inversión fue guardada con éxito'

        setTimeout(() => {
            infoMessage.style.display = "none"
            infoMessage.innerHTML = 'Estamos guardando la inversión'
            infoMessage.className = 'alert alert-info'
            btnClose.disabled = false
            btnSave.disabled = false
            ticket.value = ""
            purchaseDate.value = ""
            quantity.value = ""
            purchasePrice.value = ""
            currency.value = ""
            assetType.value = ""
            operation.value = ""
            commission.value = ""
            comments.value = ""
        }, 2000)
    }

    // handlers
    const handleChangeSelect = (event) => {
        const key = assetTypeInfo.findIndex(at => at.assetType == event.target.value)
        setListOfAssets(assetTypeInfo[key].assets)
    }

    // useEffect functions
    const [assetTypeInfo, setAssetTypeInfo] = useState([])
    const [assetTypes, setAssetTypes] = useState([])
    const [listOfAssets, setListOfAssets] = useState([])
    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }
    const getAssetsTypes = () => {
        fetch(`${path}/assettype`, requestOptionsGet)
            .then(res => res.json())
            .then(data => {
                setAssetTypeInfo(data)
                let array = []
                data.map(at => array.push(at.assetType))
                setAssetTypes(array)
                setListOfAssets(data[0].assets)
            })
    }

    const [liquidAccounts, setLiquidAccounts] = useState([])

    const getLiquidAccounts = () => {
        fetch(`${path}/account/liquid`, requestOptionsGet)
            .then(res => res.json())
            .then(data => setLiquidAccounts(data))
    }

    useEffect(() => { getAssetsTypes(); getLiquidAccounts() }, [])

    return (
        <div>
            <ModalButton target={'#modal-new-investment'}>
                Ingresar nueva inversión
            </ModalButton>

            <ModalBody id={'modal-new-investment'}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor='modal-new-investment-asset-type'>Asset type</label>
                            <select className="form-control" id='modal-new-investment-asset-type' onChange={handleChangeSelect}>
                                {assetTypes.map((opt, index) => <option key={index}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor='modal-new-investment-ticket'>Ticket</label>
                            <select className="form-control" id='modal-new-investment-ticket'>
                                {listOfAssets.map((opt, index) => <option key={index}>{opt}</option>)}
                            </select>
                        </div>
                        <LabelInput text={'Purchase date'} id={'modal-new-investment-purchase-date'} type={'date'} />
                        <LabelInput text={'Quantity'} id={'modal-new-investment-quantity'} type={'number'} />
                        <LabelInput text={'Purchase price'} id={'modal-new-investment-purchase-price'} type={'number'} />
                        <Select text={'Operation currency'} id={'modal-new-investment-operation-currency'} options={['USD', 'ARS']} />
                        <LabelInput text={'Commissions'} id={'modal-new-investment-commission'} type={'number'} />
                        <Select text={'Commission account'} id={'modal-new-investment-commission-account'} options={liquidAccounts} />
                        <Select text={'Commission currency'} id={'modal-new-investment-commission-currency'} options={['USD', 'ARS']} />
                        <Select text={'Operation'} id={'modal-new-investment-operation'} options={['Buy', 'Sell']} />
                        <Select text={'Cuenta débito/crédito'} id={'modal-new-investment-account'} options={liquidAccounts} />
                        <LabelTextArea text={'Comentarios'} id={'modal-new-investment-comments'} />

                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="modal-new-investment-btn-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveInvestment} id="modal-new-investment-btn-save">Save changes</button>
                </div>
                <InfoMessage id={'modal-new-investment-msg'} type={'alert alert-info'}>
                    Estamos guardando la inversión
                </InfoMessage>
            </ModalBody>
        </div>
    )
}

export default ModalNewInvestment