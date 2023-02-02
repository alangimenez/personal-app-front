function ModalNewExpense({ path }) {

    const saveExpense = () => {
        document.getElementById('button-close').disabled = true
        document.getElementById('button-save').disabled = true
        document.getElementById('msg-processing').style.display = "unset"

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "date": document.getElementById("date").value,
                "debit": document.getElementById("debtAccount").value,
                "debitCurrency": document.getElementById("debtCurrency").value,
                "debitAmount": document.getElementById("debtAmount").value,
                "credit": document.getElementById("creditAccount").value,
                "creditCurrency": document.getElementById("debtCurrency").value,
                "creditAmount": document.getElementById("debtAmount").value,
                "comments": document.getElementById("comments").value
            })
        }

        fetch(`${path}/expenses`, requestOptions)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                document.getElementById('msg-processing').style.display = "none"
                document.getElementById('msg-successfull').style.display = "unset"
                setTimeout(() => {
                    document.getElementById('msg-successfull').style.display = "none"
                    document.getElementById('button-close').disabled = false
                    document.getElementById('button-save').disabled = false
                    document.getElementById("comments").value = ""
                    document.getElementById("debtAccount").value = ""
                    document.getElementById("debtCurrency").value = ""
                    document.getElementById("date").value = ""
                    document.getElementById("debtAmount").value = ""
                    document.getElementById("creditAccount").value = ""

                }, 2000)
            })
    }

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Ingresar nuevo gasto
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content container">

                        <form>
                            <div className="form-group">
                                <label htmlFor="date">Fecha</label>
                                <input type="date" className="form-control" id="date"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="debtAccount">Cuenta de gasto</label>
                                <input type="string" className="form-control" id="debtAccount"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="debtAmount">Importe</label>
                                <input type="number" className="form-control" id="debtAmount"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="debtCurrency">Moneda</label>
                                <select className="form-control" id="debtCurrency">
                                    <option>ARS</option>
                                    <option>USD</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="creditAccount">Modo de pago</label>
                                <input type="string" className="form-control" id="creditAccount"></input>
                            </div>
                            <div className="form-group">
                                <label htmlFor="comments">Example textarea</label>
                                <textarea className="form-control" id="comments" rows="3"></textarea>
                            </div>
                        </form>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" id="button-close">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveExpense} id="button-save">Save changes</button>
                        </div>

                        <div class="alert alert-info" role="alert" style={{ display: "none" }} id="msg-processing">
                            Estamos guardando el gasto
                        </div>
                        <div class="alert alert-success" role="alert" style={{ display: "none" }} id="msg-successfull">
                            El gasto fue guardado con éxito
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNewExpense