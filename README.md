# Açaí do Nono

Base do projeto React + Vite (JavaScript) para o site do Açaí do Nono.

## Como rodar

```bash
npm install
npm run dev
```

## Estrutura de pastas

```
src/
  assets/
    images/     # imagens
    icons/      # ícones
  components/   # componentes reutilizáveis
  layout/       # layout base da aplicação (header, footer, outlet)
  pages/
    Home/
    Configurador/
    Carrinho/
  hooks/        # hooks customizados
  context/      # Context API (ex: estado global do carrinho)
  services/     # integrações externas (ex: geração do link do WhatsApp)
  utils/        # funções auxiliares
  styles/       # estilos globais
  App.jsx
  main.jsx
```

Este é apenas o esqueleto do projeto. As telas (Home, Configurador, Carrinho) e a integração com WhatsApp ainda não possuem funcionalidade implementada.

## Lint

```bash
npm run lint
```

Utiliza o [Oxlint](https://oxc.rs), linter padrão do template Vite + React.
