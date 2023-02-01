function NewInvestment({password}) {

    // save investment register
    const saveInvestment = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'password-security': password },
            body: JSON.stringify({
                "name": document.getElementById("nameOfAsset").value,
                "ticket": document.getElementById("ticket").value,
                "purchaseDate": document.getElementById("purchaseDate").value,
                "purchaseQuantity": document.getElementById("quantity").value,
                "purchasePrice": document.getElementById("purchasePrice").value,
                "currency": document.getElementById("currency").value,
                "assetType": document.getElementById("assetType").value,
                "operation": document.getElementById("operation").value,
                "actualQuantity": document.getElementById("quantity").value,
                "commission": document.getElementById("commision").value
            })
        }

        fetch('/investment', requestOptions)
            .then((res) => res.json())
            .then((data) => console.log(data))
    }


    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Ingresar nueva inversión
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="nameOfAsset">Name of asset</label>
                                    <input className="form-control" id="nameOfAsset" aria-describedby="emailHelp"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ticket">Ticket</label>
                                    <input className="form-control" id="ticket"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="purchaseDate">Purchase date</label>
                                    <input type="date" className="form-control" id="purchaseDate"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <input type="number" className="form-control" id="quantity"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="purchasePrice">Purchase price</label>
                                    <input type="number" className="form-control" id="purchasePrice"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="commission">Commissions</label>
                                    <input type="number" className="form-control" id="commission"></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="currency">Currency</label>
                                    <select id="currency" className="form-control">
                                        <option selected>USD</option>
                                        <option>ARS</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="assetType">Asset Type</label>
                                    <select id="assetType" className="form-control">
                                        <option selected>ADR</option>
                                        <option>CEDEAR</option>
                                        <option>Obligación negociable</option>
                                        <option>Título público</option>
                                        <option>Cripto</option>
                                        <option>FCI</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="operation">Operation</label>
                                    <select id="operation" className="form-control">
                                        <option selected>Buy</option>
                                        <option>Sell</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveInvestment}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewInvestment