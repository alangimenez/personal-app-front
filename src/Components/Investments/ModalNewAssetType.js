import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import LabelInput from "../Utils/LabelInput"
import InfoMessage from "../Utils/InfoMessage"

function ModalNewAssetType({path}) {

    const saveAssetType = () => {
        document.getElementById('new-asset-type-close').disabled = true
        document.getElementById('new-asset-type-save').disabled = true
        document.getElementById('new-asset-type-msg').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "assetType": document.getElementById('new-asset-type').value
            })
        };

        fetch(`${path}/assettype`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('new-asset-type-msg').innerHTML = 'El tipo de activo fue creado con éxito'
                document.getElementById('new-asset-type-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('new-asset-type-msg').innerHTML = 'Estamos creando el tipo de activo'
                    document.getElementById('new-asset-type-msg').style.display = "none"
                    document.getElementById('new-asset-type-close').disabled = false
                    document.getElementById('new-asset-type-save').disabled = false
                    document.getElementById('new-asset-type').value = ""
                }, 2000)
            })
    }

    return (
        <>
            <ModalButton target={'#modal-new-asset-type'}>
                Crear nuevo tipo de activo
            </ModalButton>
            <ModalBody id={'modal-new-asset-type'}>
                <form>
                    <LabelInput text={'Nombre del tipo de activo'} id={'new-asset-type'} type={'string'} />
                </form>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-asset-type-close">Cerrar</button>
                    <button type="button" className="btn btn-primary" id="new-asset-type-save" onClick={saveAssetType}>Crear tipo de activo</button>
                </div>
                <InfoMessage id={'new-asset-type-msg'} type={'alert alert-info'}>
                    Estamos creando el tipo de activo
                </InfoMessage>
            </ModalBody>
        </>
    )
}

export default ModalNewAssetType