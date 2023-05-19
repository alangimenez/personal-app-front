
const getClosedPeriodByCreditCard = async (token, path) => {
    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }

    const response = await fetch(`${path}/expensecreditcard/period/CLOSED`, requestOptionsGet)
    const data = await response.json()

    const array = []
    data.map(it => array.push(it.name))
    array.unshift("")

    return {
        "periodsCC": data,
        "ccNames": array
    }
}

const getExpensesDetailByNameMonthAndYear = async (name, year, month, token, path) => {
    const requestOptionsGet = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    }

    const response = await fetch(`${path}/expensecreditcard/expenses?name=${name}&year=${year}&month=${month}`, requestOptionsGet)
    const data = await response.json()

    let total = 0
    data[0].expenses.map(e => {
        total = total + e.amount
    })

    return {
        "expenseDetail": data[0].expenses,
        "totalAmount": total
    }
}

const payPeriodOfCC = async (name, year, month, token, path) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            "name": name,
            "year": year,
            "month": month,
            "status": 'PAID'
        })
    }

    const response = await fetch(`${path}/expensecreditcard/period/status`, requestOptions)
    const data = await response.json()
}

export {
    getClosedPeriodByCreditCard,
    getExpensesDetailByNameMonthAndYear,
    payPeriodOfCC
}