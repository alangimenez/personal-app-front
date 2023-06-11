import ModalButton from '../Utils/ModalButton'
import ModalBody from '../Utils/ModalBody'
import InfoMessage from '../Utils/InfoMessage'
import Context from '../Context/Context'
import { useContext } from 'react'
import { saveNewOtherQuotes } from './PortfolioFetchs/PortfolioFetchs'
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ModalNewOtherQuotes({path}) {
    const token = cookies.get('Token')

    const { date } = useContext(Context)
    
    const saveOtherQuote = async () => {
        const btnClose = document.getElementById('new-other-quote-btn-close')
        const btnSave = document.getElementById('new-other-quote-btn-save')
        const msg = document.getElementById('new-other-quote-msg')
        btnClose.disabled = true
        btnSave.disabled = true
        msg.style.display = "unset"

        await saveNewOtherQuotes(path, token)

        msg.innerHTML = 'Las cotizaciones fueron actualizadas con éxito'
        msg.className = 'alert alert-success'

        setTimeout(() => {
            msg.innerHTML = 'Estamos creando el tipo de activo'
            msg.style.display = "none"
            btnClose.disabled = false
            btnSave.disabled = false
        }, 2000)
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
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-other-quote-btn-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveOtherQuote} id="new-other-quote-btn-save">Save quotes</button>
                </div>
                <InfoMessage id={'new-other-quote-msg'} type={'alert alert-info'}>
                    Estamos actualizando las cotizaciones
                </InfoMessage>
            </ModalBody>
        </div>
    )
}

export default ModalNewOtherQuotes