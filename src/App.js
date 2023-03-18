import './App.css';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom'
import Demo from './Components/Demo';
import EarningsMain from './Components/Earnings/EarningsMain';
import Gastos from './Components/Gastos';
import Inversiones from './Components/Inversiones'
import Cashflow from './Components/Cashflow';
import Navbar from './Components/Navbar';
import HistoricalInvestment from './Components/HistoricalInvestment'
import Portfolio from './Components/Portfolio/Portfolio';
import Balance from './Components/Balance';
import { DataContextProvider } from './Components/Context/Context';
import CreditCard from './Components/CreditCard/CreditCardMain';
import RefundMain from './Components/Refund/RefundMain';

function App() {

  const path = process.env.REACT_APP_BASEPATH  // 'https://7lgu80.deta.dev' 'http://localhost:3001'

  return (
    <>
      <DataContextProvider>
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
        </Routes>
      </DataContextProvider>
    </>
  )
}

export default App;
