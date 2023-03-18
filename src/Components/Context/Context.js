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

    const [date, setDate] = useState("")
    const newDate = (date) => {
        setDate(date)
    }

    const [accountsOptions, setAccountsOptions] = useState([])

    const getAccountOptions = () => {
        let array = []
        fetch(`${path}/account/expenses`)
            .then((res) => res.json())
            .then((data) => {
                data.map((account) => array.push(account.name))
                console.log('array' + array)
                setAccountsOptions(array)
            })
    }

    return (
        <Context.Provider value={{addItems, items, resetItems, date, newDate, getAccountOptions, accountsOptions}}>
            {children}
        </Context.Provider> 
    )
}

export default Context
