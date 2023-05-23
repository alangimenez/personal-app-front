const createCashflowOfBond = async (cashflow, path, token) => {
    const requestOptionsCashflow = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            ticket: cashflow.ticket,
            start: cashflow.startDate,
            finish: cashflow.finishDate,
            rate: cashflow.rate,
            dateOfPayment: cashflow.dateOfPayment,
            amountInterest: cashflow.amountInterest,
            amountAmortization: cashflow.amountAmortization
        })
    }
    const response = await fetch(`${path}/cashflow`, requestOptionsCashflow)
    const data = response.json()

    return {
        "error": response.status != 201 ? true : false,
        "message": response.status != 201 ? data.error : "El cashflow del bono fue creado con éxito"
    }
}

export {
    createCashflowOfBond
}