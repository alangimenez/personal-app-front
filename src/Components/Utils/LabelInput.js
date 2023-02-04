function LabelInput({text, id, type}) {
    return (
        <div className="form-group">
            <label htmlFor={`${id}`}>{text}</label>
            <input type={`${type}`} className="form-control" id={`${id}`}></input>
        </div>
    )
}

export default LabelInput