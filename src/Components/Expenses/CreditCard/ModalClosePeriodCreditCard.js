import ModalBody from "../../Utils/ModalBody"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"

function ModalClosePeriodCreditCard() {
    return (
        <>
            <ModalButton target={'#close-period-credit-card'}>
                Cerrar periodo de tarjeta de crédito
            </ModalButton>
            <ModalBody id={'close-period-credit-card'}>
                <form>
                    <Select text={'Tarjeta'} id={'close-period-credit-card-name'} options={[]} />
                    <Select text={'Periodo a cerrar'} id={'close-period-credit-card-period'} options={[]} />
                </form>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="close-period-credit-card-close">Close</button>
                    <button type="button" className="btn btn-primary" onClick={''} id="close-period-credit-card-save">Save changes</button>
                </div>

                <InfoMessage id={'new-credit-card-msg'} type='alert alert-info'>
                    Estamos cerrando el periodo de la tarjeta
                </InfoMessage>

            </ModalBody>
        </>
    )
}

export default ModalClosePeriodCreditCard