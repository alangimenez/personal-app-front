function ModalButton({ text, target }) {
    return (
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`${target}`}>
            {text}
        </button>
    )
}

export default ModalButton