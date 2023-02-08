function ModalBody ({id, children}) {
    return (
        <div className="modal fade" id={`${id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content container">
                        {children}
                    </div>
                </div>
            </div>
    )
}

export default ModalBody