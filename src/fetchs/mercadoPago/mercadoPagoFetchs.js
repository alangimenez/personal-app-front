const closeMercadoPagoPeriod = async (total, token, path) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            "total": total
        })
    };

    await fetch(`${path}/period`, requestOptions)
}

export {
    closeMercadoPagoPeriod
}