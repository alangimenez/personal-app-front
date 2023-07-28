import ModalNewInvestment from './Investments/modalNewInvestment'
import ModalNewAssetType from './Investments/ModalNewAssetType'
import ModalUpdateQuoteManually from './Investments/ModalUpdateQuoteManually'
import ModalNewTransfer from './Investments/ModalNewTransfer'
import ModalClosePeriod from './Investments/ModalClosePeriod'
import ModalNewInvestmentFromArsToUsd from './Investments/modalNewInvestmentFromArsToUsd'

function Inversiones({ path }) {
    return (
        <div className="container">
            <h1>Inversiones</h1>

            <ModalNewAssetType path={path}/>
            <ModalNewInvestment path={path} />
            <ModalNewInvestmentFromArsToUsd path={path} />
            <ModalUpdateQuoteManually path={path} />
            <ModalNewTransfer path={path} />
            <ModalClosePeriod path={path} />
        </div>
    )
}

export default Inversiones