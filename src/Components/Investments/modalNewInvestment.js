import LabelInput from "../Utils/LabelInput"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import ModalBody from "../Utils/ModalBody"
import { useState, useEffect } from 'react'
import InfoMessage from "../Utils/InfoMessage"
import LabelTextArea from "../Utils/LabelTextArea"

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

    const saveInvestment = () => {

        btnClose.disabled = true
        btnSave.disabled = true
        infoMessage.style.display = "unset"

        // first fetch (save investment)
        const requestOptionsInvestment = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
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

        fetch(`${path}/investment`, requestOptionsInvestment)
            .then((res) => res.json())
            .then(() => {
                console.log("first investment")
                infoMessage.innerHTML = 'Estamos guardando la cotización de compra'
            })

        // second fetch (save last value)
        const requestOptionsLastValue = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "ticket": ticket.value,
                "price": purchasePrice.value,
                "volume": 0
            })
        };

        fetch(`${path}/lastvalue/manualquote`, requestOptionsLastValue)
            .then(res => res.json())
            .then(() => {
                console.log("second investment")
                infoMessage.innerHTML = 'Estamos creando el registro de inversión'
            })

        // third fetch (save register)
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "date": purchaseDate.value,
                "expenses": [accountsAmounts],
                "credit": debitAccount,
                "currency": currency.value,
                "comments": comments.value,
                "benefitMP": false,
                "investment": true,
                "operation": operation.value
            })
        }

        fetch(`${path}/registers/batch`, requestOptionsRegister)
            .then((res) => res.json())
            .then(() => {
                console.log("third investment")
                infoMessage.className = 'alert alert-success'
                infoMessage.innerHTML = 'La inversión fue guardada con éxito'

                setTimeout(() => {
                    infoMessage.innerHTML = 'Estamos guardando la inversión'
                    infoMessage.style.display = "none"
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
            })

        // fourth fetch (save commission)
        const commissionRegister = {
            "debtAccount": "Comisiones",
            "discountAmount": 0,
            "debtAmount": commission.value
        }

        const requestOptionsCommission = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "date": purchaseDate.value,
                "expenses": [commissionRegister],
                "credit": account.value,
                "currency": commissionCurrency.value,
                "comments": comments.value,
                "benefitMP": false,
                "operation": operation.value
            })
        }

        fetch(`${path}/registers/batch`, requestOptionsCommission)
            .then((res) => res.json())
            .then(() => {
                console.log("fourth investment")
                infoMessage.className = 'alert alert-success'
                infoMessage.innerHTML = 'La inversión fue guardada con éxito'
            })
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
    const getAssetsTypes = () => {
        fetch(`${path}/assettype`)
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
        fetch(`${path}/account/liquid`)
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