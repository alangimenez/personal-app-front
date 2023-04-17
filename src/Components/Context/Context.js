import React, { useState } from 'react'

const Context = React.createContext()

export const DataContextProvider = ({children}) => {

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

    const getAccountOptions = token => {
        let array = []
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        };
        fetch(`${path}/account/expenses`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                data.map((account) => array.push(account.name))
                setAccountsOptions(array)
            })
    }

    return (
        <Context.Provider value={{addItems, items, resetItems, date, newDate, getAccountOptions, accountsOptions, itemsInvestment, addItemsInvestment, resetItemsInvestment}}>
            {children}
        </Context.Provider> 
    )
}

export default Context
