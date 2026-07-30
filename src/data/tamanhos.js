export const ID_300ML = '300ml'
export const ID_500ML = '500ml'
export const ID_700ML = '700ml'
export const ID_1L = '1l'

export const tamanhos = [
  {
    id: ID_300ML,
    nome: '300 ml',
    volumeMl: 300,
    preco: 16.9,
    ordem: 1,
    ativo: true,
  },
  {
    id: ID_500ML,
    nome: '500 ml',
    volumeMl: 500,
    preco: 22.9,
    ordem: 2,
    ativo: true,
  },
  {
    id: ID_700ML,
    nome: '700 ml',
    volumeMl: 700,
    preco: 29.9,
    ordem: 3,
    ativo: true,
  },
  {
    id: ID_1L,
    nome: '1 Litro',
    volumeMl: 1000,
    preco: 39.9,
    ordem: 4,
    ativo: true,
  },
]

export function getTamanhosAtivos() {
  return tamanhos
    .filter((tamanho) => tamanho.ativo)
    .sort((a, b) => a.ordem - b.ordem)
}

export function getTamanhoPorId(id) {
  return tamanhos.find((tamanho) => tamanho.id === id)
}
