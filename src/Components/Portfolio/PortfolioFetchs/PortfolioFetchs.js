const saveNewOtherQuotes = async (path, token) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };

    await fetch(`${path}/otherquotes`, requestOptions)
}

export {
    saveNewOtherQuotes
}