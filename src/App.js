import './App.css';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom'
import Demo from './Components/Demo';
import Ingresos from './Components/Ingresos';
import Gastos from './Components/Gastos';
import Inversiones from './Components/Inversiones'
import Cashflow from './Components/Cashflow';

function App() {

  const path = 'http://localhost:3001'  // 'https://7lgu80.deta.dev'

  return (
    <>
      <Routes>
        <Route path="/" element={<Demo path={path} />}></Route>
        <Route path="/ingresos" element={<Ingresos path={path} />}></Route>
        <Route path="/gastos" element={<Gastos path={path} />}></Route>
        <Route path="/inversiones" element={<Inversiones path={path} />} />
        <Route path="/cashflow" element={<Cashflow path={path} />}></Route>
      </Routes>
    </>
  )
}

export default App;
