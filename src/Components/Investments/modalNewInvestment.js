import LabelInput from "../Utils/LabelInput"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import ModalBody from "../Utils/ModalBody"

function NewInvestment({ password }) {

    // save investment register
    const saveInvestment = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'password-security': password },
            body: JSON.stringify({
                "name": document.getElementById("nameOfAsset").value,
                "ticket": document.getElementById("ticket").value,
                "purchaseDate": document.getElementById("purchaseDate").value,
                "purchaseQuantity": document.getElementById("quantity").value,
                "purchasePrice": document.getElementById("purchasePrice").value,
                "currency": document.getElementById("currency").value,
                "assetType": document.getElementById("assetType").value,
                "operation": document.getElementById("operation").value,
                "actualQuantity": document.getElementById("quantity").value,
                "commission": document.getElementById("commision").value
            })
        }

        fetch('/investment', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
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
                        <LabelInput text={'Ticket'} id={'ticket'} type={'string'} />
                        <LabelInput text={'Purchase date'} id={'purchaseDate'} type={'date'} />
                        <LabelInput text={'Quantity'} id={'quantity'} type={'number'} />
                        <LabelInput text={'Purchase price'} id={'purchasePrice'} type={'number'} />
                        <LabelInput text={'Commissions'} id={'commission'} type={'number'} />
                        <Select text={'Currency'} id={'currency'} options={['USD', 'ARS']} />
                        <Select text={'Asset type'} id={'assetType'} options={['ADR', 'CEDEAR', 'Obligacion negociable', 'Titulo publico', 'Cripto', 'FCI']} />
                        <Select text={'Operation'} id={'operation'} options={['Buy', 'Sell']} />

                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveInvestment}>Save changes</button>
                </div>
            </ModalBody>
        </div>
    )
}

export default NewInvestment