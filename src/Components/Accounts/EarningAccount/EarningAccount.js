import LabelInput from "../../Utils/LabelInput"
import Select from "../../Utils/Select"
import InfoMessage from "../../Utils/InfoMessage"
import AccountsMain from "../AccountsMain";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function NewEarningAccount({ path }) {
    const token = cookies.get('Token')

    const saveEarningAccount = async () => {
        const name = document.getElementById('new-earning-account-name')
        const currency = document.getElementById('new-earning-account')
        const btnClose = document.getElementById('new-earning-account-close')
        const btnCreate = document.getElementById('new-earning-account-create')
        const msg = document.getElementById('new-earning-account-message')

        btnClose.disabled = true
        btnCreate.disabled = true
        msg.style.display = "unset"

        const requestOptionsAccount = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({
                "name": name.value,
                "type": "R+",
                "assetType": "",
                "ticket": "",
                "balance": 0,
                "currency": currency.value
            })
        }

        const res = await fetch(`${path}/account`, requestOptionsAccount)
        /* const data = await res.json() */
        msg.className = "alert alert-success"
        msg.innerHTML = "La cuenta fue creada con éxito"

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
            <h1>Nueva cuenta de ingreso</h1>
            <form>
                <LabelInput text={'Nombre de cuenta'} id={'new-earning-account-name'} type={'string'} />
                <Select text={'Moneda'} id={'new-earning-account'} options={['ARS', 'USD']} />
            </form>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" id="new-earning-account-close">Cerrar</button>
                <button type="button" className="btn btn-primary" onClick={saveEarningAccount} id="new-earning-account-create">Crear cuenta</button>
            </div>
            <InfoMessage id={'new-earning-account-message'} type='alert alert-info'>
                Estamos creando la cuenta
            </InfoMessage>
        </div>
    )
}

export default NewEarningAccount