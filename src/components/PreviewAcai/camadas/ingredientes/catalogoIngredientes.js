import { ID_BANANA, ID_GRANOLA } from '../../../../data/ingredientes'
import FormaBanana from './formas/FormaBanana'
import FormaGranola from './formas/FormaGranola'
import { LAYOUTS_BANANA } from './layouts/layoutsBanana'
import { LAYOUTS_GRANOLA } from './layouts/layoutsGranola'

export const CAMADA_VISUAL = {
  FRUTA: 1,
  SECO: 2,
}

const catalogoIngredientes = [
  {
    id: ID_BANANA,
    camada: CAMADA_VISUAL.FRUTA,
    Forma: FormaBanana,
    layouts: LAYOUTS_BANANA,
    duracaoMs: 200,
  },
  {
    id: ID_GRANOLA,
    camada: CAMADA_VISUAL.SECO,
    Forma: FormaGranola,
    layouts: LAYOUTS_GRANOLA,
    duracaoMs: 200,
  },
]

export default catalogoIngredientes
