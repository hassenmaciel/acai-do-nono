import { Link } from 'react-router-dom'
import CardCategoria from '../../components/CardCategoria/CardCategoria'
import BannerPromocional from '../../components/BannerPromocional/BannerPromocional'
import logoAcaiDoNono from '../../assets/images/logo-acai-do-nono.png'
import { listarCategorias } from '../../services/cardapioService'
import './Home.css'

function Home() {
  const categorias = listarCategorias()

  return (
    <>
      <section className="hero">
        <div className="hero__logo">
          <img
            src={logoAcaiDoNono}
            alt=""
            className="hero__logo-img"
          />
        </div>

        <h1 className="hero__title">Açaí do Nono</h1>

        <p className="hero__subtitle">
          Monte do seu jeito. Aproveite cada colher.
        </p>

        <Link to="/configurador" className="hero__cta">
          Montar meu Açaí
        </Link>
      </section>

      <section className="categories">
        {categorias.map((categoria) => (
          <CardCategoria
            key={categoria.id}
            icon={categoria.icone}
            title={categoria.nome}
            description={categoria.descricao}
          />
        ))}
      </section>

      <BannerPromocional />
    </>
  )
}

export default Home
