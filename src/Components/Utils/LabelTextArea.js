function LabelTextArea({ text, id}) {
    return (
        <div className="form-group">
            <label htmlFor={`${id}`}>{text}</label>
            <textarea className="form-control" id={`${id}`} rows="3"></textarea>
        </div>
    )
}

export default LabelTextArea