import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home/Home'
import Configurador from './pages/Configurador/Configurador'
import Carrinho from './pages/Carrinho/Carrinho'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="configurador" element={<Configurador />} />
        <Route path="carrinho" element={<Carrinho />} />
      </Route>
    </Routes>
  )
}

export default App
