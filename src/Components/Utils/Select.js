function Select({ text, id, options }) {
    return (
        <div className="form-group">
            <label htmlFor={`${id}`}>{text}</label>
            <select className="form-control" id={`${id}`}>
                {options.map(opt => <option>{opt}</option>)}
            </select>
        </div>
    )
}

export default Select