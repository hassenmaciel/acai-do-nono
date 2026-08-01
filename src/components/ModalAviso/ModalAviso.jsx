import { useEffect } from 'react'
import './ModalAviso.css'

function ModalAviso({ aberto, titulo, children, onFechar, acaoPrimaria, acaoSecundaria }) {
  useEffect(() => {
    if (!aberto) {
      return undefined
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape' && onFechar) {
        onFechar()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [aberto, onFechar])

  if (!aberto) {
    return null
  }

  return (
    <div className="modal-aviso__overlay" onClick={onFechar}>
      <div
        className="modal-aviso__card"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="modal-aviso-titulo"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="modal-aviso-titulo" className="modal-aviso__title">
          {titulo}
        </h2>

        {children && <div className="modal-aviso__texto">{children}</div>}

        <div className="modal-aviso__acoes">
          {acaoSecundaria && (
            <button
              type="button"
              className="modal-aviso__botao modal-aviso__botao--secundario"
              onClick={acaoSecundaria.onClick}
            >
              {acaoSecundaria.label}
            </button>
          )}
          {acaoPrimaria && (
            <button
              type="button"
              className="modal-aviso__botao modal-aviso__botao--primario"
              onClick={acaoPrimaria.onClick}
            >
              {acaoPrimaria.label}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalAviso
