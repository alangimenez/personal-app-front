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

    return (
        <Context.Provider value={{addItems, items, resetItems}}>
            {children}
        </Context.Provider>
    )
}

export default Context
