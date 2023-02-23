import { useContext, useEffect, useState } from "react"
import Context from "../Context/Context"
import ModalNewOtherQuotes from "./ModalNewOtherQuotes"

function OtherQuotes({ path }) {

    const [lastQuotes, setLastQuote] = useState({})
    const [quotes, setQuotes] = useState({})
    const { newDate } = useContext(Context)

    const getLastQuote = () => {
        fetch(`${path}/otherquotes`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setLastQuote(data)
                setQuotes(data.quotes)
                newDate(data.proxDate)
            })
    }

    useEffect(() => { getLastQuote() }, [])

    return (
        <div>
            <ModalNewOtherQuotes path={path} />
            <p>Fecha: {lastQuotes.date}</p>
            <p>BNA venta: {quotes.dolarbnavendedor}</p>
            <p>BNA compra: {quotes.dolarbnacomprador}</p>
            <p>MEP: {quotes.dolarmep}</p>
        </div>
    )
}

export default OtherQuotes