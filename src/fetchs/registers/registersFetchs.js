const getRegistersByType = async (token, path) => {
    const requiredOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }

    const res = await fetch(`${path}/registers/type?type=daily`, requiredOptions)
    const data = await res.json()

    return data
}

const changeStatus = async (id, token, path) => {
    const requiredOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            id: id
        })
    }

    await fetch(`${path}/registers/status`, requiredOptions)
}

export {
    getRegistersByType,
    changeStatus
}