import { useEffect, useState } from "react"
import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import LabelInput from "../Utils/LabelInput"
import InfoMessage from "../Utils/InfoMessage"

function ModalUpdateQuoteManually({ path }) {

    const [tickets, setTickets] = useState([])

    const getTickets = () => {
        fetch(`${path}/account`)
            .then(res => res.json())
            .then(data => {
                const array = []
                data.map(t => {
                    if (t.type != "R-" && t.assetType != "Liquidez" && t.assetType != undefined) {
                        array.push(t.ticket)
                    }
                })
                setTickets(array)
            })
    }

    useEffect(() => { getTickets() }, [])

    const saveManualQuote = () => {
        document.getElementById('quote-manual-btn-close').disabled = true
        document.getElementById('quote-manual-btn-save').disabled = true
        document.getElementById('quote-manual-msg').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "ticket": document.getElementById('quote-manual-ticket').value,
                "price": document.getElementById('quote-manual-price').value,
                "volume": document.getElementById('quote-manual-volume').value
            })
        };

        fetch(`${path}/lastvalue/manualquote`, requestOptions)
            .then(res => res.json())
            .then(data => {
                document.getElementById('quote-manual-msg').innerHTML = 'La cotización fue actualizada con éxito'
                document.getElementById('quote-manual-msg').className = 'alert alert-success'

                setTimeout(() => {
                    document.getElementById('quote-manual-msg').innerHTML = 'La cotización se está actualizando.'
                    document.getElementById('quote-manual-msg').style.display = "none"
                    document.getElementById('quote-manual-btn-close').disabled = false
                    document.getElementById('quote-manual-btn-save').disabled = false
                    document.getElementById('quote-manual-ticket').value = ""
                    document.getElementById('quote-manual-price').value = ""
                    document.getElementById('quote-manual-volume').value = ""
                }, 2000)
            })

    }

    return (
        <>
            <ModalButton target={'#modal-quote-manually'}>
                Actualizar cotización manualmente
            </ModalButton>
            <ModalBody id={'modal-quote-manually'}>
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label htmlFor='ticket'>Ticket</label>
                            <select className="form-control" id='quote-manual-ticket'>
                                {tickets.map((opt, index) => <option key={index}>{opt}</option>)}
                            </select>
                        </div>
                        <LabelInput text={'Volumen'} id={'quote-manual-volume'} type={'number'} />
                        <LabelInput text={'Precio'} id={'quote-manual-price'} type={'number'} />
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id='quote-manual-btn-close'>Close</button>
                    <button type="button" className="btn btn-primary" onClick={saveManualQuote} id='quote-manual-btn-save'>Save changes</button>
                </div>
                <InfoMessage id={'quote-manual-msg'} type={'alert alert-info'}>
                    La cotización se está actualizando.
                </InfoMessage>
            </ModalBody>
        </>
    )
}

export default ModalUpdateQuoteManually