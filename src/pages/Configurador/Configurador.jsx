import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PreviewAcai from '../../components/PreviewAcai/PreviewAcai'
import SeletorTamanho from '../../components/SeletorTamanho/SeletorTamanho'
import SeletorBase from '../../components/SeletorBase/SeletorBase'
import SeletorIngredientes from '../../components/SeletorIngredientes/SeletorIngredientes'
import ResumoPedido from '../../components/ResumoPedido/ResumoPedido'
import TotalPedido from '../../components/TotalPedido/TotalPedido'
import ModalAviso from '../../components/ModalAviso/ModalAviso'
import BarraFinalizarPedido from '../../components/BarraFinalizarPedido/BarraFinalizarPedido'
import { useCart } from '../../hooks/useCart'
import { calcularTotal, formatarPreco, LIMITE_INGREDIENTES } from '../../utils/precos'
import { listarIngredientesPorIds } from '../../services/cardapioService'
import './Configurador.css'

function Configurador() {
  const cart = useCart()
  const navigate = useNavigate()
  const itemEmEdicao = cart.itemEmEdicao

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(
    () => itemEmEdicao?.tamanho ?? null,
  )
  const [baseSelecionada, setBaseSelecionada] = useState(
    () => itemEmEdicao?.base ?? null,
  )
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState(
    () => itemEmEdicao?.ingredientesIds ?? [],
  )
  const [modalProximoPasso, setModalProximoPasso] = useState({
    aberto: false,
    foiEdicao: false,
  })

  const ingredientesResolvidos = listarIngredientesPorIds(
    ingredientesSelecionados,
  )

  const total = calcularTotal({
    tamanho: tamanhoSelecionado,
    ingredientes: ingredientesResolvidos,
    limite: LIMITE_INGREDIENTES,
  })

  const podeFinalizarPedido = Boolean(tamanhoSelecionado && baseSelecionada)

  const resetarConfiguracao = () => {
    setTamanhoSelecionado(null)
    setBaseSelecionada(null)
    setIngredientesSelecionados([])
  }

  const finalizarConfiguracaoAtual = () => {
    const dados = {
      tamanhoId: tamanhoSelecionado.id,
      baseId: baseSelecionada.id,
      ingredientesIds: ingredientesSelecionados,
    }
    const foiEdicao = Boolean(itemEmEdicao)

    if (foiEdicao) {
      cart.atualizarItem(itemEmEdicao.id, dados)
      cart.finalizarEdicao()
    } else {
      cart.adicionarItem(dados)
    }

    setModalProximoPasso({ aberto: true, foiEdicao })
  }

  const handleAdicionarOutro = () => {
    setModalProximoPasso({ aberto: false, foiEdicao: false })
    resetarConfiguracao()
  }

  const handleFinalizarPedido = () => {
    setModalProximoPasso({ aberto: false, foiEdicao: false })
    navigate('/carrinho')
  }

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
        onFinalizar={finalizarConfiguracaoAtual}
      />
      <TotalPedido total={formatarPreco(total)} />

      <ModalAviso
        aberto={modalProximoPasso.aberto}
        titulo={
          modalProximoPasso.foiEdicao
            ? 'Seu açaí foi atualizado.'
            : 'Seu açaí foi adicionado.'
        }
        acaoSecundaria={{
          label: 'Adicionar outro açaí',
          onClick: handleAdicionarOutro,
        }}
        acaoPrimaria={{
          label: 'Finalizar pedido',
          onClick: handleFinalizarPedido,
        }}
      >
        O que deseja fazer agora?
      </ModalAviso>

      <BarraFinalizarPedido
        visivel={podeFinalizarPedido}
        total={total}
        onFinalizar={finalizarConfiguracaoAtual}
      />
    </div>
  )
}

export default Configurador
