export function escolherLayoutAleatorio(layouts) {
  const indice = Math.floor(Math.random() * layouts.length)
  return layouts[indice]
}
