import ModalNewExpense from "./Expenses/ModalNewExpense"
import ExpensesTables from "./Expenses/ExpensesTable"
import ModalNewExpenseBatch from "./Expenses/ModalNewExpenseBatch"

function Gastos ({path}) {
    return (
        <div>
            <ModalNewExpense path={path} />
            <ModalNewExpenseBatch />
            <ExpensesTables path={path} />
        </div>
    )
}

export default Gastos