import { useEffect, useRef, useState } from 'react'
import CopoAcai from './CopoAcai'
import { ID_300ML } from '../../data/tamanhos'
import './PreviewAcai.css'

function PreviewAcai({ tamanho, base, ingredientes = [] }) {
  const cardRef = useRef(null)
  const primeiraRenderRef = useRef(true)
  const [dentroDaTela, setDentroDaTela] = useState(true)
  const [atualizando, setAtualizando] = useState(false)

  useEffect(() => {
    const elemento = cardRef.current

    if (!elemento) {
      return undefined
    }

    const observer = new IntersectionObserver(([entry]) => {
      setDentroDaTela(entry.isIntersecting)
    })

    observer.observe(elemento)

    return () => observer.disconnect()
  }, [])

  const nomeTamanho = tamanho ? tamanho.nome : '300 ml'
  const tamanhoId = tamanho ? tamanho.id : ID_300ML
  const baseId = base ? base.id : null
  const assinaturaSelecao = `${tamanhoId}|${baseId}|${ingredientes.join(',')}`

  useEffect(() => {
    if (primeiraRenderRef.current) {
      primeiraRenderRef.current = false
      return undefined
    }

    setAtualizando(true)
    const timeoutId = setTimeout(() => setAtualizando(false), 650)

    return () => clearTimeout(timeoutId)
  }, [assinaturaSelecao])

  return (
    <>
      <section className="preview-acai" ref={cardRef}>
        <div
          className={
            atualizando
              ? 'preview-acai__card preview-acai__card--atualizado'
              : 'preview-acai__card'
          }
        >
          <div className="preview-acai__cup">
            <CopoAcai
              tamanhoId={tamanhoId}
              baseId={baseId}
              ingredientes={ingredientes}
            />
          </div>
        </div>
      </section>

      <div
        className={
          dentroDaTela
            ? 'preview-acai__mini'
            : 'preview-acai__mini preview-acai__mini--visivel'
        }
        aria-hidden="true"
      >
        <div className="preview-acai__mini-cup">
          <CopoAcai
            tamanhoId={tamanhoId}
            baseId={baseId}
            ingredientes={ingredientes}
          />
        </div>
        <div className="preview-acai__mini-info">
          <span className="preview-acai__mini-tamanho">{nomeTamanho}</span>
          <span className="preview-acai__mini-label">Seu açaí</span>
        </div>
      </div>
    </>
  )
}

export default PreviewAcai
