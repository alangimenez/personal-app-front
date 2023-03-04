import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import LabelInput from "../Utils/LabelInput"
import InfoMessage from "../Utils/InfoMessage"

function ModalClosePeriod({ path }) {

    const closePeriod = () => {
        document.getElementById('modal-close-period-close').disabled = true
        document.getElementById('modal-close-period-save').disabled = true
        document.getElementById('modal-close-period-msg').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "total": document.getElementById('modal-close-amount').value
            })
        };

        fetch(`${path}/period`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('modal-close-period-msg').innerHTML = 'El periodo fue cerrado con éxito'
                document.getElementById('modal-close-period-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('modal-close-period-msg').innerHTML = 'Estamos cerrando el periodo'
                    document.getElementById('modal-close-period-msg').style.display = "none"
                    document.getElementById('modal-close-period-close').disabled = false
                    document.getElementById('modal-close-period-save').disabled = false
                    document.getElementById('modal-close-amount').value = ""
                }, 2000)
            })
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