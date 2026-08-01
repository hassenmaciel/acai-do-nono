export function scrollParaTopo(comportamento = 'smooth') {
  requestAnimationFrame(() => {
    window.scrollTo({ top: 0, behavior: comportamento })
  })
}
