import { useState } from 'react'
import { formatarPreco } from '../../utils/precos'
import './CarrinhoItem.css'

const DURACAO_SAIDA_MS = 220

function CarrinhoItem({ item, onEditar, onDuplicar, onRemover }) {
  const [saindo, setSaindo] = useState(false)

  const handleRemover = () => {
    setSaindo(true)
    setTimeout(() => onRemover(item.id), DURACAO_SAIDA_MS)
  }

  return (
    <li
      className={
        saindo ? 'carrinho-item carrinho-item--saindo' : 'carrinho-item'
      }
    >
      <div className="carrinho-item__cabecalho">
        <span className="carrinho-item__tamanho">
          Açaí {item.tamanho?.nome ?? ''}
        </span>
        <span className="carrinho-item__total">
          {formatarPreco(item.total)}
        </span>
      </div>

      <p className="carrinho-item__base">{item.base?.nome}</p>

      {item.ingredientes.length > 0 && (
        <ul className="carrinho-item__ingredientes">
          {item.ingredientes.map((ingrediente) => (
            <li key={ingrediente.id}>{ingrediente.nome}</li>
          ))}
        </ul>
      )}

      {item.ingredientesExtras.length > 0 && (
        <p className="carrinho-item__extras">
          +{' '}
          {item.ingredientesExtras
            .map((ingrediente) => ingrediente.nome)
            .join(', ')}{' '}
          <span className="carrinho-item__extras-tag">extra</span>
        </p>
      )}

      <div className="carrinho-item__acoes">
        <button
          type="button"
          className="carrinho-item__botao"
          onClick={() => onEditar(item.id)}
        >
          Editar
        </button>
        <button
          type="button"
          className="carrinho-item__botao"
          onClick={() => onDuplicar(item.id)}
        >
          Duplicar
        </button>
        <button
          type="button"
          className="carrinho-item__botao carrinho-item__botao--remover"
          onClick={handleRemover}
        >
          Remover
        </button>
      </div>
    </li>
  )
}

export default CarrinhoItem
