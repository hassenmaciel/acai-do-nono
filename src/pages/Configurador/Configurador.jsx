import { useState } from 'react'
import PreviewAcai from '../../components/PreviewAcai/PreviewAcai'
import SeletorTamanho from '../../components/SeletorTamanho/SeletorTamanho'
import SeletorBase from '../../components/SeletorBase/SeletorBase'
import SeletorIngredientes from '../../components/SeletorIngredientes/SeletorIngredientes'
import ResumoPedido from '../../components/ResumoPedido/ResumoPedido'
import TotalPedido from '../../components/TotalPedido/TotalPedido'
import ModalFinalizarPedido from '../../components/ModalFinalizarPedido/ModalFinalizarPedido'
import BarraFinalizarPedido from '../../components/BarraFinalizarPedido/BarraFinalizarPedido'
import { calcularTotal, formatarPreco } from '../../utils/precos'
import {
  listarIngredientesPorIds,
  obterProduto,
} from '../../services/cardapioService'
import { ID_PRODUTO_ACAI } from '../../data/produtos'
import './Configurador.css'

const LIMITE_INGREDIENTES = 5

function Configurador() {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null)
  const [baseSelecionada, setBaseSelecionada] = useState(null)
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState([])
  const [modalAberto, setModalAberto] = useState(false)

  const ingredientesResolvidos = listarIngredientesPorIds(
    ingredientesSelecionados,
  )
  const produto = obterProduto(ID_PRODUTO_ACAI)

  const total = calcularTotal({
    tamanho: tamanhoSelecionado,
    ingredientes: ingredientesResolvidos,
  })

  const podeFinalizarPedido = Boolean(tamanhoSelecionado && baseSelecionada)

  const abrirModal = () => setModalAberto(true)

  return (
    <div
      className={
        podeFinalizarPedido
          ? 'configurador-page configurador-page--com-barra'
          : 'configurador-page'
      }
    >
      <h1 className="sr-only">Configurador</h1>
      <PreviewAcai
        tamanho={tamanhoSelecionado}
        base={baseSelecionada}
        ingredientes={ingredientesSelecionados}
      />
      <SeletorTamanho
        tamanhoSelecionado={tamanhoSelecionado}
        onSelecionarTamanho={setTamanhoSelecionado}
      />
      <SeletorBase
        baseSelecionada={baseSelecionada}
        onSelecionarBase={setBaseSelecionada}
      />
      <SeletorIngredientes
        limite={LIMITE_INGREDIENTES}
        ingredientesSelecionados={ingredientesSelecionados}
        onAlterarIngredientes={setIngredientesSelecionados}
      />
      <ResumoPedido
        tamanho={tamanhoSelecionado}
        base={baseSelecionada}
        ingredientes={ingredientesResolvidos}
        limite={LIMITE_INGREDIENTES}
        podeFinalizar={podeFinalizarPedido}
        onFinalizar={abrirModal}
      />
      <TotalPedido total={formatarPreco(total)} />

      <ModalFinalizarPedido
        aberto={modalAberto}
        onFechar={() => setModalAberto(false)}
        produto={produto}
        tamanho={tamanhoSelecionado}
        base={baseSelecionada}
        ingredientes={ingredientesResolvidos}
        total={total}
      />

      <BarraFinalizarPedido
        visivel={podeFinalizarPedido}
        total={total}
        onFinalizar={abrirModal}
      />
    </div>
  )
}

export default Configurador
