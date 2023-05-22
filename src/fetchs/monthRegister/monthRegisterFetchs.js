const closeMonthRegister = async (token, path) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };

    await fetch(`${path}/monthregister`, requestOptions)
}

export {
    closeMonthRegister
}