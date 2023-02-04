function SuccessMessage({ text, id }) {
    return (
        <div className="alert alert-success" role="alert" style={{ display: "none" }} id={`${id}`}>
            {text}
        </div>
    )
}

export default SuccessMessage