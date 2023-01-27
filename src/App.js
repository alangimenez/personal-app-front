import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Demo from './Components/Demo';
import Ingresos from './Components/Ingresos';
import Gastos from './Components/Gastos';
import Inversiones from './Components/Inversiones'
import Cashflow from './Components/Cashflow';

function App() {

  const path = 'https://7lgu80.deta.dev'

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Demo path={path} />}>
        </Route>
        <Route exact path="/ingresos" element={<Ingresos path={path} />}>
        </Route>
        <Route exact path="/gastos" element={<Gastos path={path} />}>
        </Route>
        <Route exact path="/inversiones" element={<Inversiones path={path} />} />
        <Route exact path="/cashflow" element={<Cashflow path={path} />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
