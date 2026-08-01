import {
  obterTamanho,
  obterBase,
  listarIngredientesPorIds,
} from '../services/cardapioService'
import { calcularTotal, LIMITE_INGREDIENTES } from './precos'

export function gerarIdItemCarrinho() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function resolverItemPedido(itemCarrinho) {
  const { id, tamanhoId, baseId, ingredientesIds = [] } = itemCarrinho

  const tamanho = obterTamanho(tamanhoId)
  const base = obterBase(baseId)
  const ingredientesResolvidos = listarIngredientesPorIds(ingredientesIds)

  const ingredientes = ingredientesResolvidos.slice(0, LIMITE_INGREDIENTES)
  const ingredientesExtras = ingredientesResolvidos.slice(LIMITE_INGREDIENTES)

  const total = calcularTotal({
    tamanho,
    ingredientes: ingredientesResolvidos,
    limite: LIMITE_INGREDIENTES,
  })

  return {
    id,
    tamanhoId,
    baseId,
    ingredientesIds,
    tamanho,
    base,
    ingredientes,
    ingredientesExtras,
    total,
  }
}
