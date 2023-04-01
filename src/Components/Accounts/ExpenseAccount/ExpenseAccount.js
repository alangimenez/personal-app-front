import LabelInput from "../../Utils/LabelInput"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"
import AccountsMain from "../AccountsMain";
import Cookies from "universal-cookie";
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

        const requestOptionsAccount = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "name": name.value,
                "type": "R-",
                "assetType": "",
                "ticket": "",
                "balance": 0,
                "currency": currency.value
            })
        }

        const res = await fetch(`${path}/account`, requestOptionsAccount)
        const data = await res.json()
        msg.innerHTML = "La cuenta fue creada con éxito"

        setTimeout(() => {
            btnClose.disabled = false
            btnCreate.disabled = false
            msg.style.display = "none"
            msg.innerHTML = "Estamos creando la cuenta"

            name.value = ""
            currency.value = ""
        }, 2000)
    }

    return (
        <div>
            <AccountsMain />
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