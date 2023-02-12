import { useState, useEffect } from 'react'
import QuotesTable from './Investments/quotesTable'
import ModalNewInvestment from './Investments/modalNewInvestment'
import ModalNewAssetType from './Investments/ModalNewAssetType'

function Inversiones({ path }) {
    // cargar cotizaciones

    const [mensajeInput, setMensajeInput] = useState("")

    const handleChangeInput = (event) => {
        setMensajeInput(event.target.value)
    }
    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'password-security': mensajeInput }
    }

    const guardarCotizaciones = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'password-security': mensajeInput },
            body: JSON.stringify({ quotes: mensaje })
        };

        const requestOptionsTir = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'password-security': mensajeInput },
            body: JSON.stringify({ password: mensajeInput })
        }

        const throwError = () => {
            throw Error("I'm an error");
        };

        try {

            await fetch(`${path}/quotes`, requestOptions)
                .then((res) => res.json())
                .then((data) => {
                    if (data.error_message) {
                        console.log(data.error_message);
                        throwError()
                    } else {
                        console.log(data)
                    }
                })


            await fetch(`${path}/lastvalue`, requestOptions)
                .then((res) => res.json())
                .then((data) => console.log(data))


            await fetch(`${path}/tir/daily`, requestOptionsTir)
                .then((res) => res.json())
                .then((data) => console.log(data))



            await fetch(`${path}/lastvalue/tir`, requestOptionsGet)
                .then((res) => res.json())
                .then((data) => {
                    setCotizacion(data)
                    console.log(data)
                })


        } catch (e) {
            console.log("hoal" + e)
        }
    }

    const [mensaje, setMensaje] = useState(0)

    const handleChangeTextarea = (event) => {
        setMensaje(event.target.value)
    }


    // ver cotizaciones
    const [cotizacion, setCotizacion] = useState([])
    const verCotizaciones = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch(`${path}/lastvalue/tir`, requestOptionsGet)
            .then((res) => res.json())
            .then((data) => {
                setCotizacion(data)
                console.log(data)
            });
    }

    useEffect(() => { }, [cotizacion]);

    return (
        <div className="container">
            <h1>Inversiones</h1>
            <h3>Ingrese las cotizaciones en formato JSON aquí:</h3>
            <textarea rows={10} cols={50} className="form-control" onChange={handleChangeTextarea}></textarea>
            <button onClick={guardarCotizaciones} className="btn btn-dark">Actualizar cotizaciones</button>
            <button onClick={verCotizaciones} className="btn btn-dark">Ver cotizaciones</button>

            <ModalNewAssetType path={path}/>
            <ModalNewInvestment path={path} />
            <QuotesTable cotizacion={cotizacion} />
        </div>
    )
}

export default Inversiones