import DataContext from "../../Context/Context"
import { useState, useContext } from 'react'

function NewInputs() {
    const { addItems, items, accountsOptions } = useContext(DataContext)

    const addOtherInput = () => {
        const div = document.createElement('div')
        div.setAttribute('class', 'row')
        const divLeft = document.createElement('div')
        divLeft.setAttribute('class', 'col')
        const divMiddle = document.createElement('div')
        divMiddle.setAttribute('class', 'col')
        const divRight = document.createElement('div')
        divRight.setAttribute('class', 'col')

        const selectAccount = document.createElement('select');
        selectAccount.setAttribute('class', 'form-control')
        selectAccount.setAttribute('id', `account${items}`)
        accountsOptions.map(account => {
            const option = document.createElement('option');
            option.innerHTML = account
            selectAccount.appendChild(option)
        })
        divLeft.appendChild(selectAccount)

        const inputAmount = document.createElement('input');
        inputAmount.setAttribute('id', `amount${items}`)
        inputAmount.setAttribute('placeholder', 'Importe')
        inputAmount.setAttribute(`class`, 'form-control')
        inputAmount.setAttribute('type', 'number')
        divMiddle.appendChild(inputAmount)

        const discountAmount = document.createElement('input');
        discountAmount.setAttribute('id', `discount${items}`)
        discountAmount.setAttribute('placeholder', 'Descuento')
        discountAmount.setAttribute(`class`, 'form-control')
        discountAmount.setAttribute('type', 'number')
        divRight.appendChild(discountAmount)

        const br = document.createElement('br')

        div.appendChild(br)
        div.appendChild(divLeft);
        div.appendChild(divMiddle);
        div.appendChild(divRight)

        const root = document.getElementById('newInputsRoot');
        root.appendChild(br)
        root.appendChild(div);
        addItems()
    }

    const [subtotal, setSubtotal] = useState(0)
    const sumTotal = () => {
        let total = 0
        for (let i = 0; i < items; i++) {
            const amount = document.getElementById(`amount${i}`).value
            const discount = document.getElementById(`discount${i}`).value
            total = total + Number(amount) - Number(discount)
        }
        setSubtotal(total)
    }

    return (
        <div>
            <div id='newInputsRoot'></div>
            <br></br>
            <button type="button" className="btn btn-dark" onClick={addOtherInput}>Nuevo item</button>
            <button type="button" className="btn btn-dark" onClick={sumTotal}>Calcular total</button>
            <br></br>
            <br></br>
            <div className='alert alert-dark' role="alert" id='something' style={{ textAlign: "end" }}>
                <strong>Subtotal: {subtotal.toFixed(2)}</strong>
            </div>
        </div>
    )
}

export default NewInputs