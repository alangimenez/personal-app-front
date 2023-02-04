import InfoMessage from "../Utils/InfoMessage"
import LabelInput from "../Utils/LabelInput"
import LabelTextArea from "../Utils/LabelTextArea"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import SuccessMessage from "../Utils/SuccessMessage"
import ModalBody from "../Utils/ModalBody"
import { useState } from "react"
import { useEffect } from "react"
import NewInputs from "./NewInputs"

function ModalNewExpense({ path }) {

    const saveExpense = () => {
        document.getElementById('button-close').disabled = true
        document.getElementById('button-save').disabled = true
        document.getElementById('msg-processing').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "date": document.getElementById("date").value,
                "debit": document.getElementById("debtAccount").value,
                "debitCurrency": document.getElementById("debtCurrency").value,
                "debitAmount": document.getElementById("debtAmount").value,
                "credit": document.getElementById("creditAccount").value,
                "creditCurrency": document.getElementById("debtCurrency").value,
                "creditAmount": document.getElementById("debtAmount").value,
                "comments": document.getElementById("comments").value
            })
        }

        console.log(requestOptions)

        /* fetch(`${path}/expenses`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById('msg-processing').style.display = "none"
                document.getElementById('msg-successfull').style.display = "unset"
                setTimeout(() => {
                    document.getElementById('msg-successfull').style.display = "none"
                    document.getElementById('button-close').disabled = false
                    document.getElementById('button-save').disabled = false
                    document.getElementById("comments").value = ""
                    document.getElementById("debtAccount").value = ""
                    document.getElementById("debtCurrency").value = ""
                    document.getElementById("date").value = ""
                    document.getElementById("debtAmount").value = ""
                    document.getElementById("creditAccount").value = ""

                }, 2000)
            }) */
    }

    const [accountsOptions, setAccountsOptions] = useState([])
    const getAccountOptions = () => {
        fetch(`${path}/account/expenses`)
            .then((res) => res.json())
            .then((data) => {
                let array = []
                data.map((account) => array.push(account.name))
                setAccountsOptions(array)
            })
    }

    useEffect(() => { getAccountOptions() }, [])

    return (
        <div>
            <ModalButton text={'Ingresar nuevo gasto'} target={'#exampleModal'} />
            <ModalBody
                id={'exampleModal'}
                body={
                    <>
                        <form>
                            <LabelInput text={'Fecha'} id={'date'} type={'date'} />
                            {/*                             <LabelInput text={'Cuenta de gasto'} id={'debtAccount'} type={'string'} />
                            <Select text={'Cuenta de ejemplo'} id={'test'} options={accountsOptions} />
                            <LabelInput text={'Importe'} id={'debtAmount'} type={'number'} />
 */}
                            <LabelInput text={'Modo de pago'} id={'creditAccount'} type={'string'} />
                            <Select text={'Moneda'} id={'debtCurrency'} options={['ARS', 'USD']} />
                            <LabelTextArea text={'Comentarios'} id={'comments'} />
                            <NewInputs accountOptions={accountsOptions} />
                        </form>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="button-close">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveExpense} id="button-save">Save changes</button>
                        </div>

                        <InfoMessage text={'Estamos guardando el gasto'} id={'msg-processing'} />
                        <SuccessMessage text={'El gasto fue guardado con éxito'} id={'msg-successfull'} />

                    </>
                } />
        </div>
    )
}

export default ModalNewExpense