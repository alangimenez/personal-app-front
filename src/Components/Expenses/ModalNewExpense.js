function ModalNewExpense({path}) {

    const saveExpense = () => {
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
            .then((data) => console.log(data))
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
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveExpense}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalNewExpense