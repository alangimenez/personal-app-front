import ModalClosePeriodCreditCard from "./ModalClosePeriodCreditCard"
import ModalNewCreditCard from "./ModalNewCreditCard"
import ModalNewCreditCardExpense from "./ModalNewCreditCardExpense"
import ModalNewPeriodOfCreditCard from "./ModalNewPeriodOfCreditCard"
import ModalPayCreditCard from "./ModalPayCreditCard"
import TableCreditCardExpenses from "./TableCreditCardExpenses"

function CreditCard({ path }) {

    return (
        <div>
            <ModalNewCreditCard path={path} />
            <ModalNewCreditCardExpense path={path} />
            <ModalClosePeriodCreditCard path={path} />
            <ModalPayCreditCard path={path} />
            <ModalNewPeriodOfCreditCard path={path} />
            <TableCreditCardExpenses path={path} />
        </div>
    )
}

export default CreditCard