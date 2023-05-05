import LabelInput from "../../Utils/LabelInput"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"
import AccountsMain from "../AccountsMain";
import Cookies from "universal-cookie";
import { createAccount } from "../AccountsFetchs/AccountFetchs"
const cookies = new Cookies();

function NewExpenseAccount({ path }) {
    const token = cookies.get('Token')


    const saveExpenseAccount = async () => {
        const name = document.getElementById('new-expense-account-name')
        const currency = document.getElementById('new-expense-account')
        const btnClose = document.getElementById('new-expense-account-close')
        const btnCreate = document.getElementById('new-expense-account-create')
        const msg = document.getElementById('new-expense-account-message')

        btnClose.disabled = true
        btnCreate.disabled = true
        msg.style.display = "unset"

        const dataFetchNewAccount = await createAccount(name.value, "", "R-", "", currency.value, token, path)

        if (dataFetchNewAccount.error) {
            msg.className = "alert alert-danger"
        } else {
            msg.className = "alert alert-success"
        }
        msg.innerHTML = dataFetchNewAccount.message

        setTimeout(() => {
            btnClose.disabled = false
            btnCreate.disabled = false
            msg.style.display = "none"
            msg.className = "alert alert-info"
            msg.innerHTML = "Estamos creando la cuenta"

            name.value = ""
            currency.value = ""
        }, 2000)
    }

    return (
        <div>
            <AccountsMain />
            <h1>Nueva cuenta de gasto</h1>
            <form>
                <LabelInput text={'Nombre de cuenta'} id={'new-expense-account-name'} type={'string'} />
                <Select text={'Moneda'} id={'new-expense-account'} options={['ARS', 'USD']} />
            </form>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-expense-account-close">Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={saveExpenseAccount} id="new-expense-account-create">Crear cuenta</button>
            </div>
            <InfoMessage id={'new-expense-account-message'} type='alert alert-info'>
                Estamos creando la cuenta
            </InfoMessage>
        </div>
    )
}

export default NewExpenseAccount