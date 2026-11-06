# WebAcessibilidade | Mapeamento Digital de Acessibilidade & Modelagem Matemática

> **Curso:** Ciência da Computação  
> **Disciplina:** Geometria Analítica e Álgebra Linear  
> **Instituição:** Universidade Estácio de Sá — Campus Niterói I  
> **Norma Técnica de Referência:** ABNT NBR 9050:2020 (Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos)

---

## Sumário
1. [Visão Geral do Projeto](#1-visão-geral-do-projeto)
2. [Roteiro Oficial de Apresentação (10 a 15 min)](#2-roteiro-oficial-de-apresentação)
3. [Memorial de Cálculo e Dedução Matemática](#3-memorial-de-cálculo-e-dedução-matemática)
   - 3.1 [Coleta de Coordenadas Geodésicas (Datum WGS84)](#31-coleta-de-coordenadas-geodésicas)
   - 3.2 [Projeção Cartesiana Equirretangular Local](#32-projeção-cartesiana-equirretangular-local)
   - 3.3 [Vetores de Deslocamento e Equações das Retas](#33-vetores-de-deslocamento-e-equações-das-retas)
   - 3.4 [Distância Euclidiana Direta vs. Extensão Real (Haversine)](#34-distância-euclidiana-direta-vs-extensão-real-haversine)
   - 3.5 [Álgebra Linear: Grafo e Matriz de Adjacência A](#35-álgebra-linear-grafo-e-matriz-de-adjacência-a)
   - 3.6 [Matriz de Custos W e Algoritmo de Menor Caminho (Dijkstra)](#36-matriz-de-custos-w-e-algoritmo-de-menor-caminho-dijkstra)
4. [Diagnóstico de Campo e Propostas de Intervenção](#4-diagnóstico-de-campo-e-propostas-de-intervenção)
5. [Estrutura do Sistema Web](#5-estrutura-do-sistema-web)
6. [Referências Bibliográficas](#6-referências-bibliográficas)

---

## 1. Visão Geral do Projeto

O **WebAcessibilidade** é uma aplicação web interativa concebida para mapear, analisar e solucionar os desafios de mobilidade urbana e acessibilidade arquitetônica no entorno e nas entradas do **Campus Estácio Niterói I**.

A plataforma integra conceitos fundamentais de **Ciência da Computação**, **Geometria Analítica** e **Álgebra Linear**:
* **Levantamento em Campo:** Identificação de barreiras arquitetônicas severas (declividade excessiva, degraus, soleiras em sanitários e grelhas pluviais inadequadas).
* **Mapeamento Geoespacial:** Coleta de nós via satélite e OpenStreetMap, com cálculo de distâncias reais e representações em mapas interativos com alternância de camadas (satélite, ruas e mapa topográfico).
* **Geometria Analítica:** Decomposição vetorial em coordenadas cartesianas locais, cálculo de módulos euclidianos, coeficientes angulares e direções angulares/azimutes dos trajetos.
* **Álgebra Linear:** Representação da malha viária através de **Grafos Não-Direcionados**, estruturação da **Matriz de Adjacência $A_{4 \times 4}$** e da **Matriz de Custos Ponderada $W_{4 \times 4}$**, servindo de base computacional para o **Algoritmo de Dijkstra**.

---

## 2. Roteiro Oficial de Apresentação

### Momento 1: Abertura e Contextualização (2 minutos)
* **Tela:** Cabeçalho inicial do site com os contadores de métricas.
* **Falas sugeridas:**
  > *"Olá a todos e ao professor(a). O nosso projeto se chama **WebAcessibilidade**. Desenvolvemos uma plataforma web interativa que une Geometria Analítica, Álgebra Linear e Ciência da Computação para diagnosticar e propor soluções para a acessibilidade do Campus Estácio Niterói I.*  
  > *A acessibilidade urbana não é apenas uma diretriz da NBR 9050; ela define o direito de ir e vir de estudantes e funcionários com deficiência motora, idosos e pessoas com deficiência visual. Nosso foco foi mapear os percursos de acesso ao campus, registrar as barreiras existentes e modelar matematicamente as rotas através de vetores e matrizes ponderadas."*

### Momento 2: Demonstração das Rotas no Mapa Interativo (3 minutos)
* **Tela:** Seção do mapa interativo. Alternar entre as camadas de Satélite e Mapa Urbano e destacar os dois trajetos coloridos.
* **Falas sugeridas:**
  > *"Identificamos dois percursos fundamentais que conectam as vias públicas ao prédio da universidade:*
  > 1. ***Trajeto 01 (Amarelo – Acesso Direto):** Inicia na calçada da Rua Eduardo Luiz Gomes ($P_1$) e conduz até o pórtico de entrada ($P_2$), totalizando **54,96 metros**. Apesar de ser a menor distância métrica, possui declividade muito íngreme e degraus no pátio frontal, impedindo a locomoção autônoma de um cadeirante.*
  > 2. ***Trajeto 02 (Azul – Rota Alternativa de Contorno):** Para desviar das escadas, o pedestre com deficiência precisa descer a Rua Jornalista Alberto de Andrade, contornar a Travessa Henrique Kopke até a entrada da garagem ($P_3 \to P_4$), somando **100,56 metros**. Dali, uma rampa de serviço suave de **15 metros** conecta o piso ao hall principal.*
  > *Conclusão: Para vencer as barreiras, o usuário é forçado a percorrer mais que o dobro da distância (116 m totais), dividindo pista com veículos e calçadas estreitas."*

### Momento 3: Evidências Fotográficas e Barreiras Técnicas (2 minutos)
* **Tela:** Galeria de imagens de campo e seção de barreiras e propostas.
* **Falas sugeridas:**
  > *"Em nossa vistoria técnica registramos evidências fundamentais:*
  > * **Declividade extrema nas ruas de acesso:** O relevo natural impõe inclinações bem superiores aos 8,33% estipulados pela NBR 9050.
  > * **Degraus na entrada principal:** A ausência de rampa direta no pátio frontal barra cadeirantes logo na chegada.
  > * **Grelhas de drenagem com vãos longitudinais:** Ranhuras paralelas que travam rodas dianteiras de cadeiras de rodas e bengalas-guia.
  > * **Sanitários com soleira:** Degraus de 2 a 4 cm na porta que inviabilizam o acesso.
  > * **Propostas:** Sugerimos a instalação de plataforma elevatória vertical no hall, grelhas transversais de fresta reduzida (até 12 mm) e piso tátil contínuo."*

### Momento 4: Geometria Analítica – Vetores e Retas (3 minutos)
* **Tela:** Bloco de Modelagem Matemática, Card 1 (Vetores e Retas).
* **Falas sugeridas:**
  > *"Como transformamos essas rotas em modelos matemáticos formais?*  
  > *Projetamos os pares geodésicos em um plano cartesiano local $\mathbb{R}^2$ com origem métrica:*
  > * **Trajeto 01 (Amarelo):** O vetor resultante é $\vec{v}_1 = 23,20\hat{i} - 23,08\hat{j}\text{ (m)}$. O módulo da reta euclidiana é de **32,72 m**, com coeficiente angular $m \approx -0,99$ e direção azimutal de **315,1°**. A extensão real no piso é de **54,96 m**.*
  > * **Trajeto 02 (Azul):** O vetor é $\vec{v}_2 = -48,90\hat{i} - 21,44\hat{j}\text{ (m)}$, com módulo direto de **53,38 m**, coeficiente angular $m \approx 0,44$, direção azimutal de **203,7°** e extensão real de **100,56 m**.*
  > *Isso demonstra numericamente como as curvas e a topografia estendem o percurso em relação à linha reta ideal."*

### Momento 5: Álgebra Linear e Algoritmo de Dijkstra (3 minutos)
* **Tela:** Expandir os botões **"Visualizar matriz"** da Matriz de Adjacência e da Matriz de Custos.
* **Falas sugeridas:**
  > *"Na Álgebra Linear, modelamos o campus como um grafo não-direcionado $G = (V, E)$ com 4 vértices fundamentais:*
  > * **Matriz de Adjacência $A_{4 \times 4}$:** Registra as conexões físicas diretas ($A_{ij} = 1$) e ausências ($A_{ij} = 0$). Ela é perfeitamente simétrica ($A = A^T$) devido à bidirecionalidade do fluxo de pedestres, e tem traço nulo ($\operatorname{tr}(A) = 0$), comprovando que não existem auto-laços.*
  > * **Matriz de Custos $W_{4 \times 4}$:** Contém os pesos em metros e penalidades. Nós sem conexão recebem peso $\infty$ (infinito).*
  > * **Aplicação em Ciência da Computação:** O **Algoritmo de Dijkstra** utiliza essa matriz para calcular o menor caminho. Se o critério for apenas distância geométrica bruta, o algoritmo escolheria $P_1 \to P_2$ ($55\text{ m}$). Contudo, atribuindo peso infinito às barreiras intransponíveis para cadeirantes, o algoritmo recalcula e converge para a rota acessível $P_3 \to P_4 \to P_2$, totalizando **116 metros** ($101\text{ m} + 15\text{ m}$) 100% nivelada."*

### Momento 6: Conclusão (1 minuto)
* **Falas sugeridas:**
  > *"O projeto comprova que a Geometria Analítica e a Álgebra Linear formam a base indispensável para sistemas de navegação GPS, mobilidade inclusiva e otimização de rotas em cidades inteligentes. Muito obrigado!"*

---

## 3. Memorial de Cálculo e Dedução Matemática

### 3.1 Coleta de Coordenadas Geodésicas
Coordenadas obtidas via posicionamento GNSS e validadas sobre imagens de satélite ortorretificadas (WGS84):

| Vértice | Ponto Notável | Latitude ($\phi$) | Longitude ($\lambda$) |
| :---: | :--- | :---: | :---: |
| **$P_1$** | Início Trajeto Amarelo (R. Eduardo Luiz Gomes) | $-22,8950692^\circ$ | $-43,1204342^\circ$ |
| **$P_2$** | Pórtico de Entrada (Campus Estácio Niterói I) | $-22,8953000^\circ$ | $-43,1202050^\circ$ |
| **$P_3$** | Início Trajeto Azul (Esq. R. Jorn. Alberto de Andrade) | $-22,8951895^\circ$ | $-43,1194569^\circ$ |
| **$P_4$** | Rampa Lateral de Serviço (Entrada da Garagem) | $-22,8954039^\circ$ | $-43,1200459^\circ$ |

---

### 3.2 Projeção Cartesiana Equirretangular Local
Para converter as coordenadas angulares $(\phi, \lambda)$ em distâncias métricas locais $(\Delta x, \Delta y)$, adota-se o raio esférico médio da Terra:
$$R = 6.371.000\text{ m}$$

Fórmula de conversão para radianos:
$$\text{rad}(\theta) = \theta \times \frac{\pi}{180}$$

Dadas as posições $(\phi_1, \lambda_1)$ e $(\phi_2, \lambda_2)$:
* **Latitude média:** $\phi_m = \frac{\phi_1 + \phi_2}{2}$
* **Deslocamento Leste-Oeste ($\Delta x$):**
  $$\Delta x = R \cdot \cos(\phi_m) \cdot (\lambda_2 - \lambda_1)_{\text{rad}}$$
* **Deslocamento Norte-Sul ($\Delta y$):**
  $$\Delta y = R \cdot (\phi_2 - \phi_1)_{\text{rad}}$$

---

### 3.3 Vetores de Deslocamento e Equações das Retas

#### Trajeto 01 (Amarelo: $P_1 \to P_2$)
* $\Delta \phi = -22,8953000^\circ - (-22,8950692^\circ) = -0,0002308^\circ$
* $\Delta \lambda = -43,1202050^\circ - (-43,1204342^\circ) = +0,0002292^\circ$
* $\phi_m = -22,8951846^\circ \implies \cos(\phi_m) \approx 0,921206$

Cálculo dos componentes métricos:
$$\Delta x = 6.371.000 \cdot 0,921206 \cdot \left(0,0002292 \cdot \frac{\pi}{180}\right) = +23,20\text{ m}$$
$$\Delta y = 6.371.000 \cdot \left(-0,0002308 \cdot \frac{\pi}{180}\right) = -23,08\text{ m}$$

Vetor cartesiano:
$$\vec{v}_1 = 23,20\,\hat{i} - 23,08\,\hat{j}\text{ (m)}$$

Módulo euclidiano direto:
$$\|\vec{v}_1\| = \sqrt{(23,20)^2 + (-23,08)^2} = \sqrt{538,24 + 532,69} = \sqrt{1070,93} \approx 32,72\text{ m}$$

Coeficiente angular da reta suporte e direção:
$$m = \frac{\Delta y}{\Delta x} = \frac{-23,08}{23,20} \approx -0,9948 \approx -0,99$$
$$\theta = \operatorname{atan2}(-23,08;\, 23,20) = -44,85^\circ \equiv 315,15^\circ \approx 315,1^\circ\text{ (Sudeste)}$$

---

#### Trajeto 02 (Azul: $P_3 \to P_4$)
* $\Delta \phi = -22,8954039^\circ - (-22,8951895^\circ) = -0,0002144^\circ$
* $\Delta \lambda = -43,1200459^\circ - (-43,1194569^\circ) = -0,0005890^\circ$
* $\phi_m = -22,8952967^\circ \implies \cos(\phi_m) \approx 0,921205$

Cálculo dos componentes métricos:
$$\Delta x = 6.371.000 \cdot 0,921205 \cdot \left(-0,0005890 \cdot \frac{\pi}{180}\right) = -48,90\text{ m}$$
$$\Delta y = 6.371.000 \cdot \left(-0,0002144 \cdot \frac{\pi}{180}\right) = -21,44\text{ m}$$

Vetor cartesiano:
$$\vec{v}_2 = -48,90\,\hat{i} - 21,44\,\hat{j}\text{ (m)}$$

Módulo euclidiano direto:
$$\|\vec{v}_2\| = \sqrt{(-48,90)^2 + (-21,44)^2} = \sqrt{2391,21 + 459,67} = \sqrt{2850,88} \approx 53,38\text{ m}$$

Coeficiente angular da reta suporte e direção:
$$m = \frac{\Delta y}{\Delta x} = \frac{-21,44}{-48,90} \approx +0,4384 \approx 0,44$$
$$\theta = \operatorname{atan2}(-21,44;\, -48,90) = -156,32^\circ \equiv 203,68^\circ \approx 203,7^\circ\text{ (Sudoeste)}$$

---

### 3.4 Distância Euclidiana Direta vs. Extensão Real (Haversine)
A fórmula de **Haversine** calcula a distância ortodrômica na esfera:
$$a = \sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)$$
$$d = 2R \cdot \operatorname{atan2}\left(\sqrt{a},\, \sqrt{1-a}\right)$$

Comparativo entre linha reta teórica e percurso pedestre real:

| Trajeto | Distância Reta ($\|\vec{v}\|$) | Extensão Real no Chão | Fator de Desvio | Motivo do Desvio |
| :---: | :---: | :---: | :---: | :--- |
| **Trajeto 01 (Amarelo)** | $32,72\text{ m}$ | **$54,96\text{ m}$** | $+67,9\%$ | Desnível, curvas da passarela e degraus do pátio |
| **Trajeto 02 (Azul)** | $53,38\text{ m}$ | **$100,56\text{ m}$** | $+88,4\%$ | Contorno obrigatório pelas vias urbanas laterais |

---

### 3.5 Álgebra Linear: Grafo e Matriz de Adjacência A
Definindo o grafo $G = (V, E)$ com os 4 nós:
* $P_1$: Início Amarelo
* $P_2$: Pórtico Campus
* $P_3$: Início Azul
* $P_4$: Rampa Lateral

Regra da Matriz de Adjacência $A \in \{0, 1\}^{4 \times 4}$:
$$A_{ij} = \begin{cases} 1, & \text{se existe conexão direta entre } P_i \text{ e } P_j \\ 0, & \text{caso contrário} \end{cases}$$

$$A = \begin{bmatrix}
0 & 1 & 0 & 0 \\
1 & 0 & 0 & 1 \\
0 & 0 & 0 & 1 \\
0 & 1 & 1 & 0
\end{bmatrix}$$

**Propriedades Demonstradas:**
1. **Simetria ($A = A^T$):** Como os caminhos são de mão dupla para pedestres, $A_{ij} = A_{ji}$.
2. **Diagonal Principal Nula:** $\forall i, A_{ii} = 0$, pois não há laços de auto-conexão.
3. **Grau dos Vértices ($\operatorname{grau}(P_i) = \sum_j A_{ij}$):**
   * $\operatorname{grau}(P_1) = 1$ (vértice periférico de entrada)
   * $\operatorname{grau}(P_2) = 2$ (nó conector central: pórtico)
   * $\operatorname{grau}(P_3) = 1$ (vértice periférico externo)
   * $\operatorname{grau}(P_4) = 2$ (nó conector: rampa e garagem)

---

### 3.6 Matriz de Custos W e Algoritmo de Menor Caminho (Dijkstra)
A matriz de pesos $W \in \mathbb{R}^{4 \times 4}$ associa o custo em metros a cada aresta:
$$W_{ij} = \begin{cases}
0, & \text{se } i = j \\
\text{distância (m)}, & \text{se } (i, j) \in E \\
\infty, & \text{se não há passagem direta}
\end{cases}$$

$$W = \begin{bmatrix}
0 & 55 & \infty & \infty \\
55 & 0 & \infty & 15 \\
\infty & \infty & 0 & 101 \\
\infty & 15 & 101 & 0
\end{bmatrix}$$

#### Execução Computacional do Algoritmo de Dijkstra:
* **Origem:** Vias de acesso públicas
* **Destino:** Pórtico Central ($P_2$)

1. **Análise por Distância Métrica Pura (Sem filtro de acessibilidade):**
   $$\text{Caminho: } P_1 \to P_2 \implies \text{Custo Total} = 55\text{ m}$$
   * *Diagnóstico:* Menor distância, porém contém escadarias. Custo de acessibilidade para cadeirantes = $\infty$.

2. **Análise Ponderada com Filtro NBR 9050 (Acessibilidade Plena):**
   Definindo a aresta com degraus como intransponível ($W_{12} = \infty$), o algoritmo avalia os nós adjacentes:
   * Relaxamento de $P_3 \to P_4$: Custo acumulado = $101\text{ m}$.
   * Relaxamento de $P_4 \to P_2$: Custo acumulado = $101\text{ m} + 15\text{ m} = 116\text{ m}$.
   $$\text{Caminho Ótimo Acessível: } P_3 \to P_4 \to P_2 \implies \text{Custo Total} = 116\text{ m}$$
   * *Diagnóstico:* Trajeto contínuo, em rampa e totalmente navegável de forma autônoma.

---

## 4. Diagnóstico de Campo e Propostas de Intervenção

| Barreira Observada | Impacto nos Usuários | Norma NBR 9050 | Proposta de Melhoria |
| :--- | :--- | :--- | :--- |
| **Declividade Acentuada no Entorno** | Dificulta propulsão de cadeiras de rodas e marcha de idosos | Item 6.3: Inclinação máxima de 8,33% para rampas | Instalação de corrimãos duplos contínuos nas calçadas de aproximação |
| **Degraus na Entrada Principal ($P_1 \to P_2$)** | Impede acesso de cadeirantes ao hall | Item 6.10: Desníveis devem ser vencidos por rampa ou equipamento | Implantação de **plataforma elevatória vertical** no hall frontal |
| **Vãos Longitudinais em Grelhas de Água** | Travamento de rodas dianteiras e bengalas | Item 6.1.2: Vãos transversais de no máximo 12 mm | Substituição por grelhas com ranhuras perpendiculares ao fluxo |
| **Desníveis em Sanitários** | Bloqueio de entrada autônoma de cadeirantes | Item 7.3: Soleiras niveladas (tolerância máx. 5 mm chanfrada) | Regularização e eliminação de ressaltos em todas as portas de sanitários |
| **Obstáculos Aéreos sem Alerta Tátil** | Risco de colisão na altura da cabeça para cegos | Item 5.4.3: Elementos suspensos exigem demarcação no piso | Instalação de piso tátil de alerta sob extintores e caixas suspensas |

---

## 5. Estrutura do Sistema Web

* `index.html`: Arquitetura semântica contendo mapa interativo, galeria de fotos ampliáveis (modal), bloco de modelagem matemática compacta e tabelas expansíveis.
* `style.css`: Folha de estilo responsiva com suporte a **Modo Claro / Modo Escuro**, tipografia técnica (`Barlow Condensed` e `Source Sans 3`), tabelas matriciais customizadas com chips de vértices e valores destacados.
* `script.js`: Motor geoespacial em JavaScript com biblioteca **Leaflet.js**, cálculo trigonométrico de vetores, equações de retas e fórmula de Haversine.
* `theme.js`: Controle de persistência de tema (Dark/Light Mode) com salvamento em `localStorage`.
* `/img`: Diretório com acervo fotográfico original levantado em campo.

---

## 6. Referências Bibliográficas

1. **ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS (ABNT).** *NBR 9050: Acessibilidade a edificações, mobiliário, espaços e equipamentos urbanos*. Rio de Janeiro: ABNT, 2020.
2. **STEINBRUCH, Alfredo; WINTERLE, Paulo.** *Geometria Analítica*. São Paulo: Pearson Makron Books, 1987.
3. **BOLDRINI, José Luiz et al.** *Álgebra Linear*. 3. ed. São Paulo: Harper & Row do Brasil, 1980.
4. **CORMEN, Thomas H. et al.** *Algoritmos: Teoria e Prática (Algoritmo de Dijkstra e Grafos)*. 3. ed. Rio de Janeiro: Elsevier, 2012.
5. **OPENSTREETMAP CONTRIBUTORS.** *Planet dump [Data file from Estácio Niterói Campus I]*. Disponível em: https://www.openstreetmap.org.
