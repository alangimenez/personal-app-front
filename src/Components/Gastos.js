import ModalNewExpense from "./Expenses/ModalNewExpense"
import ExpensesTables from "./Expenses/ExpensesTable"
import ModalNewAccount from "./Expenses/ModalNewAccount"

function Gastos ({path}) {
    return (
        <div>
            <ModalNewExpense path={path} />
            <ModalNewAccount path={path} />
            <ExpensesTables path={path} />
        </div>
    )
}

export default Gastos