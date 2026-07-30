import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app-layout">
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/configurador">Configurador</Link>
          <Link to="/carrinho">Carrinho</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <p>Açaí do Nono</p>
      </footer>
    </div>
  )
}

export default Layout
