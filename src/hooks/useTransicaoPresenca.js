import { useEffect, useRef, useState } from 'react'

export function useTransicaoPresenca(selecionado, duracaoMs) {
  const [montado, setMontado] = useState(selecionado)
  const [entrando, setEntrando] = useState(selecionado)
  const [saindo, setSaindo] = useState(false)
  const jaMontouRef = useRef(selecionado)

  useEffect(() => {
    if (selecionado) {
      jaMontouRef.current = true
      setSaindo(false)
      setMontado(true)
      setEntrando(true)

      const frameId = requestAnimationFrame(() => setEntrando(false))
      return () => cancelAnimationFrame(frameId)
    }

    if (!jaMontouRef.current) {
      return undefined
    }

    setSaindo(true)

    const timeoutId = setTimeout(() => {
      setMontado(false)
      setSaindo(false)
      jaMontouRef.current = false
    }, duracaoMs)

    return () => clearTimeout(timeoutId)
  }, [selecionado, duracaoMs])

  return { montado, entrando, saindo }
}
