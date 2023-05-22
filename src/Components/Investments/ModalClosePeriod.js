import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import LabelInput from "../Utils/LabelInput"
import InfoMessage from "../Utils/InfoMessage"
import { closeMercadoPagoPeriod } from "../../fetchs/mercadoPago/mercadoPagoFetchs"
import { closeMonthRegister } from "../../fetchs/monthRegister/monthRegisterFetchs"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ModalClosePeriod({ path }) {
    const token = cookies.get('Token')

    const closePeriod = async () => {
        const total = document.getElementById('modal-close-amount')
        const msgInfo = document.getElementById('modal-close-period-msg')
        const btnClose = document.getElementById('modal-close-period-close')
        const btnSave = document.getElementById('modal-close-period-save')
        btnClose.disabled = true
        btnSave.disabled = true
        msgInfo.style.display = "unset"

        await closeMercadoPagoPeriod(total.value, token, path)
        await closeMonthRegister(token, path)

        msgInfo.innerHTML = 'El periodo fue cerrado con éxito'
        msgInfo.className = 'alert alert-success'

        setTimeout(() => {
            msgInfo.innerHTML = 'Estamos cerrando el periodo'
            msgInfo.className = 'alert alert-info'
            msgInfo.style.display = "none"
            btnClose.disabled = false
            btnSave.disabled = false
            total.value = ""
        }, 2000)

    }

    return (
        <>
            <ModalButton target={'#modal-modal-close-period'}>
                Cerrar periodo
            </ModalButton>
            <ModalBody id={'modal-modal-close-period'}>
                <form>
                    <LabelInput text={'Monto del beneficio de Mercado Pago'} id={'modal-close-amount'} type={'number'} />
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="modal-close-period-close">Cerrar</button>
                    <button type="button" className="btn btn-primary" id="modal-close-period-save" onClick={closePeriod}>Cerrar periodo</button>
                </div>
                <InfoMessage id={'modal-close-period-msg'} type={'alert alert-info'}>
                    Estamos cerrando el periodo
                </InfoMessage>
            </ModalBody>
        </>
    )
}

export default ModalClosePeriod