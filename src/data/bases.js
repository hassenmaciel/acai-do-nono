export const ID_TRADICIONAL = 'tradicional'
export const ID_ZERO_ACUCAR = 'zero-acucar'

export const bases = [
  {
    id: ID_TRADICIONAL,
    nome: '🥣 Açaí Tradicional',
    corPrincipal: '#5c2170',
    corSecundaria: '#330d44',
    ativo: true,
  },
  {
    id: ID_ZERO_ACUCAR,
    nome: '🥣 Açaí Zero Açúcar',
    corPrincipal: '#a860cf',
    corSecundaria: '#7a34a0',
    ativo: true,
  },
]

export function getBasesAtivas() {
  return bases.filter((base) => base.ativo)
}

export function getBasePorId(id) {
  return bases.find((base) => base.id === id)
}
