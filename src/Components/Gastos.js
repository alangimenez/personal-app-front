import ModalNewExpense from "./Expenses/ModalNewExpense"
import ExpensesTables from "./Expenses/ExpensesTable"

function Gastos ({path}) {
    return (
        <div>
            <ModalNewExpense path={path} />
            <ExpensesTables path={path} />
        </div>
    )
}

export default Gastos