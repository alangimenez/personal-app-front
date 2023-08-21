const getLastOtherQuotes = async (token, path) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };

    const response = await fetch(`${path}/otherquotes`, requestOptions)
    if (response.status == 200) {
        const data = await response.json()
        return data
    } else {
        return {error: `Hubo un error obteniendo la información. Status ${response.status}. Detalle: ${response.json}`}
    }
}


export {
    getLastOtherQuotes
}