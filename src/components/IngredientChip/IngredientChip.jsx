import './IngredientChip.css'

function IngredientChip({ nome, selecionado, desabilitado, onToggle }) {
  return (
    <button
      type="button"
      className={
        selecionado
          ? 'ingredient-chip ingredient-chip--selected'
          : 'ingredient-chip'
      }
      aria-pressed={selecionado}
      disabled={desabilitado}
      onClick={onToggle}
    >
      {nome}
    </button>
  )
}

export default IngredientChip
