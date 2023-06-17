import ModalNewExpense from "./Components/ModalNewExpense"
import ExpensesTables from "./Components/ExpensesTable"

function Gastos ({path}) {
    return (
        <div>
            <ModalNewExpense path={path} />
            <ExpensesTables path={path} />
        </div>
    )
}

export default Gastos