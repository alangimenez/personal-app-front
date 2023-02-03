function InfoMessage({text, id}) {
    return (
        <div className="alert alert-info" role="alert" style={{ display: "none" }} id={`${id}`}>
            {text}
        </div>
    )
}

export default InfoMessage