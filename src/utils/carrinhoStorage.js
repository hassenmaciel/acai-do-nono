const CHAVE_CARRINHO = 'acai-do-nono:carrinho:v1'

export function carregarCarrinho() {
  try {
    const bruto = window.localStorage.getItem(CHAVE_CARRINHO)

    if (!bruto) {
      return []
    }

    const itens = JSON.parse(bruto)
    return Array.isArray(itens) ? itens : []
  } catch {
    return []
  }
}

export function salvarCarrinho(itens) {
  try {
    window.localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens))
  } catch {
    // Armazenamento indisponível (modo privado, quota excedida etc.) — o
    // carrinho continua funcionando em memória nesta sessão.
  }
}
