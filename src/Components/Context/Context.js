import React, { useState } from 'react'

const Context = React.createContext()

export const DataContextProvider = ({children}) => {

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

    return (
        <Context.Provider value={{addItems, items, resetItems, date, newDate}}>
            {children}
        </Context.Provider>
    )
}

export default Context
