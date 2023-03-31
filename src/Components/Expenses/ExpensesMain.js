import ModalNewExpense from "./Components/ModalNewExpense"
import ExpensesTables from "./Components/ExpensesTable"
import ModalNewAccount from "./Components/ModalNewAccount"
import ExpensesTableForExcel from "./Components/ExpensesTableForExcel/ExpensesTableForExcel"

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