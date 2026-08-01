export const LIMITE_INGREDIENTES = 5
export const LIMITE_INGREDIENTES_EXTRA = 5
export const VALOR_INGREDIENTE_EXTRA = 2

export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function calcularTotal({
  tamanho,
  ingredientes = [],
  limite = LIMITE_INGREDIENTES,
} = {}) {
  const precoBase = tamanho?.preco ?? 0
  const precoIngredientes = ingredientes.reduce(
    (soma, ingrediente) => soma + (ingrediente?.preco ?? 0),
    0,
  )
  const quantidadeExtras = Math.max(ingredientes.length - limite, 0)
  const precoExtras = quantidadeExtras * VALOR_INGREDIENTE_EXTRA

  return precoBase + precoIngredientes + precoExtras
}

export function calcularTotalCarrinho(itensResolvidos = []) {
  return itensResolvidos.reduce((soma, item) => soma + item.total, 0)
}
