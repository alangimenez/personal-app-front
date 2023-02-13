import { useEffect, useState } from "react"
import ModalBody from "../Utils/ModalBody"
import ModalButton from "../Utils/ModalButton"
import LabelInput from "../Utils/LabelInput"

function ModalUpdateQuoteManually({path}) {

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
                            <select className="form-control" id='ticket'>
                                {tickets.map(opt => <option>{opt}</option>)}
                            </select>
                        </div>
                        <LabelInput text={'Volumen'} id={'volume'} type={'number'} />
                        <LabelInput text={'Precio'} id={'price'} type={'number'} />
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" /* onClick={saveInvestment} */>Save changes</button>
                </div>

            </ModalBody>
        </>
    )
}

export default ModalUpdateQuoteManually