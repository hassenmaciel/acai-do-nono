import { ID_300ML, ID_500ML, ID_700ML, ID_1L } from '../../data/tamanhos'
import CupLayer from './camadas/CupLayer'
import AcaiLayer from './camadas/AcaiLayer'
import IngredientLayer from './camadas/IngredientLayer'
import SyrupLayer from './camadas/SyrupLayer'
import ToppingLayer from './camadas/ToppingLayer'
import Labels from './camadas/Labels'
import './CopoAcai.css'

const ESCALA_POR_TAMANHO = {
  [ID_300ML]: 0.82,
  [ID_500ML]: 0.9,
  [ID_700ML]: 1,
  [ID_1L]: 1.1,
}

const ESCALA_PADRAO = ESCALA_POR_TAMANHO[ID_300ML]

function CopoAcai({ tamanhoId, baseId, ingredientes }) {
  const escala = ESCALA_POR_TAMANHO[tamanhoId] ?? ESCALA_PADRAO

  return (
    <svg
      className="copo-acai"
      viewBox="0 0 120 150"
      style={{ '--copo-escala': escala }}
      aria-hidden="true"
    >
      <CupLayer />
      <AcaiLayer baseId={baseId} />
      <IngredientLayer ingredientes={ingredientes} />
      <SyrupLayer />
      <ToppingLayer />
      <Labels />
    </svg>
  )
}

export default CopoAcai
