import DataContext from "../../Context/Context"
import { useContext } from 'react'

function NewPeriodOfPayments() {
    const { itemsInvestment, addItemsInvestment } = useContext(DataContext)

    const addOtherInput = () => {
        const div = document.createElement('div')
        div.setAttribute('class', 'row')
        const divPayment = document.createElement('div')
        divPayment.setAttribute('class', 'col')
        const divDate = document.createElement('div')
        divDate.setAttribute('class', 'col')
        const divMiddle = document.createElement('div')
        divMiddle.setAttribute('class', 'col')
        const divRight = document.createElement('div')
        divRight.setAttribute('class', 'col')

        const payment = document.createElement('p')
        payment.innerHTML = `Pago ${itemsInvestment + 1}`
        divPayment.appendChild(payment)

        const inputAmount = document.createElement('input');
        inputAmount.setAttribute('id', `amortization${itemsInvestment}`)
        inputAmount.setAttribute('placeholder', 'Amortización')
        inputAmount.setAttribute(`class`, 'form-control')
        inputAmount.setAttribute('type', 'number')
        divMiddle.appendChild(inputAmount)

        const discountAmount = document.createElement('input');
        discountAmount.setAttribute('id', `interest${itemsInvestment}`)
        discountAmount.setAttribute('placeholder', 'Intereses')
        discountAmount.setAttribute(`class`, 'form-control')
        discountAmount.setAttribute('type', 'number')
        divRight.appendChild(discountAmount)

        const dateOfPayment = document.createElement('input');
        dateOfPayment.setAttribute('id', `date${itemsInvestment}`)
        dateOfPayment.setAttribute(`class`, 'form-control')
        dateOfPayment.setAttribute('type', 'date')
        divDate.appendChild(dateOfPayment)

        const br = document.createElement('br')

        div.appendChild(br)
        div.appendChild(divPayment)
        div.appendChild(divDate);
        div.appendChild(divMiddle);
        div.appendChild(divRight)

        const root = document.getElementById('new-period-of-payment');
        root.appendChild(br)
        root.appendChild(div);
        addItemsInvestment()
    }

    return (
        <div>
            <div id='new-period-of-payment'></div>
            <br></br>
            <button type="button" className="btn btn-dark" onClick={addOtherInput}>Nuevo item</button>
            <br></br>
            <br></br>
        </div>
    )
}

export default NewPeriodOfPayments