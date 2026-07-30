import './CardCategoria.css'

function CardCategoria({ icon, title, description }) {
  return (
    <article className="card-categoria">
      <span className="card-categoria__icon" aria-hidden="true">
        {icon}
      </span>
      <h3 className="card-categoria__title">{title}</h3>
      <p className="card-categoria__description">{description}</p>
    </article>
  )
}

export default CardCategoria
