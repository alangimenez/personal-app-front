const getLastTenExpenses = path => {
    const requiredOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    fetch(`${path}/registers`, requiredOptions)
        .then((res) => res.json())
        .then((data) => setLastExpenses(data))
}

export default getLastTenExpenses