import { useState } from 'react'
import IngredientChip from '../IngredientChip/IngredientChip'
import ModalAviso from '../ModalAviso/ModalAviso'
import { listarIngredientes } from '../../services/cardapioService'
import {
  LIMITE_INGREDIENTES_EXTRA,
  VALOR_INGREDIENTE_EXTRA,
  formatarPreco,
} from '../../utils/precos'
import './SeletorIngredientes.css'

const MODAL_NENHUM = null
const MODAL_EXTRA = 'extra'
const MODAL_TETO = 'teto'

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
  const [modalAberto, setModalAberto] = useState(MODAL_NENHUM)
  const [ingredientePendente, setIngredientePendente] = useState(null)

  const totalSelecionados = ingredientesSelecionados.length
  const limiteTotal = limite + LIMITE_INGREDIENTES_EXTRA
  const limiteAtingido = totalSelecionados >= limite
  const tetoAtingido = totalSelecionados >= limiteTotal

  const fecharModal = () => {
    setModalAberto(MODAL_NENHUM)
    setIngredientePendente(null)
  }

  const confirmarExtra = () => {
    if (ingredientePendente) {
      onAlterarIngredientes([
        ...ingredientesSelecionados,
        ingredientePendente,
      ])
    }
    fecharModal()
  }

  const handleToggle = (id) => {
    if (ingredientesSelecionados.includes(id)) {
      onAlterarIngredientes(
        ingredientesSelecionados.filter((item) => item !== id),
      )
      return
    }

    if (tetoAtingido) {
      setModalAberto(MODAL_TETO)
      return
    }

    if (limiteAtingido) {
      setIngredientePendente(id)
      setModalAberto(MODAL_EXTRA)
      return
    }

    onAlterarIngredientes([...ingredientesSelecionados, id])
  }

  const grupoAtivo =
    grupos.find((grupo) => grupo.categoria === categoriaAtiva) ?? grupos[0]

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

              return (
                <IngredientChip
                  key={ingrediente.id}
                  nome={ingrediente.nome}
                  selecionado={selecionado}
                  onToggle={() => handleToggle(ingrediente.id)}
                />
              )
            })}
          </div>
        </div>
      </div>

      <ModalAviso
        aberto={modalAberto === MODAL_EXTRA}
        titulo="Adicionar ingrediente extra?"
        onFechar={fecharModal}
        acaoSecundaria={{ label: 'Cancelar', onClick: fecharModal }}
        acaoPrimaria={{ label: 'Adicionar', onClick: confirmarExtra }}
      >
        Este ingrediente será cobrado separadamente.
        <br />
        <strong>+{formatarPreco(VALOR_INGREDIENTE_EXTRA)}</strong>
      </ModalAviso>

      <ModalAviso
        aberto={modalAberto === MODAL_TETO}
        titulo="⚠️ Limite atingido"
        onFechar={fecharModal}
        acaoPrimaria={{ label: 'OK', onClick: fecharModal }}
      >
        Você atingiu o limite máximo de ingredientes para este açaí, incluindo
        os extras. Remova um ingrediente para adicionar outro.
      </ModalAviso>
    </section>
  )
}

export default SeletorIngredientes
