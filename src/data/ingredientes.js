export const ID_BANANA = 'banana'
export const ID_MORANGO = 'morango'
export const ID_GRANOLA = 'granola'
export const ID_LEITE_NINHO = 'leite-ninho'
export const ID_NUTELLA = 'nutella'
export const ID_PACOCA = 'pacoca'
export const ID_OVOMALTINE = 'ovomaltine'
export const ID_LEITE_CONDENSADO = 'leite-condensado'

export const CATEGORIA_INGREDIENTE = {
  FRUTA: 'fruta',
  SECO: 'seco',
  CALDA: 'calda',
}

export const ingredientes = [
  {
    id: ID_BANANA,
    nome: 'Banana',
    categoria: CATEGORIA_INGREDIENTE.FRUTA,
    preco: 0,
    ativo: true,
    ordem: 1,
    possuiVisual: true,
  },
  {
    id: ID_MORANGO,
    nome: 'Morango',
    categoria: CATEGORIA_INGREDIENTE.FRUTA,
    preco: 0,
    ativo: true,
    ordem: 2,
    possuiVisual: false,
  },
  {
    id: ID_GRANOLA,
    nome: 'Granola',
    categoria: CATEGORIA_INGREDIENTE.SECO,
    preco: 0,
    ativo: true,
    ordem: 3,
    possuiVisual: true,
  },
  {
    id: ID_LEITE_NINHO,
    nome: 'Leite Ninho',
    categoria: CATEGORIA_INGREDIENTE.SECO,
    preco: 0,
    ativo: true,
    ordem: 4,
    possuiVisual: false,
  },
  {
    id: ID_NUTELLA,
    nome: 'Nutella',
    categoria: CATEGORIA_INGREDIENTE.CALDA,
    preco: 0,
    ativo: true,
    ordem: 5,
    possuiVisual: false,
  },
  {
    id: ID_PACOCA,
    nome: 'Paçoca',
    categoria: CATEGORIA_INGREDIENTE.SECO,
    preco: 0,
    ativo: true,
    ordem: 6,
    possuiVisual: false,
  },
  {
    id: ID_OVOMALTINE,
    nome: 'Ovomaltine',
    categoria: CATEGORIA_INGREDIENTE.SECO,
    preco: 0,
    ativo: true,
    ordem: 7,
    possuiVisual: false,
  },
  {
    id: ID_LEITE_CONDENSADO,
    nome: 'Leite Condensado',
    categoria: CATEGORIA_INGREDIENTE.CALDA,
    preco: 0,
    ativo: true,
    ordem: 8,
    possuiVisual: false,
  },
]

export function getIngredientesAtivos() {
  return ingredientes
    .filter((ingrediente) => ingrediente.ativo)
    .sort((a, b) => a.ordem - b.ordem)
}

export function getIngredientePorId(id) {
  return ingredientes.find((ingrediente) => ingrediente.id === id)
}

export function getIngredientesPorIds(ids) {
  return ids.map((id) => getIngredientePorId(id)).filter(Boolean)
}
