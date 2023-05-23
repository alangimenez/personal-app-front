import React, { useState } from 'react'
import { getListOfExpenseAccounts } from '../../fetchs/accounts/accountsFetchs'

const Context = React.createContext()

export const DataContextProvider = ({ children }) => {

    const path = process.env.REACT_APP_BASEPATH

    const [items, setItems] = useState(0)
    const addItems = () => {
        setItems(items + 1)
    }

    const resetItems = () => {
        setItems(0)
    }

    const [itemsInvestment, setItemsInvestment] = useState(0)
    const addItemsInvestment = () => {
        setItemsInvestment(itemsInvestment + 1)
    }

    const resetItemsInvestment = () => {
        setItemsInvestment(0)
    }

    const [date, setDate] = useState("")
    const newDate = (date) => {
        setDate(date)
    }

    const [accountsOptions, setAccountsOptions] = useState([])

    const getAccountOptions = async (token) => {
        const listOfExpenseAccounts = await getListOfExpenseAccounts(token, path)
        setAccountsOptions(listOfExpenseAccounts)
    }

    const [subtotalOfExpense, setSubtotalOfExpense] = useState(0)

    return (
        <Context.Provider value={{
            addItems,
            items,
            resetItems,
            date,
            newDate,
            getAccountOptions,
            accountsOptions,
            itemsInvestment,
            addItemsInvestment,
            resetItemsInvestment,
            subtotalOfExpense, 
            setSubtotalOfExpense
        }}>
            {children}
        </Context.Provider>
    )
}

export default Context
