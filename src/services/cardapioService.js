import { getTamanhosAtivos } from '../data/tamanhos'
import { getBasesAtivas } from '../data/bases'
import { getIngredientesAtivos, getIngredientesPorIds } from '../data/ingredientes'
import { getCategoriasAtivas } from '../data/categorias'
import { getProdutoPorId } from '../data/produtos'
import { getNumeroWhatsapp } from '../data/loja'

export function listarTamanhos() {
  return getTamanhosAtivos()
}

export function listarBases() {
  return getBasesAtivas()
}

export function listarIngredientes() {
  return getIngredientesAtivos()
}

export function listarIngredientesPorIds(ids) {
  return getIngredientesPorIds(ids)
}

export function listarCategorias() {
  return getCategoriasAtivas()
}

export function obterProduto(id) {
  return getProdutoPorId(id)
}

export function obterNumeroWhatsapp() {
  return getNumeroWhatsapp()
}
