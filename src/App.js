import './App.css';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom'
import Demo from './Components/Demo';
import Ingresos from './Components/Ingresos';
import Gastos from './Components/Gastos';
import Inversiones from './Components/Inversiones'
import Cashflow from './Components/Cashflow';
import Navbar from './Components/Navbar';
import HistoricalInvestment from './Components/HistoricalInvestment'
import Portfolio from './Components/Portfolio';

function App() {

  const path = process.env.REACT_APP_BASEPATH  // 'https://7lgu80.deta.dev' 'http://localhost:3001'

  return (
    <>
      <div className='container'>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Demo path={path} />}></Route>
        <Route path="/ingresos" element={<Ingresos path={path} />}></Route>
        <Route path="/gastos" element={<Gastos path={path} />}></Route>
        <Route path="/inversiones" element={<Inversiones path={path} />} />
        <Route path="/cashflow" element={<Cashflow path={path} />}></Route>
        <Route path="/inversiones/historico" element={<HistoricalInvestment path={path} />} />
        <Route path="/portfolio" element={<Portfolio path={path} />} />
      </Routes>
    </>
  )
}

export default App;
