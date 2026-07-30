import './BannerPromocional.css'

function BannerPromocional() {
  const handlePedirAgora = () => {
    document.getElementById('configurador')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="banner-promocional">
      <div className="banner-promocional__content">
        <p className="banner-promocional__tag">🔥 PROMOÇÃO DA SEMANA</p>
        <p className="banner-promocional__text">
          Monte seu Açaí e ganhe 1 cobertura grátis!
        </p>
      </div>

      <button
        type="button"
        className="banner-promocional__cta"
        onClick={handlePedirAgora}
      >
        Pedir Agora
      </button>
    </section>
  )
}

export default BannerPromocional
