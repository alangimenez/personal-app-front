import DataContext from "../../Context/Context"
import InfoMessage from "../../Utils/InfoMessage"
import LabelInput from "../../Utils/LabelInput"
import LabelTextArea from "../../Utils/LabelTextArea"
import ModalButton from "../../Utils/ModalButton"
import Select from "../../Utils/Select"
import ModalBody from "../../Utils/ModalBody"
import { useState, useEffect, useContext } from "react"
import NewInputs from "./NewInputs"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function ModalNewExpense({ path }) {
    const token = cookies.get('Token')

    const { items, resetItems, getAccountOptions, accountsOptions } = useContext(DataContext)

    const saveExpense = () => {
        let mp = document.getElementById('modal-new-expense-mp').checked
        let refund = document.getElementById('modal-new-expense-refund').checked

        document.getElementById('button-close').disabled = true
        document.getElementById('button-save').disabled = true
        if (mp) {
            document.getElementById('msg-processing').innerHTML = "Estamos registrando el beneficio"
        }
        document.getElementById('msg-processing').style.display = "unset"


        const accountsAmounts = []
        for (let i = 0; i < items; i++) {
            const eachExpense = {
                "debtAccount": document.getElementById(`account${i}`).value,
                "debtAmount": document.getElementById(`amount${i}`).value,
                "discountAmount": document.getElementById(`discount${i}`).value
            }
            accountsAmounts.push(eachExpense)
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "date": document.getElementById("date").value,
                "expenses": accountsAmounts,
                "credit": document.getElementById("creditAccount").value,
                "currency": document.getElementById("debtCurrency").value,
                "comments": document.getElementById("comments").value,
                "benefitMP": mp,
                "type": ["expense", "daily"]
            })
        }

        if (mp) {
            fetch(`${path}/mercadopago/batch`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    document.getElementById('msg-processing').innerHTML = "Estamos guardando el gasto"
                    if (refund) {
                        document.getElementById('new-expense-credit-card-msg').innerHTML = "Estamos registrandolo para devolución"
                    }
                })
        }

        if (refund) {
            fetch(`${path}/refund/expense`, requestOptions)
                .then(res => res.json())
                .then(data => {
                    document.getElementById('msg-processing').innerHTML = "Estamos guardando el gasto"
                })
        }

        fetch(`${path}/registers/batch`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById('msg-processing').className = 'alert alert-success'
                document.getElementById('msg-processing').innerHTML = "El gasto fue guardado con éxito"
                setTimeout(() => {
                    document.getElementById('msg-processing').innerHTML = "Estamos guardando el gasto"
                    document.getElementById('msg-processing').className = 'alert alert-info'
                    document.getElementById('msg-processing').style.display = "none"

                    document.getElementById('button-close').disabled = false
                    document.getElementById('button-save').disabled = false
                    document.getElementById("comments").value = ""
                    document.getElementById("debtCurrency").value = ""
                    document.getElementById("date").value = ""
                    document.getElementById("creditAccount").value = ""
                    mp = false
                    const parent = document.getElementById('newInputsRoot')
                    while (parent.firstChild) {
                        parent.firstChild.remove()
                    }
                    resetItems()
                }, 2000)
            })
    }

    const [accounts, setAccounts] = useState([])
    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }
    const getAccounts = () => {
        fetch(`${path}/account/liquid`, requestOptionsGet)
            .then((res) => res.json())
            .then((data) => {
                setAccounts(data)
            })
    }

    useEffect(() => { 
        getAccounts(); 
        if(accountsOptions.length == 0) {
            getAccountOptions(token)
        }
    }, [])

    return (
        <div>
            <ModalButton target={'#exampleModal'}>
                Ingresar nuevo gasto
            </ModalButton>
            <ModalBody id={'exampleModal'}>
                <>
                    <form>
                        <LabelInput text={'Fecha'} id={'date'} type={'date'} />
                        <Select text={'Modo de pago'} id={'creditAccount'} options={accounts} />
                        {/* <LabelInput text={'Modo de pago'} id={'creditAccount'} type={'string'} /> */}
                        <Select text={'Moneda'} id={'debtCurrency'} options={['ARS', 'USD']} />

                        <LabelTextArea text={'Comentarios'} id={'comments'} />
                        <NewInputs />

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="modal-new-expense-mp"></input>
                            <label className="form-check-label" htmlFor="modal-new-expense-mp">
                                Beneficio Mercado Pago 30%
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="modal-new-expense-refund"></input>
                            <label className="form-check-label" htmlFor="modal-new-expense-refund">
                                Gasto a cuenta
                            </label>
                        </div>


                    </form>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" id="button-close">Close</button>
                        <button type="button" className="btn btn-primary" onClick={saveExpense} id="button-save">Save changes</button>
                    </div>

                    <InfoMessage id={'msg-processing'} type='alert alert-info'>
                        Estamos guardando el gasto
                    </InfoMessage>
                </>
            </ModalBody>
        </div>
    )
}

export default ModalNewExpense