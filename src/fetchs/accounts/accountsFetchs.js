const getListOfExpenseAccounts = async (token, path) => {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    };

    const response = await fetch(`${path}/account/expenses`, requestOptions)
    const data = await response.json()

    return data
}

export {
    getListOfExpenseAccounts
}