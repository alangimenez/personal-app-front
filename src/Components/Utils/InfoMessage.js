function InfoMessage({id, type, children}) {
    return (
        <div className={`${type}`} role="alert" style={{ display: "none" }} id={`${id}`}>
            {children}
        </div>
    )
}

export default InfoMessage