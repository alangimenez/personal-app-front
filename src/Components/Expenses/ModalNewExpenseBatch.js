import { useEffect, useState } from 'react'

function ModalNewExpenseBatch() {

    const [items, setItems] = useState(1)

    const addOther = () => {
        setItems(items + 1)
        const div = document.createElement('div')
        div.setAttribute('display', 'flexbox')

        const inputAccount = document.createElement('input');
        inputAccount.setAttribute('id', `cuenta ${items}`)
        inputAccount.setAttribute('placeholder', 'Cuenta')

        const inputCurrency = document.createElement('input');
        inputCurrency.setAttribute('id', `currency ${items}`)
        inputCurrency.setAttribute('placeholder', 'Moneda')

        const inputImport = document.createElement('input');
        inputImport.setAttribute('id', `import ${items}`)
        inputImport.setAttribute('placeholder', 'Importe')

        const br = document.createElement('br');

        div.appendChild(inputAccount);
        div.appendChild(inputCurrency);
        div.appendChild(inputImport);

        const root = document.getElementById('rooter');
        root.appendChild(div);
        root.appendChild(br)
    }

    const enviar = () => {
        const array = []
        for (let i = 1; i < items; i++) {
            array.push(document.getElementById(`cuenta ${i}`).value)
        }
        console.log(array)
    }

    useEffect(() => { addOther() }, [])

    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalTest">
                Launch demo modal
            </button>


            <div className="modal fade bd-example-modal-lg" id="exampleModalTest" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div id="div">
                                <div id="rooter" style={{ display: 'flexbox' }}></div>
                                <button className='btn btn-secondary' onClick={addOther} style={{ float: 'right' }}>Agregar otro gasto</button>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>






        </div>
    )
}

export default ModalNewExpenseBatch