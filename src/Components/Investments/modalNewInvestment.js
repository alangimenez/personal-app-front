import LabelInput from "../Utils/LabelInput"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import ModalBody from "../Utils/ModalBody"
import { useState, useEffect } from 'react'
import InfoMessage from "../Utils/InfoMessage"

function ModalNewInvestment({ path }) {

    // save investment register
    const saveInvestment = () => {

        document.getElementById('new-investment-btn-close').disabled = true
        document.getElementById('new-investment-btn-save').disabled = true
        document.getElementById('new-investment-msg').style.display = "unset"

        const requestOptionsInvestment = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "ticket": document.getElementById("ticket").value,
                "operationDate": document.getElementById("purchaseDate").value,
                "operationQuantity": document.getElementById("quantity").value,
                "operationPrice": document.getElementById("purchasePrice").value,
                "operationCurrency": document.getElementById("currency").value,
                "assetType": document.getElementById("assetType").value,
                "operation": document.getElementById("operation").value,
                "actualQuantity": document.getElementById("quantity").value,
                "commission": document.getElementById("commission").value,
                "commissionCurrency": document.getElementById("currency").value
            })
        }

        fetch(`${path}/investment`, requestOptionsInvestment)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById('new-investment-msg').innerHTML = 'Estamos guardando la cotización de compra'
            })

        const requestOptionsLastValue = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "ticket": document.getElementById('ticket').value,
                "price": document.getElementById('purchasePrice').value,
                "volume": 0
            })
        };

        fetch(`${path}/lastvalue/manualquote`, requestOptionsLastValue)
            .then(res => res.json())
            .then(data => {
                document.getElementById('new-investment-msg').innerHTML = 'La inversión fue guardada con éxito'
                document.getElementById('new-investment-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('new-investment-msg').innerHTML = 'Estamos creando el tipo de activo'
                    document.getElementById('new-investment-msg').style.display = "none"
                    document.getElementById('new-investment-btn-close').disabled = false
                    document.getElementById('new-investment-btn-save').disabled = false
                    document.getElementById("ticket").value = ""
                    document.getElementById("purchaseDate").value = ""
                    document.getElementById("quantity").value = ""
                    document.getElementById("purchasePrice").value = ""
                    document.getElementById("currency").value = ""
                    document.getElementById("assetType").value = ""
                    document.getElementById("operation").value = ""
                    document.getElementById("commission").value = ""
                }, 2000)
            })
    }

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

    useEffect(() => { getAssetsTypes() }, [])

    const handleChangeSelect = (event) => {
        const key = assetTypeInfo.findIndex(at => at.assetType == event.target.value)
        setListOfAssets(assetTypeInfo[key].assets)
    }

    return (
        <div>
            <ModalButton target={'#exampleModal'}>
                Ingresar nueva inversión
            </ModalButton>

            <ModalBody id={'exampleModal'}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        {/* <Select text={'Asset type'} id={'assetType'} options={assetTypes} /> */}
                        <div className="form-group">
                            <label htmlFor='assetType'>Asset type</label>
                            <select className="form-control" id='assetType' onChange={handleChangeSelect}>
                                {assetTypes.map((opt, index) => <option key={index}>{opt}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor='ticket'>Ticket</label>
                            <select className="form-control" id='ticket'>
                                {listOfAssets.map((opt, index) => <option key={index}>{opt}</option>)}
                            </select>
                        </div>
                        <LabelInput text={'Purchase date'} id={'purchaseDate'} type={'date'} />
                        <LabelInput text={'Quantity'} id={'quantity'} type={'number'} />
                        <LabelInput text={'Purchase price'} id={'purchasePrice'} type={'number'} />
                        <LabelInput text={'Commissions'} id={'commission'} type={'number'} />
                        <Select text={'Currency'} id={'currency'} options={['USD', 'ARS']} />
                        <Select text={'Operation'} id={'operation'} options={['Buy', 'Sell']} />

                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-investment-btn-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveInvestment} id="new-investment-btn-save">Save changes</button>
                </div>
                <InfoMessage id={'new-investment-msg'} type={'alert alert-info'}>
                    Estamos guardando la inversión
                </InfoMessage>
            </ModalBody>
        </div>
    )
}

export default ModalNewInvestment