import { useEffect, useState } from "react"
import { getLastOtherQuotes } from '../../../fetchs/investments/investmentsFetchs'
import Cookies from "universal-cookie";
import("./OtherQuotes.css")
const cookies = new Cookies();

function OtherQuotes({ path }) {
    const token = cookies.get('Token')

    const [info, setInfo] = useState({})

    useEffect(() => {
        getLastOtherQuotesUseEffect()
        if (window.outerWidth < 413) {
            import("./OtherQuotesMobile.css")
        }
    }, [])

    const getLastOtherQuotesUseEffect = async () => {
        const data = await getLastOtherQuotes(token, path)
        console.log(data)
        setInfo(data)
    }

    return (
        <div id="other-quotes-div">
            <span className="other-quotes-span"><strong>Fecha:</strong> {info ? info.date : ""}</span>
            <span className="other-quotes-span"><strong>BNA venta:</strong> {info.quotes ? info.quotes.dolarBnaComprador : ""}</span>
            <span className="other-quotes-span"><strong>BNA compra:</strong> {info.quotes ? info.quotes.dolarBnaVendedor : ""}</span>
            <span className="other-quotes-span"><strong>MEP:</strong> {info.quotes ? info.quotes.dolarMep : ""}</span>
        </div>
    )
}

export default OtherQuotes