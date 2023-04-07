import './App.css';
import { Routes, Route } from 'react-router-dom'
import Demo from './Components/Demo';
import EarningsMain from './Components/Earnings/EarningsMain';
import Gastos from './Components/Expenses/ExpensesMain';
import Inversiones from './Components/Inversiones'
import Cashflow from './Components/Cashflow';
import Navbar from './Components/Navbar/Navbar';
import HistoricalInvestment from './Components/HistoricalInvestment'
import Portfolio from './Components/Portfolio/Portfolio';
import Balance from './Components/Balance';
import { DataContextProvider } from './Components/Context/Context';
import CreditCard from './Components/CreditCard/CreditCardMain';
import RefundMain from './Components/Refund/RefundMain';
import ExpensesTableForExcel from './Components/Expenses/Components/ExpensesTableForExcel/ExpensesTableForExcel';
import Login from './Components/Login/Login';
import ExpenseAccount from './Components/Accounts/ExpenseAccount/ExpenseAccount'
import NewInvestmentAccount from './Components/Accounts/InvestmentAccount/InvestmentAccount';
import NewAssetAccount from './Components/Accounts/AssetAccount/AssetAccount';
import NewEarningAccount from './Components/Accounts/EarningAccount/EarningAccount';
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {

  const path = process.env.REACT_APP_BASEPATH  // 'https://7lgu80.deta.dev' 'http://localhost:3001'
  const token = cookies.get("Token");

  return (
    <>
      <DataContextProvider>
        {
          token ?
            <>
              <div className='container'>
                <Navbar />
                <Balance path={path} />
              </div>
              <Routes>
                <Route path="/" element={<Demo path={path} />}></Route>
                <Route path="/ingresos" element={<EarningsMain path={path} />}></Route>
                <Route exact path="/gastos" element={<Gastos path={path} />}></Route>
                <Route path="/inversiones" element={<Inversiones path={path} />} />
                <Route path="/cashflow" element={<Cashflow path={path} />}></Route>
                <Route path="/inversiones/historico" element={<HistoricalInvestment path={path} />} />
                <Route path="/portfolio" element={<Portfolio path={path} />} />
                <Route exact path="/creditcard" element={<CreditCard path={path} />} />
                <Route exact path="/refund" element={<RefundMain path={path} />} />
                <Route exact path="/login" element={<Login path={path} />} />
                <Route exact path="/gastos/para-excel" element={<ExpensesTableForExcel path={path} />} />
                <Route exact path='/account/expense' element={<ExpenseAccount path={path} />} />
                <Route exact path='/account/earning' element={<NewEarningAccount path={path} />} />
                <Route exact path='/account/investment' element={<NewInvestmentAccount path={path} />} />
                <Route exact path='/account/asset' element={<NewAssetAccount path={path} />} />
              </Routes>
            </>
            :
            <Routes>
              <Route exact path="/login" element={<Login path={path} />} />
            </Routes>
        }
        {/* <div className='container'>
          <Navbar />
          <Balance path={path} />
        </div>
        <Routes>
          {token ?
            <>
              <Route path="/" element={<Demo path={path} />}></Route>
              <Route path="/ingresos" element={<EarningsMain path={path} />}></Route>
              <Route exact path="/gastos" element={<Gastos path={path} />}></Route>
              <Route path="/inversiones" element={<Inversiones path={path} />} />
              <Route path="/cashflow" element={<Cashflow path={path} />}></Route>
              <Route path="/inversiones/historico" element={<HistoricalInvestment path={path} />} />
              <Route path="/portfolio" element={<Portfolio path={path} />} />
              <Route exact path="/creditcard" element={<CreditCard path={path} />} />
              <Route exact path="/refund" element={<RefundMain path={path} />} />
              <Route exact path="/login" element={<Login path={path} />} />
            </>
            :
            <Route exact path="/login" element={<Login path={path} />} />
          } */}
          {/* <Route path="/" element={<Demo path={path} />}></Route>
          <Route path="/ingresos" element={<EarningsMain path={path} />}></Route>
          <Route exact path="/gastos" element={<Gastos path={path} />}></Route>
          <Route path="/inversiones" element={<Inversiones path={path} />} />
          <Route path="/cashflow" element={<Cashflow path={path} />}></Route>
          <Route path="/inversiones/historico" element={<HistoricalInvestment path={path} />} />
          <Route path="/portfolio" element={<Portfolio path={path} />} />
          <Route exact path="/creditcard" element={<CreditCard path={path} />} />
          <Route exact path="/refund" element={<RefundMain path={path} />} /> 
          <Route exact path="/register" element={<Register path={path} />} /> 
          <Route exact path="/login" element={<Login path={path} />} />  */}
        {/* </Routes> */}
      </DataContextProvider>
    </>
  )
}

export default App;
