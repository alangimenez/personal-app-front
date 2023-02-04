import Select from "../Utils/Select"
import LabelInput from "../Utils/LabelInput"
import { useEffect, useState } from 'react'

function NewInputs({ accountOptions }) {
    const [items, setItems] = useState(0)

    const addOtherInput = () => {
        const div = document.createElement('div')
        div.setAttribute('class', 'row')
        const divLeft = document.createElement('div')
        divLeft.setAttribute('class', 'col')
        const divRight = document.createElement('div')
        divRight.setAttribute('class', 'col')

        const selectAccount = document.createElement('select');
        selectAccount.setAttribute('class', 'form-control')
        selectAccount.setAttribute('id', `account${items}`)
        accountOptions.map(account => {
            const option = document.createElement('option');
            option.innerHTML = account
            selectAccount.appendChild(option)
        })
        divLeft.appendChild(selectAccount)

        const inputAccount = document.createElement('input');
        inputAccount.setAttribute('id', `account${items}`)
        inputAccount.setAttribute('placeholder', 'Cuenta')

        const inputImport = document.createElement('input');
        inputImport.setAttribute('id', `import${items}`)
        inputImport.setAttribute('placeholder', 'Importe')
        inputImport.setAttribute(`class`, 'form-control')
        divRight.appendChild(inputImport)

        const br = document.createElement('br')

        div.appendChild(br)
        div.appendChild(divLeft);
        div.appendChild(divRight);

        const root = document.getElementById('newInputsRoot');
        root.appendChild(br)
        root.appendChild(div);
        setItems(items + 1)
    }

    useEffect(() => { addOtherInput() }, [])

    return (
        <div>
            <div id='newInputsRoot'></div>
            <button type="button" className="btn btn-dark" onClick={addOtherInput}>+</button>
        </div>

    )
}

export default NewInputs