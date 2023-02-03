function ModalBody ({id, body}) {
    return (
        <div className="modal fade" id={`${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content container">
                        {body}
                    </div>
                </div>
            </div>
    )
}

export default ModalBody