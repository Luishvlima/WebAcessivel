# Especificação Técnica: Variações da Galeria de Imagens de Campo

**Data:** 2026-11-06  
**Projeto:** Web-Acessibilidade (Estácio Niterói)  
**Objetivo:** Criar 3 novas versões do site em pastas separadas (`versao-hover/`, `versao-cards/`, `versao-split/`), modificando exclusivamente as seções onde são exibidas as imagens de evidência de campo (`#galeria-campo`), mantendo todas as demais funcionalidades (mapa Leaflet, vetores/matrizes, tema claro/escuro e modal de ampliação) idênticas e operacionais.

---

## 1. Visão Geral das 3 Versões

### Versão 1: `versao-hover/` (Hover Reveal / Overlay Cinematográfico)
- **Proposta:** Apresentação limpa focada na imagem.
- **Estado Normal:** A foto é o elemento principal; na base há apenas o título em destaque sutil com gradiente.
- **Estado Hover/Focus:** Ao passar o mouse (ou focar via teclado), uma camada translúcida com desfoque de fundo (`backdrop-filter: blur(8px)`) sobe suavemente revelando o título completo, a análise técnica detalhada e a instrução para ampliação.
- **Acessibilidade:** Suporta navegação por teclado (`:focus-within` / `:focus-visible`) e toque em dispositivos móveis.

### Versão 2: `versao-cards/` (Cards Estruturados / Bento Box)
- **Proposta:** Estilo relatório técnico / painel de auditoria.
- **Estrutura:** Cada imagem e sua descrição são agrupadas dentro de um card com fundo dedicado (`var(--fundo-card)`), borda sutil (`var(--borda)`), sombra suave e cantos arredondados.
- **Elementos Adicionais:** Chip/badge de identificação (ex: *Registro Técnico*), tipografia refinada e microinteração de elevação ao passar o mouse (`translateY(-4px)` com realce de borda).

### Versão 3: `versao-split/` (Layout Horizontal Split / Media Cards)
- **Proposta:** Leitura técnica aprofundada lado a lado (estilo editorial).
- **Estrutura:** Grade em 2 colunas no desktop onde cada card divide horizontalmente 50% para a foto e 50% para a legenda e metadados. Em telas móveis, adapta-se suavemente para disposição vertical.
- **Vantagem:** Maior legibilidade para textos descritivos longos sem esticar excessivamente a altura das fotos.

---

## 2. Preservação de Funcionalidades Originais
- **Lightbox Modal:** Todas as fotos mantêm a classe `.abrir-foto` e atributos de acessibilidade (`aria-haspopup="dialog"`), garantindo que o clique em qualquer imagem abra o modal de ampliação sem quebras.
- **Tema Claro / Escuro:** Utilização das variáveis CSS originais (`--fundo-card`, `--borda`, `--texto-titulo`, `--texto-mutado`, etc.).
- **Independência de Pastas:** Cada versão reside em sua própria pasta (`versao-hover/`, `versao-cards/`, `versao-split/`), contendo `index.html`, `style.css` (ou folha customizada) e recursos necessários para execução imediata tanto via Apache (`http://localhost/WebAcessibilidade/...`) quanto via `file://`.
