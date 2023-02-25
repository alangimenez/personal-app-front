import ModalNewCreditCard from "./ModalNewCreditCard"
import ModalNewCreditCardExpense from "./ModalNewCreditCardExpense"

function CreditCard({ path }) {

    return (
        <div>
            <ModalNewCreditCard path={path} />
            <ModalNewCreditCardExpense path={path} />
        </div>
    )
}

export default CreditCard