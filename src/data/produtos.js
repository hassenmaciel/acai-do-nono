import { ID_ACAI } from './categorias'
import { tamanhos } from './tamanhos'

export const ID_PRODUTO_ACAI = 'acai-montado'

export const produtos = [
  {
    id: ID_PRODUTO_ACAI,
    nome: 'Açaí',
    descricao: 'Monte seu açaí do seu jeito.',
    ativo: true,
    categorias: [ID_ACAI],
    tamanhos: tamanhos.map((tamanho) => tamanho.id),
  },
]

export function getProdutosAtivos() {
  return produtos.filter((produto) => produto.ativo)
}

export function getProdutoPorId(id) {
  return produtos.find((produto) => produto.id === id)
}
