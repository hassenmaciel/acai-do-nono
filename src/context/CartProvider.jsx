import { useEffect, useMemo, useState } from 'react'
import { CartContext } from './CartContext'
import { carregarCarrinho, salvarCarrinho } from '../utils/carrinhoStorage'
import { gerarIdItemCarrinho, resolverItemPedido } from '../utils/carrinho'
import { calcularTotalCarrinho } from '../utils/precos'

export function CartProvider({ children }) {
  const [itens, setItens] = useState(() => carregarCarrinho())
  const [itemEmEdicaoId, setItemEmEdicaoId] = useState(null)

  useEffect(() => {
    salvarCarrinho(itens)
  }, [itens])

  const adicionarItem = ({ tamanhoId, baseId, ingredientesIds }) => {
    const novoItem = {
      id: gerarIdItemCarrinho(),
      tamanhoId,
      baseId,
      ingredientesIds,
    }

    setItens((atual) => [...atual, novoItem])
    return novoItem.id
  }

  const atualizarItem = (id, { tamanhoId, baseId, ingredientesIds }) => {
    setItens((atual) =>
      atual.map((item) =>
        item.id === id
          ? { ...item, tamanhoId, baseId, ingredientesIds }
          : item,
      ),
    )
  }

  const duplicarItem = (id) => {
    setItens((atual) => {
      const indice = atual.findIndex((item) => item.id === id)

      if (indice === -1) {
        return atual
      }

      const copia = { ...atual[indice], id: gerarIdItemCarrinho() }
      const proximo = [...atual]
      proximo.splice(indice + 1, 0, copia)
      return proximo
    })
  }

  const removerItem = (id) => {
    setItens((atual) => atual.filter((item) => item.id !== id))
  }

  const limparCarrinho = () => {
    setItens([])
    setItemEmEdicaoId(null)
  }

  const iniciarEdicao = (id) => setItemEmEdicaoId(id)
  const finalizarEdicao = () => setItemEmEdicaoId(null)

  const itensResolvidos = useMemo(
    () => itens.map((item) => resolverItemPedido(item)),
    [itens],
  )

  const total = useMemo(
    () => calcularTotalCarrinho(itensResolvidos),
    [itensResolvidos],
  )

  const itemEmEdicao = useMemo(
    () => itensResolvidos.find((item) => item.id === itemEmEdicaoId) ?? null,
    [itensResolvidos, itemEmEdicaoId],
  )

  const value = {
    itens: itensResolvidos,
    total,
    itemEmEdicao,
    adicionarItem,
    atualizarItem,
    duplicarItem,
    removerItem,
    limparCarrinho,
    iniciarEdicao,
    finalizarEdicao,
  }

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}
