import { useState } from 'react'
import IngredientChip from '../IngredientChip/IngredientChip'
import { listarIngredientes } from '../../services/cardapioService'
import './SeletorIngredientes.css'

const LABEL_CATEGORIA = {
  fruta: 'Frutas',
  seco: 'Secos',
  calda: 'Caldas',
}

const ICONE_CATEGORIA = {
  fruta: '🍓',
  seco: '🌾',
  calda: '🍯',
}

function agruparPorCategoria(ingredientes) {
  const grupos = []
  const indicePorCategoria = new Map()

  ingredientes.forEach((ingrediente) => {
    if (!indicePorCategoria.has(ingrediente.categoria)) {
      indicePorCategoria.set(ingrediente.categoria, grupos.length)
      grupos.push({ categoria: ingrediente.categoria, itens: [] })
    }

    grupos[indicePorCategoria.get(ingrediente.categoria)].itens.push(
      ingrediente,
    )
  })

  return grupos
}

function SeletorIngredientes({
  limite = 5,
  ingredientesSelecionados,
  onAlterarIngredientes,
}) {
  const ingredientes = listarIngredientes()
  const grupos = agruparPorCategoria(ingredientes)
  const [categoriaAtiva, setCategoriaAtiva] = useState(grupos[0]?.categoria)

  const limiteAtingido = ingredientesSelecionados.length >= limite

  const handleToggle = (id) => {
    if (ingredientesSelecionados.includes(id)) {
      onAlterarIngredientes(
        ingredientesSelecionados.filter((item) => item !== id),
      )
      return
    }

    if (limiteAtingido) {
      return
    }

    onAlterarIngredientes([...ingredientesSelecionados, id])
  }

  const grupoAtivo =
    grupos.find((grupo) => grupo.categoria === categoriaAtiva) ?? grupos[0]

  const totalSelecionados = ingredientesSelecionados.length
  const textoRegra =
    totalSelecionados === 0
      ? `Até ${limite} ingredientes`
      : `${totalSelecionados} de ${limite} selecionados`

  return (
    <section className="seletor-ingredientes">
      <h2 className="seletor-ingredientes__title">
        Escolha seus ingredientes
      </h2>

      <p
        className={
          limiteAtingido
            ? 'seletor-ingredientes__regra seletor-ingredientes__regra--completo'
            : 'seletor-ingredientes__regra'
        }
      >
        {textoRegra}
      </p>

      <div className="seletor-ingredientes__card">
        <div
          className="seletor-ingredientes__categorias"
          role="tablist"
          aria-label="Categorias de ingredientes"
        >
          {grupos.map((grupo) => {
            const ativa = grupo.categoria === grupoAtivo?.categoria

            return (
              <button
                key={grupo.categoria}
                type="button"
                role="tab"
                id={`categoria-tab-${grupo.categoria}`}
                aria-selected={ativa}
                aria-controls="categoria-painel"
                className={
                  ativa
                    ? 'seletor-ingredientes__categoria seletor-ingredientes__categoria--ativa'
                    : 'seletor-ingredientes__categoria'
                }
                onClick={() => setCategoriaAtiva(grupo.categoria)}
              >
                <span
                  className="seletor-ingredientes__categoria-icone"
                  aria-hidden="true"
                >
                  {ICONE_CATEGORIA[grupo.categoria]}
                </span>
                {LABEL_CATEGORIA[grupo.categoria] ?? grupo.categoria}
              </button>
            )
          })}
        </div>

        <div
          key={grupoAtivo?.categoria}
          className="seletor-ingredientes__painel"
          role="tabpanel"
          id="categoria-painel"
          aria-labelledby={`categoria-tab-${grupoAtivo?.categoria}`}
        >
          <div className="seletor-ingredientes__chips">
            {grupoAtivo?.itens.map((ingrediente) => {
              const selecionado = ingredientesSelecionados.includes(
                ingrediente.id,
              )
              const desabilitado = !selecionado && limiteAtingido

              return (
                <IngredientChip
                  key={ingrediente.id}
                  nome={ingrediente.nome}
                  selecionado={selecionado}
                  desabilitado={desabilitado}
                  onToggle={() => handleToggle(ingrediente.id)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeletorIngredientes
