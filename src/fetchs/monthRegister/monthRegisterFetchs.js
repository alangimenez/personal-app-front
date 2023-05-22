const closeMonthRegister = async (token, path) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };

    await fetch(`${path}/monthregister`, requestOptions)
}

const getListOfPeriodsOfMonthRegister = async (token, path) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };

    const response = await fetch(`${path}/monthregister/periods`, requestOptions)
    return await response.json()
}

const getMonthRegisterByYearAndMonth = async (year, month, token, path) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };

    const response = await fetch(`${path}/monthregister/date?year=${year}&month=${month}`, requestOptions)
    return await response.json()
}

export {
    closeMonthRegister,
    getListOfPeriodsOfMonthRegister,
    getMonthRegisterByYearAndMonth
}