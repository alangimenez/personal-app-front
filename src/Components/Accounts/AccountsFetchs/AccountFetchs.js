const associateAccountWithAssetType = async (ticket, assetType, token, path) => {
    const requestOptionsAssetType = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            "ticket": ticket,
            "assetType": assetType
        })
    }
    
    const resTwo = await fetch(`${path}/assettype/associate`, requestOptionsAssetType)
    const dataTwo = await resTwo.json()

    return dataTwo
}

const createAccount = async (name, assetType, type, ticket, currency, token, path) => {
    const requestOptionsAccount = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            "name": name,
            "type": type,
            "assetType": assetType,
            "ticket": ticket,
            "balance": 0,
            "currency": currency
        })
    }

    const resOne = await fetch(`${path}/account`, requestOptionsAccount)
    const dataOne = await resOne.json()
    return {
        "error": resOne.status != 201 ? true : false,
        "message": resOne.status != 201 ? dataOne.error : dataOne.success
    }
}

export {
    associateAccountWithAssetType,
    createAccount
}