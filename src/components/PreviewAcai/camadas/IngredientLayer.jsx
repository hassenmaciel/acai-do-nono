import { CUP_CLIP_ID } from './CupLayer'
import catalogoIngredientes from './ingredientes/catalogoIngredientes'
import IngredienteItem from './ingredientes/IngredienteItem'

function IngredientLayer({ ingredientes = [] }) {
  const catalogoOrdenado = [...catalogoIngredientes].sort(
    (a, b) => a.camada - b.camada,
  )

  return (
    <g clipPath={`url(#${CUP_CLIP_ID})`}>
      {catalogoOrdenado.map((item) => (
        <IngredienteItem
          key={item.id}
          selecionado={ingredientes.includes(item.id)}
          Forma={item.Forma}
          layouts={item.layouts}
          duracaoMs={item.duracaoMs}
        />
      ))}
    </g>
  )
}

export default IngredientLayer
