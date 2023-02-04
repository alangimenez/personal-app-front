import DataContext from "../Context/Context"
import InfoMessage from "../Utils/InfoMessage"
import LabelInput from "../Utils/LabelInput"
import LabelTextArea from "../Utils/LabelTextArea"
import ModalButton from "../Utils/ModalButton"
import Select from "../Utils/Select"
import SuccessMessage from "../Utils/SuccessMessage"
import ModalBody from "../Utils/ModalBody"
import { useState, useEffect, useContext } from "react"
import NewInputs from "./NewInputs"

function ModalNewExpense({ path }) {

    const { items } = useContext(DataContext)

    const saveExpense = () => {
        document.getElementById('button-close').disabled = true
        document.getElementById('button-save').disabled = true
        document.getElementById('msg-processing').style.display = "unset"

        
        const accountsAmounts = []
        for (let i = 0; i < items; i++) {
            const eachExpense = {
                "debtAccount": document.getElementById(`account${i}`).value,
                "debtAmount": document.getElementById(`amount${i}`).value
            }
            accountsAmounts.push(eachExpense)
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "date": document.getElementById("date").value,
                "expenses": accountsAmounts,
                "credit": document.getElementById("creditAccount").value,
                "currency": document.getElementById("debtCurrency").value,
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
                            <NewInputs path={path} />
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