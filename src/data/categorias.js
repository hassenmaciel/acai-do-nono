export const ID_ACAI = 'acai'
export const ID_MILK_SHAKE = 'milk-shake'
export const ID_SORVETES = 'sorvetes'
export const ID_BEBIDAS = 'bebidas'

export const categorias = [
  {
    id: ID_ACAI,
    nome: 'Açaí',
    icone: '🥤',
    descricao: 'Monte seu açaí do seu jeito.',
    ordem: 1,
    ativo: true,
  },
  {
    id: ID_MILK_SHAKE,
    nome: 'Milk Shake',
    icone: '🥛',
    descricao: 'Sabores cremosos e refrescantes.',
    ordem: 2,
    ativo: true,
  },
  {
    id: ID_SORVETES,
    nome: 'Sorvetes',
    icone: '🍨',
    descricao: 'Deliciosas opções para qualquer hora.',
    ordem: 3,
    ativo: true,
  },
  {
    id: ID_BEBIDAS,
    nome: 'Bebidas',
    icone: '🥤',
    descricao: 'Refrigerantes, água e sucos.',
    ordem: 4,
    ativo: true,
  },
]

export function getCategoriasAtivas() {
  return categorias
    .filter((categoria) => categoria.ativo)
    .sort((a, b) => a.ordem - b.ordem)
}

export function getCategoriaPorId(id) {
  return categorias.find((categoria) => categoria.id === id)
}
