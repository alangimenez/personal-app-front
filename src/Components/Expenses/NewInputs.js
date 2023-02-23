import DataContext from "../Context/Context"
import Select from "../Utils/Select"
import LabelInput from "../Utils/LabelInput"
import { useEffect, useState, useContext } from 'react'

function NewInputs({ path }) {
    const { addItems, items } = useContext(DataContext)

    const [accountsOptions, setAccountsOptions] = useState([])
    const getAccountOptions = () => {
        let array = []
        fetch(`${path}/account/expenses`)
            .then((res) => res.json())
            .then((data) => {
                data.map((account) => array.push(account.name))
                console.log('array' + array)
                setAccountsOptions(array)
            })

    }

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
        divMiddle.appendChild(inputAmount)

        const discountAmount = document.createElement('input');
        discountAmount.setAttribute('id', `discount${items}`)
        discountAmount.setAttribute('placeholder', 'Descuento')
        discountAmount.setAttribute(`class`, 'form-control')
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


    useEffect(async () =>  getAccountOptions(), [])

    return (
        <div>
            <div id='newInputsRoot'></div>
            <br></br>
            <button type="button" className="btn btn-dark" onClick={addOtherInput}>+</button>
            <br></br>
            <br></br>
        </div>

    )
}

export default NewInputs