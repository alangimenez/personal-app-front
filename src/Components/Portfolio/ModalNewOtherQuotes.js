import ModalButton from '../Utils/ModalButton'
import ModalBody from '../Utils/ModalBody'
import InfoMessage from '../Utils/InfoMessage'
import Context from '../Context/Context'
import { useContext } from 'react'
import LabelInput from '../Utils/LabelInput'
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ModalNewOtherQuotes({path}) {
    const token = cookies.get('Token')

    const { date } = useContext(Context)
    
    const saveOtherQuote = () => {
        document.getElementById('new-other-quote-btn-close').disabled = true
        document.getElementById('new-other-quote-btn-save').disabled = true
        document.getElementById('new-other-quote-msg').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "date": document.getElementById('new-other-quotes-date').value,
                "quotes": {
                    "dolarbnacomprador": document.getElementById('new-other-quote-bna-buyer').value,
                    "dolarbnavendedor": document.getElementById('new-other-quote-bna-seller').value,
                    "dolarmep": document.getElementById('new-other-quote-mep').value
                }
            })
        };

        fetch(`${path}/otherquotes`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('new-other-quote-msg').innerHTML = 'Las cotizaciones fueron actualizadas con éxito'
                document.getElementById('new-other-quote-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('new-other-quote-msg').innerHTML = 'Estamos creando el tipo de activo'
                    document.getElementById('new-other-quote-msg').style.display = "none"
                    document.getElementById('new-other-quote-btn-close').disabled = false
                    document.getElementById('new-other-quote-btn-save').disabled = false
                    document.getElementById('new-other-quote-bna-buyer').value = ""
                    document.getElementById('new-other-quote-bna-seller').value = ""
                    document.getElementById('new-other-quote-mep').value = ""
                }, 2000)
            })
    }

    return (
        <div>
            <ModalButton target={'#new-other-quote-new-modal'}>
                Actualizar dolar
            </ModalButton>
            <ModalBody id={'new-other-quote-new-modal'}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor='other-quotes-date'>Fecha</label>
                            <input type='date' className="form-control" id='new-other-quotes-date' disabled value={date} ></input>
                        </div>
                        <LabelInput text={'Precio BNA comprador'} id={'new-other-quote-bna-buyer'} type={'number'} />
                        <LabelInput text={'Precio BNA vendedor'} id={'new-other-quote-bna-seller'} type={'number'} />
                        <LabelInput text={'Precio MEP'} id={'new-other-quote-mep'} type={'number'} />
{/*                         <LabelInput text={'Purchase date'} id={'purchaseDate'} type={'date'} />
                        <LabelInput text={'Quantity'} id={'quantity'} type={'number'} />
                        <LabelInput text={'Purchase price'} id={'purchasePrice'} type={'number'} />
 */}
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-other-quote-btn-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveOtherQuote} id="new-other-quote-btn-save">Save changes</button>
                </div>
                <InfoMessage id={'new-other-quote-msg'} type={'alert alert-info'}>
                    Estamos actualizando las cotizaciones
                </InfoMessage>
            </ModalBody>
        </div>
    )
}

export default ModalNewOtherQuotes