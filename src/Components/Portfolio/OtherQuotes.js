import { useContext, useEffect, useState } from "react"
import Context from "../Context/Context"
import ModalNewOtherQuotes from "./ModalNewOtherQuotes"
import Cookies from "universal-cookie";
const cookies = new Cookies();

function OtherQuotes({ path }) {
    const token = cookies.get('Token')

    const [lastQuotes, setLastQuote] = useState({})
    const [quotes, setQuotes] = useState({})
    const { newDate } = useContext(Context)

    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }
    const getLastQuote = () => {
        fetch(`${path}/otherquotes`, requestOptionsGet)
            .then(res => res.json())
            .then(data => {
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