import { useEffect, useState } from "react"
import ModalBody from "../../Utils/ModalBody"
import ModalButton from "../../Utils/ModalButton"
import LabelInput from "../../Utils/LabelInput"
import InfoMessage from "../../Utils/InfoMessage"
import Select from "../../Utils/Select"

function TableOfRefunds({ path }) {

    const [refunds, setRefunds] = useState([])

    const getAllRefunds = () => {
        fetch(`${path}/refund`)
            .then(res => res.json())
            .then(data => setRefunds(data))
    }

    const [accounts, setAccounts] = useState([])
    const getAccounts = () => {
        fetch(`${path}/account/liquid`)
            .then((res) => res.json())
            .then((data) => {
                setAccounts(data)
            })
    }

    useEffect(() => { getAllRefunds(); getAccounts() }, [])

    const [id, setId] = useState("")
    const handlerId = (event) => {
        setId(event.target.id)
    }

    const saveRefund = () => {
        
    }

    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <td><strong>Fecha</strong></td>
                        <td><strong>Monto</strong></td>
                        <td><strong>Estado</strong></td>
                    </tr>
                </thead>
                <tbody>
                    {
                        refunds.map(e => <tr>
                            <td>{e.date}</td>
                            <td>{e.total}</td>
                            <td>{e.status}</td>
                            <td>
                                <button type="button" className="btn btn-primary" data-toggle="modal" data-target='#table-of-refunds' id={e._id} onClick={handlerId}>
                                    Devolución
                                </button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

            <ModalBody id="table-of-refunds">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Devolución del gasto</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                    <form>
                        <LabelInput text={'Fecha de devolución'} id={'table-of-refunds-date'} type={'date'} />
                        <Select text={'Cuenta de devolución'} id={'table-of-refunds-account'} options={accounts} />
                        <LabelInput text={'Monto de devolución'} id={'table-of-refunds-amount'} type={'number'} />
                    </form>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-other-quote-btn-close">Close</button>
                    <button type="button" className="btn btn-primary" /* onClick={saveOtherQuote} */ id="new-other-quote-btn-save">Save changes</button>
                </div>

                <InfoMessage id={'new-other-quote-msg'} type={'alert alert-info'}>
                    Estamos cargando la devolución
                </InfoMessage>
            </ModalBody>
        </>
    )
}

export default TableOfRefunds