function ModalButton({ target, children }) {
    return (
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`${target}`}>
            {children}
        </button>
    )
}

export default ModalButton