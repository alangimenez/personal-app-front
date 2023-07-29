async function getEarningRegisters(path, token) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }
    const data = await fetch(`${path}/registers/type?type=earning`, requestOptions)
    const response = await data.json()

    return response
}

export {
    getEarningRegisters
}