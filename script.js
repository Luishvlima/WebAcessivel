// ============================================================
// GEO-ACESSÍVEL | ESTÁCIO NITERÓI
// Projeto: Geometria Analítica & Álgebra Linear na Mobilidade
// Ciência da Computação
// ============================================================

// 1. INICIALIZAÇÃO DO MAPA LEAFLET COM ZOOM TRAVADO
const COORD_CAMPUS_ESTACIO = [-22.89515, -43.11995];
const ZOOM_PADRAO = 19;
const mapa = L.map("mapa", {
    center: COORD_CAMPUS_ESTACIO,
    zoom: ZOOM_PADRAO,
    minZoom: ZOOM_PADRAO,
    maxZoom: ZOOM_PADRAO,
    zoomControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    boxZoom: false,
    keyboard: false
});

// 2. CAMADAS DE MAPA PÚBLICAS E ABERTAS (SEM API KEY E SEM BLOQUEIO 403)
// O OpenStreetMap Humanitarian (HOT) é 100% público e gratuito, exibindo as ruas, esquinas e calçadas de Niterói
const camadaOSMHot = L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles: <a href="https://www.hotosm.org/">HOT</a>',
    subdomains: 'abc',
    maxZoom: 19
});

const camadaEsriRuas = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    attribution: 'Tiles &copy; Esri &mdash; Street Map',
    maxZoom: 19
});

const camadaEsriSatelite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    attribution: 'Tiles &copy; Esri &mdash; Satélite Real',
    maxZoom: 19
});

// Define HOT como padrão
camadaOSMHot.addTo(mapa);

const mapasBase = {
    "Mapa Urbano Detalhado (HOT)": camadaOSMHot,
    "Visão Topográfica (Esri)": camadaEsriRuas,
    "Satélite de Alta Resolução (Esri)": camadaEsriSatelite
};
L.control.layers(mapasBase, null, { position: "topright" }).addTo(mapa);

// 3. MEDIDAS DOS PERCURSOS PRINCIPAIS LEVANTADOS (100% ALINHADOS ÀS VIAS REAIS)
const distanciasPercursos = {
    amarelo: 54.96, // Trajeto 01 (Amarelo): Alinhado exatamente ao caminho de pedestres oficial (54,96 m)
    azul: 100.56    // Trajeto 02 (Azul): Rua Alberto de Andrade -> Tv. Henrique Kopke -> Rampa lateral (100,56 m)
};

// 4. BASE DE DADOS DOS PONTOS DE INTERESSE
const pontos = [
    {
        id: 1,
        nome: "Início Trajeto Amarelo — Calçada Rua Eduardo Luiz Gomes",
        latitude: -22.8950692,
        longitude: -43.1204342,
        tipo: "Acesso Principal",
        acesso: "amarelo",
        categoria: "acesso",
        descricao: "Ponto inicial na calçada da Rua Eduardo Luiz Gomes, alinhado à passagem de pedestres.",
        acessibilidade: "Acesso direto pela calçada com descida ao pátio e conexão ao pórtico.",
        foto: "img/corredor_terreo_entrada.jpg"
    },
    {
        id: 2,
        nome: "Chegada Trajeto Amarelo — Entrada Estácio Campus Niterói I",
        latitude: -22.8953000,
        longitude: -43.1202050,
        tipo: "Pórtico / Entrada",
        acesso: "amarelo",
        categoria: "acessivel",
        descricao: "Entrada principal no saguão e pórtico da Estácio - Campus Niterói I.",
        acessibilidade: "Acesso principal ao prédio da faculdade.",
        foto: "img/escadaria_patamar.jpg"
    },
    {
        id: 3,
        nome: "Início Trajeto Azul — Rua Eduardo Luiz Gomes esq. Alberto de Andrade",
        latitude: -22.8951895,
        longitude: -43.1194569,
        tipo: "Esquina / Via Lateral",
        acesso: "azul",
        categoria: "rota_externa",
        descricao: "Esquina da Rua Eduardo Luiz Gomes com a Rua Jornalista Alberto de Andrade.",
        acessibilidade: "Calçada pública de acesso às vias laterais.",
        foto: "img/bifurcacao_rampa_veiculos.jpg"
    },
    {
        id: 4,
        nome: "Chegada Trajeto Azul — Rampa de Acesso Lateral do Campus",
        latitude: -22.8954039,
        longitude: -43.1200459,
        tipo: "Acesso Lateral / Fundos",
        acesso: "azul",
        categoria: "rota_externa",
        descricao: "Ponto final do traçado na rampa de serviço/acesso lateral após a Travessa Henrique Kopke.",
        acessibilidade: "Trecho em via compartilhada com circulação contínua.",
        foto: "img/rampa_ziguezague.jpg"
    },
    {
        id: 5,
        nome: "Portaria e Catraca Acessível",
        latitude: -22.8953300,
        longitude: -43.1202050,
        tipo: "Controle de Acesso",
        acesso: "interno",
        categoria: "acessivel",
        descricao: "Recepção e catraca PCD alargada no hall de entrada do campus.",
        acessibilidade: "Piso nivelado com linha guia podotátil direcionando aos ambientes principais.",
        foto: "img/corredor_terreo_entrada.jpg"
    },
    {
        id: 6,
        nome: "Pátio Central & Marquise",
        latitude: -22.8952124,
        longitude: -43.1202800,
        tipo: "Circulação & Convivência",
        acesso: "interno",
        categoria: "acessivel",
        descricao: "Área central de distribuição e convivência sob a marquise externa.",
        acessibilidade: "Piso plano, iluminação adequada e circulação desobstruída.",
        foto: "img/patio_central_marquise.jpg"
    },
    {
        id: 7,
        nome: "Elevador Acessível Térreo",
        latitude: -22.8953600,
        longitude: -43.1201700,
        tipo: "Mobilidade Vertical",
        acesso: "interno",
        categoria: "acessivel",
        descricao: "Elevador adaptado ligando o térreo aos pavimentos superiores do prédio.",
        acessibilidade: "Sinalização tátil no chão, botoeiras em Braille e aviso sonoro de pavimentos.",
        foto: "img/elevador_terreo_tatil.jpg"
    },
    {
        id: 8,
        nome: "Sanitário Adaptado PCD",
        latitude: -22.8953800,
        longitude: -43.1202400,
        tipo: "Serviço Acessível",
        acesso: "interno",
        categoria: "acessivel",
        descricao: "Banheiro adaptado unissex com barras de apoio laterais e porta dimensionada.",
        acessibilidade: "Em conformidade com a NBR 9050 para manobra de cadeira de rodas.",
        foto: "img/banheiro_desnivel_porta.jpg"
    },
    {
        id: 9,
        nome: "Totem com Mapa Tátil Oficial (Braille)",
        latitude: -22.8953150,
        longitude: -43.1201750,
        tipo: "Orientação Sensorial",
        acesso: "interno",
        categoria: "acessivel",
        descricao: "Placa em relevo tridimensional com a planta do campus e legendas em Braille.",
        acessibilidade: "Permite a pessoas cegas ou com baixa visão a memorização de rotas e salas.",
        foto: "img/mapa_tatil_oficial.jpg"
    },
    {
        id: 10,
        nome: "Acesso Térreo B & Laboratórios",
        latitude: -22.8954200,
        longitude: -43.1202800,
        tipo: "Ambiente Acadêmico",
        acesso: "interno",
        categoria: "acessivel",
        descricao: "Corredor de acesso aos laboratórios de computação e informática do polo.",
        acessibilidade: "Portas largas e circulação plana sem degraus.",
        foto: "img/acesso_terreob_laboratorios.jpg"
    }
];

// 5. ELEMENTOS DO DOM
const campoOrigem = document.getElementById("origem");
const campoDestino = document.getElementById("destino");
const botaoBuscarRota = document.getElementById("buscarRota");
const elementoResultado = document.getElementById("resultado");
const listaObstaculos = document.getElementById("listaObstaculos");
const listaSolucoes = document.getElementById("listaSolucoes");
const modalFoto = document.getElementById("modalFoto");
const modalFotoImg = document.getElementById("modalFotoImg");
const modalFotoLegenda = document.getElementById("modalFotoLegenda");
const botaoFecharModal = document.getElementById("modalFechar");

const btnRotaAcessivel = document.getElementById("btnRotaAcessivel");
const btnRotaEscada = document.getElementById("btnRotaEscada");
const btnLimparRotas = document.getElementById("btnLimparRotas");
const btnTogglePontosInternos = document.getElementById("btnTogglePontosInternos");

// 6. FUNÇÕES AUXILIARES DE FORMATAÇÃO E CÁLCULO
function temCoordenadas(ponto) {
    return ponto && Number.isFinite(ponto.latitude) && Number.isFinite(ponto.longitude);
}

function formatarMetros(valor) {
    if (!Number.isFinite(valor)) return "Não disponível";
    return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " m";
}

function formatarCoordenada(valor) {
    return Number.isFinite(valor) ? valor.toFixed(7) : "Não disponível";
}

function formatarNumero(valor) {
    if (!Number.isFinite(valor)) return "0,00";
    return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function escaparHTML(texto) {
    return String(texto ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
}

// 7. MOTOR DE GEOMETRIA ANALÍTICA
function calcularVetor(origem, destino) {
    if (!temCoordenadas(origem) || !temCoordenadas(destino)) return null;

    const RAIO_TERRA = 6371000; // Raio médio da Terra em metros
    const rad = valor => valor * Math.PI / 180;

    const lat1 = rad(origem.latitude);
    const lat2 = rad(destino.latitude);
    const dLat = lat2 - lat1;
    const dLon = rad(destino.longitude - origem.longitude);
    const latMedia = (lat1 + lat2) / 2;

    const x = RAIO_TERRA * Math.cos(latMedia) * dLon;
    const y = RAIO_TERRA * dLat;
    const modulo = Math.sqrt(x ** 2 + y ** 2);

    const anguloRadianos = Math.atan2(y, x);
    const anguloGraus = (anguloRadianos * 180 / Math.PI + 360) % 360;
    const m = Math.abs(x) > 0.0001 ? (y / x) : null;

    return { x, y, modulo, anguloGraus, m };
}

function calcularDistanciaHaversine(lat1, lon1, lat2, lon2) {
    const RAIO_TERRA = 6371000;
    const rad = valor => valor * Math.PI / 180;
    const dLat = rad(lat2 - lat1);
    const dLon = rad(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return RAIO_TERRA * c;
}

function calcularDadosGeometricos(origem, destino) {
    const vetor = calcularVetor(origem, destino);
    if (!vetor) return null;
    return {
        vetor,
        distanciaGeografica: calcularDistanciaHaversine(origem.latitude, origem.longitude, destino.latitude, destino.longitude)
    };
}

// 8. ÍCONES PERSONALIZADOS
function criarIconeMarcador(simbolo, corFundo, corBorda, tamanho = 36) {
    return L.divIcon({
        className: "marcador-geo",
        html: `
            <div style="
                background: ${corFundo};
                border: 3px solid ${corBorda};
                color: #ffffff;
                width: ${tamanho}px;
                height: ${tamanho}px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 800;
                font-size: ${Math.round(tamanho * 0.45)}px;
                box-shadow: 0 1px 4px rgba(15, 33, 46, 0.2);
                box-sizing: border-box;
            ">
                <span>${simbolo}</span>
            </div>
        `,
        iconSize: [tamanho, tamanho],
        iconAnchor: [tamanho / 2, tamanho / 2],
        popupAnchor: [0, -(tamanho / 2 + 2)]
    });
}

const iconeEscadaria = criarIconeMarcador("1", "#d97706", "#92400e", 38);
const iconeRampa = criarIconeMarcador("2", "#2563eb", "#1d4ed8", 38);
const iconePontoA = criarIconeMarcador("A", "#254f6b", "#173b54", 36);
const iconePontoB = criarIconeMarcador("B", "#946819", "#755011", 36);

const iconesInternos = {
    elevador: criarIconeMarcador("E", "#193649", "#364f5e", 28),
    banheiro: criarIconeMarcador("WC", "#193649", "#364f5e", 28),
    totem: criarIconeMarcador("⠃", "#193649", "#364f5e", 28),
    laboratorio: criarIconeMarcador("L", "#193649", "#364f5e", 28),
    geral: criarIconeMarcador("•", "#193649", "#364f5e", 26)
};

// 9. COORDENADAS REAIS DOS DOIS TRAJETOS (100% ALINHADAS AO MAPEAMENTO OFICIAL)
const COORDENADAS_TRAJETO_AMARELO = [
    [-22.8950692, -43.1204342], // Início na Rua Eduardo Luiz Gomes (alinhado à passagem de pedestres)
    [-22.8950987, -43.1204546], // Descida pelo corredor da calçada
    [-22.8951528, -43.1204752], // Acesso ao pátio
    [-22.8952074, -43.1204982], // Esquina do prédio
    [-22.8952124, -43.1203702], // Trecho horizontal pelo pátio
    [-22.8952330, -43.1201999], // Alinhamento da entrada
    [-22.8952579, -43.1202026], // Entrada no pórtico
    [-22.8953000, -43.1202050]  // Chegada: Entrada Estácio Campus Niterói I
];

const COORDENADAS_TRAJETO_AZUL = [
    [-22.8951895, -43.1194569], // Início na Rua Eduardo Luiz Gomes esq. Alberto de Andrade
    [-22.8952725, -43.1194659], // Rua Jornalista Alberto de Andrade
    [-22.8955591, -43.1195092], // Esquina com Travessa Henrique Kopke
    [-22.8955305, -43.1196821], // Travessa Henrique Kopke
    [-22.8954950, -43.1199063], // Travessa Henrique Kopke
    [-22.8954664, -43.1199528], // Curva no final da travessa
    [-22.8954434, -43.1200085], // Início da subida pela rampa de acesso
    [-22.8954133, -43.1200377], // Subida diagonal em direção ao campus
    [-22.8954039, -43.1200459]  // Ponto final: Acesso lateral/fundos do campus
];

function criarPopupPonto(ponto) {
    if (!ponto) return "";
    const foto = ponto.foto
        ? `<img src="${ponto.foto}" alt="${escaparHTML(ponto.nome)}" width="400" height="300" loading="lazy">` : "";
    return `
        <div class="popup-ponto">
            <div class="popup-meta"><span>${escaparHTML(ponto.tipo)}</span><span>Ponto ${ponto.id}</span></div>
            <h4>${escaparHTML(ponto.nome)}</h4>${foto}
            <p>${escaparHTML(ponto.descricao)}</p>
            <div class="popup-observacao ${ponto.categoria === "degraus" ? "popup-observacao-barreira" : ""}">
                <strong>Acessibilidade:</strong> ${escaparHTML(ponto.acessibilidade)}
            </div>
            <p class="popup-coordenadas">${formatarCoordenada(ponto.latitude)}, ${formatarCoordenada(ponto.longitude)}</p>
            <div class="popup-acoes">
                <button type="button" class="selecionar-cadastrado" data-id="${ponto.id}" data-papel="A">Usar como origem</button>
                <button type="button" class="selecionar-cadastrado" data-id="${ponto.id}" data-papel="B">Usar como destino</button>
            </div>
        </div>
    `;
}

// Marcadores das Entradas
const pontoEntrada1 = pontos.find(p => p.id === 1);
const pontoEntrada2 = pontos.find(p => p.id === 3);

const marcadorEscadaria = L.marker([pontoEntrada1.latitude, pontoEntrada1.longitude], {
    icon: iconeEscadaria,
    title: pontoEntrada1.nome,
    alt: pontoEntrada1.nome,
    zIndexOffset: 600
}).addTo(mapa);
marcadorEscadaria.bindPopup(criarPopupPonto(pontoEntrada1));

const marcadorRampa = L.marker([pontoEntrada2.latitude, pontoEntrada2.longitude], {
    icon: iconeRampa,
    title: pontoEntrada2.nome,
    alt: pontoEntrada2.nome,
    zIndexOffset: 600
}).addTo(mapa);
marcadorRampa.bindPopup(criarPopupPonto(pontoEntrada2));

// Traçados reais no mapa com cores e estilos idênticos ao levantamento
const linhaPercursoEscadaria = L.polyline(COORDENADAS_TRAJETO_AMARELO, {
    color: "#d97706",
    weight: 5,
    dashArray: "8, 6",
    opacity: 0.95
}).addTo(mapa);
linhaPercursoEscadaria.bindTooltip("Trajeto 01 (Amarelo): Acesso Campus I — 54,96 m", { sticky: true });

const linhaPercursoRampa = L.polyline(COORDENADAS_TRAJETO_AZUL, {
    color: "#2563eb",
    weight: 5,
    opacity: 0.95
}).addTo(mapa);
linhaPercursoRampa.bindTooltip("Trajeto 02 (Azul): Tv. Henrique Kopke & Rampa — 100,56 m", { sticky: true });

// Rótulos e enquadramento automático
function configurarRotulosEntradas() {
    const permanente = mapa.getSize().x >= 600;
    if (marcadorEscadaria) {
        marcadorEscadaria.unbindTooltip().bindTooltip("Trajeto Amarelo (54,96 m)", {
            permanent: permanente, direction: "top", offset: [0, -22],
            className: "etiqueta-entrada-faculdade"
        });
    }
    if (marcadorRampa) {
        marcadorRampa.unbindTooltip().bindTooltip("Trajeto Azul (100,56 m)", {
            permanent: permanente, direction: "bottom", offset: [0, 22],
            className: "etiqueta-entrada-faculdade"
        });
    }
}

function ajustarMapaAcessos(camada = null) {
    const limites = camada && camada.getBounds && camada.getBounds().isValid()
        ? camada.getBounds()
        : linhaPercursoEscadaria.getBounds().extend(linhaPercursoRampa.getBounds());
    if (limites && limites.isValid && limites.isValid()) {
        mapa.panTo(limites.getCenter(), { animate: false });
    } else {
        mapa.setView(COORD_CAMPUS_ESTACIO, ZOOM_PADRAO);
    }
}

// 10. CAMADA DE PONTOS INTERNOS (DESATIVADA POR ENQUANTO CONFORME SOLICITADO)
const camadaPontosInternos = L.layerGroup();
let pontosInternosVisiveis = false;

// 11. CONTROLE DE SELEÇÃO INTERATIVA A E B
let pontoA = null;
let pontoB = null;
let marcadorA = null;
let marcadorB = null;
let linhaAB = null;
let selecaoPendente = null;

let camadaRotaAcessivel = null;
let camadaRotaEscada = null;

function limparMarcadorSelecao(papel) {
    if (papel === "A" && marcadorA) {
        mapa.removeLayer(marcadorA);
        marcadorA = null;
    }
    if (papel === "B" && marcadorB) {
        mapa.removeLayer(marcadorB);
        marcadorB = null;
    }
}

function limparLinhaAB() {
    if (linhaAB) {
        mapa.removeLayer(linhaAB);
        linhaAB = null;
    }
}

function definirPontoSelecao(papel, ponto) {
    if (!temCoordenadas(ponto)) {
        alert("O ponto selecionado não possui coordenadas válidas.");
        return;
    }

    limparMarcadorSelecao(papel);
    limparLinhaAB();

    const dadosPonto = {
        id: ponto.id ?? null,
        nome: ponto.nome || `Ponto ${papel} no mapa`,
        latitude: ponto.latitude,
        longitude: ponto.longitude
    };

    if (papel === "A") {
        pontoA = dadosPonto;
        marcadorA = L.marker([ponto.latitude, ponto.longitude], {
            icon: iconePontoA,
            zIndexOffset: 1000
        }).addTo(mapa);
        marcadorA.bindTooltip(`Ponto A: ${escaparHTML(dadosPonto.nome)}`, { direction: "top", offset: [0, -20] });
    } else if (papel === "B") {
        pontoB = dadosPonto;
        marcadorB = L.marker([ponto.latitude, ponto.longitude], {
            icon: iconePontoB,
            zIndexOffset: 1000
        }).addTo(mapa);
        marcadorB.bindTooltip(`Ponto B: ${escaparHTML(dadosPonto.nome)}`, { direction: "top", offset: [0, -20] });
    }

    if (pontoA && pontoB) {
        executarCalculoGeometrico();
    } else {
        mostrarInstrucoesSelecao();
    }
}

function solicitarConfirmacaoPonto(papel, ponto, latlng) {
    selecaoPendente = { papel, ponto };

    L.popup({ closeButton: true, autoClose: true, maxWidth: 280 })
        .setLatLng(latlng)
        .setContent(`
            <div class="confirmacao-ponto">
                <h4>Definir Ponto ${papel}</h4>
                <p>
                    <strong>${escaparHTML(ponto.nome)}</strong><br>
                    <span class="popup-coordenadas">${formatarCoordenada(ponto.latitude)}, ${formatarCoordenada(ponto.longitude)}</span>
                </p>
                <div class="popup-acoes">
                    <button type="button" class="confirmar-selecao" data-papel="${papel}">
                        Confirmar
                    </button>
                    <button type="button" class="cancelar-selecao">
                        Cancelar
                    </button>
                </div>
            </div>
        `)
        .openOn(mapa);
}

mapa.on("click", function(e) {
    const papel = !pontoA ? "A" : (!pontoB ? "B" : "A");
    const novoPonto = {
        nome: "Local selecionado no mapa",
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
    };
    solicitarConfirmacaoPonto(papel, novoPonto, e.latlng);
});

// 12. EXECUÇÃO DOS CÁLCULOS DE GEOMETRIA ANALÍTICA
function executarCalculoGeometrico() {
    if (!pontoA || !pontoB || !elementoResultado) return;
    limparLinhaAB();
    const dados = calcularDadosGeometricos(pontoA, pontoB);
    if (!dados) return;
    const vetor = dados.vetor;
    linhaAB = L.polyline(
        [[pontoA.latitude, pontoA.longitude], [pontoB.latitude, pontoB.longitude]],
        { color: "#287783", weight: 4, dashArray: "6, 8", opacity: 0.95 }
    ).addTo(mapa);
    linhaAB.bindTooltip(`Segmento AB: ${formatarMetros(dados.distanciaGeografica)}`, { sticky: true });
    let equacaoRetaStr = "Reta vertical (m → ∞)";
    if (vetor.m !== null) {
        const intercepto = vetor.y - vetor.m * vetor.x;
        equacaoRetaStr = `y = ${formatarNumero(vetor.m)}x ${intercepto >= 0 ? "+" : "-"} ${formatarNumero(Math.abs(intercepto))}`;
    }
    elementoResultado.innerHTML = `
        <div class="resultado-cabecalho"><h3>Deslocamento de A até B</h3><span class="estado-calculo">Cálculo concluído</span></div>
        <div class="resultado-pontos">
            <div><strong>Origem / ponto A</strong><p>${escaparHTML(pontoA.nome)}</p>
                <small>${formatarCoordenada(pontoA.latitude)}, ${formatarCoordenada(pontoA.longitude)}</small></div>
            <div><strong>Destino / ponto B</strong><p>${escaparHTML(pontoB.nome)}</p>
                <small>${formatarCoordenada(pontoB.latitude)}, ${formatarCoordenada(pontoB.longitude)}</small></div>
        </div>
        <div class="resultado-distancia"><span>Distância geodésica entre os pontos</span>
            <strong>${formatarMetros(dados.distanciaGeografica)}</strong>
            <p>Calculada por Haversine. O módulo do vetor abaixo usa a projeção no plano local.</p>
        </div>
        <dl class="resultado-componentes">
            <div><dt>Δx / leste–oeste</dt><dd>${formatarMetros(vetor.x)}</dd></div>
            <div><dt>Δy / norte–sul</dt><dd>${formatarMetros(vetor.y)}</dd></div>
            <div><dt>Módulo do vetor</dt><dd>${formatarMetros(vetor.modulo)}</dd></div>
            <div><dt>Ângulo / azimute</dt><dd>${formatarNumero(vetor.anguloGraus)}°</dd></div>
        </dl>
        <div class="resultado-equacao"><strong>Equação da reta no plano local</strong><code>${equacaoRetaStr}</code></div>
        <button type="button" id="novoCalculo" class="btn-limpar">Limpar seleção</button>
    `;
    elementoResultado.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "nearest"
    });
}

function mostrarInstrucoesSelecao() {
    if (!elementoResultado) return;
    elementoResultado.innerHTML = `
        <div class="instrucoes-calculo">
            <h3>Compare dois pontos do campus</h3>
            <p>Escolha uma origem e um destino nos campos acima ou diretamente no mapa. O cálculo mostra o deslocamento em metros e a equação da reta.</p>
            <ul><li><strong>Origem:</strong> ${pontoA ? escaparHTML(pontoA.nome) : "aguardando seleção"}</li>
                <li><strong>Destino:</strong> ${pontoB ? escaparHTML(pontoB.nome) : "aguardando seleção"}</li></ul>
        </div>
    `;
}

function limparSelecaoCompleta() {
    limparMarcadorSelecao("A");
    limparMarcadorSelecao("B");
    limparLinhaAB();
    pontoA = null;
    pontoB = null;
    selecaoPendente = null;
    mapa.closePopup();
    [campoOrigem, campoDestino].forEach(campo => {
        if (!campo) return;
        campo.value = "";
        campo.removeAttribute("aria-invalid");
        campo.removeAttribute("aria-describedby");
    });
    mostrarInstrucoesSelecao();
}

// 13. ROTAS PRÉ-CALCULADAS (aguardando novos pontos para traçado)
const COORDENADAS_ROTA_ACESSIVEL = COORDENADAS_TRAJETO_AMARELO;
const COORDENADAS_ROTA_ESCADARIA = COORDENADAS_TRAJETO_AZUL;

function exibirRotaAcessivel() {
    limparRotasNoMapa();
    camadaRotaAcessivel = L.polyline(COORDENADAS_ROTA_ACESSIVEL, {
        color: "#d97706", weight: 6, dashArray: "8, 6", opacity: 0.95, lineCap: "round", lineJoin: "round"
    }).addTo(mapa);
    camadaRotaAcessivel.bindTooltip("Trajeto 01 (Amarelo) — 54,96 m", { sticky: true });
    ajustarMapaAcessos(camadaRotaAcessivel);
    btnRotaAcessivel?.classList.add("ativo");
    btnRotaAcessivel?.setAttribute("aria-pressed", "true");
    const status = document.getElementById("statusMapa");
    if (status) status.textContent = "Em destaque: Trajeto Amarelo (Acesso Principal Rua Eduardo Luiz Gomes até entrada do Campus I), 54,96 m.";
    if (elementoResultado) {
        elementoResultado.innerHTML = `
            <div class="resultado-rota resultado-rota-rampa">
                <span class="estado-calculo">Trajeto 01 (Amarelo)</span>
                <h3>Acesso Rua Eduardo Luiz Gomes até Entrada Campus I</h3>
                <p>Percurso 100% alinhado à passagem de pedestres oficial, descendo pelo corredor da calçada, contornando o pátio e alcançando a entrada principal da Estácio.</p>
                <div class="resultado-distancia"><strong>54,96 m</strong><span>distância geodésica recalculada</span></div>
            </div>
        `;
    }
}

function exibirRotaEscadaria() {
    limparRotasNoMapa();
    camadaRotaEscada = L.polyline(COORDENADAS_ROTA_ESCADARIA, {
        color: "#2563eb", weight: 6, opacity: 0.95, lineCap: "round", lineJoin: "round"
    }).addTo(mapa);
    camadaRotaEscada.bindTooltip("Trajeto 02 (Azul) — 100,56 m", { sticky: true });
    ajustarMapaAcessos(camadaRotaEscada);
    btnRotaEscada?.classList.add("ativo");
    btnRotaEscada?.setAttribute("aria-pressed", "true");
    const status = document.getElementById("statusMapa");
    if (status) status.textContent = "Em destaque: Trajeto Azul (R. Eduardo Luiz Gomes -> R. Alberto de Andrade -> Tv. Henrique Kopke -> Rampa lateral), 100,56 m.";
    if (elementoResultado) {
        elementoResultado.innerHTML = `
            <div class="resultado-rota resultado-rota-escada">
                <span class="estado-calculo">Trajeto 02 (Azul)</span>
                <h3>Rua Alberto de Andrade, Tv. Henrique Kopke & Rampa</h3>
                <p>Percurso completo contornando a quadra pela via lateral, Travessa Henrique Kopke e subindo pela via de serviço até a lateral do campus.</p>
                <div class="resultado-distancia"><strong>100,56 m</strong><span>distância geodésica recalculada</span></div>
            </div>
        `;
    }
}

function limparRotasNoMapa() {
    if (camadaRotaAcessivel) {
        mapa.removeLayer(camadaRotaAcessivel);
        camadaRotaAcessivel = null;
    }
    if (camadaRotaEscada) {
        mapa.removeLayer(camadaRotaEscada);
        camadaRotaEscada = null;
    }
    if (btnRotaAcessivel) { btnRotaAcessivel.classList.remove("ativo"); btnRotaAcessivel.setAttribute("aria-pressed", "false"); }
    if (btnRotaEscada) { btnRotaEscada.classList.remove("ativo"); btnRotaEscada.setAttribute("aria-pressed", "false"); }
}

// 14. MATRIZES DE ADJACÊNCIA E CUSTOS PONDERADOS
const verticesGrafo = [
    { id: 1, rotulo: "Início Amarelo (R. Eduardo Luiz Gomes)" },
    { id: 2, rotulo: "Chegada Amarelo (Pórtico Campus I)" },
    { id: 3, rotulo: "Início Azul (Esq. Alberto de Andrade)" },
    { id: 4, rotulo: "Esquina Tv. Henrique Kopke" },
    { id: 5, rotulo: "Rampa Lateral (Final Azul)" },
    { id: 6, rotulo: "Elevador PCD / Saguão" }
];

const matrizAdjacencia = [
    [ 0, 1, 0, 0, 0, 0 ],
    [ 1, 0, 0, 0, 0, 1 ],
    [ 0, 0, 0, 1, 0, 0 ],
    [ 0, 0, 1, 0, 1, 0 ],
    [ 0, 0, 0, 1, 0, 1 ],
    [ 0, 1, 0, 0, 1, 0 ]
];

const matrizCustosPCD = [
    [ "0",   "55m", "-",   "-",   "-",    "-" ],
    [ "55m", "0",   "-",   "-",   "-",   "10m" ],
    [ "-",   "-",   "0",  "41m",  "-",    "-" ],
    [ "-",   "-",  "41m", "0",   "59m",   "-" ],
    [ "-",   "-",   "-",  "59m",  "0",   "15m" ],
    [ "-",  "10m",  "-",   "-",  "15m",   "0" ]
];

function renderizarTabelaMatriz(containerId, dadosMatriz, rotulos, ehCustos = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `<table class="tabela-matriz"><caption>${ehCustos ? "Custos de passagem. ∞ indica bloqueio para cadeira de rodas." : "Conexões diretas. 1 indica passagem; 0 indica ausência de conexão."}</caption><thead><tr><th scope="col">Pontos</th>`;
    rotulos.forEach(r => {
        html += `<th scope="col">${escaparHTML(r.rotulo)}</th>`;
    });
    html += `</tr></thead><tbody>`;

    dadosMatriz.forEach((linha, i) => {
        html += `<tr><th scope="row" class="th-vert">${escaparHTML(rotulos[i].rotulo)}</th>`;
        linha.forEach((val, j) => {
            let classe = "";
            if (i === j) classe = "celula-diagonal";
            else if (val === 1 || (ehCustos && val !== "-" && val !== "∞" && val !== "0")) classe = "celula-conexao";
            else if (val === "∞") classe = "celula-bloqueada";
            else classe = "celula-vazia";

            html += `<td class="${classe}">${val}</td>`;
        });
        html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;
}

// 15. SELETORES DE PONTOS (Focados nos pontos dos trajetos)
function preencherSeletores() {
    if (!campoOrigem || !campoDestino) return;

    campoOrigem.innerHTML = '<option value="">Selecione a origem…</option>';
    campoDestino.innerHTML = '<option value="">Selecione o destino…</option>';

    pontos.filter(p => p.id <= 4).forEach(p => {
        const opt1 = document.createElement("option");
        opt1.value = p.id;
        opt1.textContent = `#${p.id} — ${p.nome}`;
        campoOrigem.appendChild(opt1);

        const opt2 = document.createElement("option");
        opt2.value = p.id;
        opt2.textContent = `#${p.id} — ${p.nome}`;
        campoDestino.appendChild(opt2);
    });
}

// 16. CATÁLOGO DE BARREIRAS E PROPOSTAS DO LEVANTAMENTO PRÓPRIO
const obstaculos = [
    {
        titulo: "Declividade Crítica e Ruas Muito Íngremes no Entorno",
        descricao: "Ladeiras com inclinação acentuada nas vias públicas de aproximação ao campus, exigindo esforço físico extremo e gerando risco de tombamento ou perda de tração de cadeiras de rodas."
    },
    {
        titulo: "Sanitários Inacessíveis com Ressalto na Soleira e Falta de Espaço de Giro",
        descricao: "Portas de sanitários com ressalto no piso que trava cadeiras de rodas, raio de giro interno inferior a 1,50 m e falta de barras de apoio adequadas para transferência autônoma (NBR 9050)."
    },
    {
        titulo: "Desníveis no Pátio e Degraus no Acesso Direto",
        descricao: "Acesso pelo Trajeto Amarelo (54,96 m) possui desníveis pontuais, enquanto a rota alternativa do Trajeto Azul exige contornar 100,56 metros pelas vias públicas e rampa de serviço."
    },
    {
        titulo: "Desnível com Grelha Metálica na Passagem",
        descricao: "Grelhas de escoamento pluvial no piso com espaçamento superior a 15 mm que podem travar rodas de cadeiras de rodas e ponteiras de bengalas."
    },
    {
        titulo: "Obstáculos Aéreos e Projeções Laterais nos Corredores",
        descricao: "Presença de extintores e suportes metálicos afixados abaixo de 2,10 m de altura sem sinalização tátil de alerta no piso para pessoas com deficiência visual."
    },
    {
        titulo: "Rampa com Tráfego Compartilhado de Veículos",
        descricao: "Acesso lateral utilizado simultaneamente por pedestres e automóveis para a garagem, exigindo segregação física e faixa podotátil contínua."
    }
];

const solucoes = [
    {
        titulo: "Reforma e Adequação Total dos Sanitários PCD (NBR 9050)",
        descricao: "Eliminação de soleiras com rampa de transição nivelada, portas alargadas para 90 cm com puxador horizontal e barras de apoio normatizadas para transferência segura."
    },
    {
        titulo: "Adequação do Acesso Direto com Rampa Acessível no Pátio",
        descricao: "Eliminar a necessidade de contorno externo de 100,56 metros pela Travessa Henrique Kopke através do nivelamento completo da rota direta de 54,96 m."
    },
    {
        titulo: "Adequação de Grelhas e Desníveis de Piso (NBR 9050)",
        descricao: "Substituição de grelhas pluviais por modelos com ranhuras perpendiculares ao fluxo e abertura máxima de 12 mm para tráfego seguro."
    },
    {
        titulo: "Continuidade da Rota Podotátil de Alerta e Direcional",
        descricao: "Interligação da rota podotátil desde a calçada externa até o totem do Mapa Tátil, catracas, elevador e sanitários adaptados."
    },
    {
        titulo: "Sinalização Visual e Tátil com Símbolo Internacional de Acesso (SIA)",
        descricao: "Instalação de placas indicativas no início da calçada orientando pedestres com mobilidade reduzida sobre o trajeto acessível antes da escadaria."
    }
];

function renderizarListas() {
    if (listaObstaculos) {
        listaObstaculos.innerHTML = obstaculos.map(o => `
            <article class="card-intervencao card-intervencao-barreira">
                <h3>⚠ ${escaparHTML(o.titulo)}</h3>
                <p>${escaparHTML(o.descricao)}</p>
            </article>
        `).join("");
    }

    if (listaSolucoes) {
        listaSolucoes.innerHTML = solucoes.map(s => `
            <article class="card-intervencao card-intervencao-solucao">
                <h3>✓ ${escaparHTML(s.titulo)}</h3>
                <p>${escaparHTML(s.descricao)}</p>
            </article>
        `).join("");
    }
}

// 17. MODAL LIGHTBOX PARA FOTOS
let ultimoBotaoFoto = null;
let estadoFundoModal = new Map();

function configurarModalFotos() {
    document.querySelectorAll(".abrir-foto").forEach(botao => {
        botao.addEventListener("click", () => {
            const img = botao.querySelector("img");
            const registro = botao.closest("article");
            const legenda = registro?.querySelector(".legenda-foto-evidencia strong") || registro?.querySelector("h3");
            if (!img || !modalFoto || !modalFotoImg || !modalFotoLegenda) return;
            ultimoBotaoFoto = botao;
            modalFotoImg.src = img.src;
            modalFotoImg.alt = img.alt;
            modalFotoLegenda.textContent = legenda ? legenda.textContent : img.alt;
            estadoFundoModal = new Map();
            Array.from(document.body.children).forEach(elemento => {
                if (elemento !== modalFoto && elemento.tagName !== "SCRIPT") {
                    estadoFundoModal.set(elemento, elemento.inert);
                    elemento.inert = true;
                }
            });
            modalFoto.hidden = false;
            modalFoto.classList.add("aberto");
            document.body.classList.add("foto-aberta");
            botaoFecharModal?.focus();
        });
    });
    botaoFecharModal?.addEventListener("click", fecharModal);
    modalFoto?.addEventListener("click", evento => {
        if (evento.target === modalFoto) fecharModal();
    });
    window.addEventListener("keydown", evento => {
        if (!modalFoto || modalFoto.hidden) return;
        if (evento.key === "Escape") fecharModal();
        if (evento.key === "Tab") {
            evento.preventDefault();
            botaoFecharModal?.focus();
        }
    });
}
function fecharModal() {
    if (!modalFoto || modalFoto.hidden) return;
    modalFoto.classList.remove("aberto");
    modalFoto.hidden = true;
    document.body.classList.remove("foto-aberta");
    estadoFundoModal.forEach((inert, elemento) => { elemento.inert = inert; });
    estadoFundoModal.clear();
    ultimoBotaoFoto?.focus();
}

function configurarIndice() {
    const links = Array.from(document.querySelectorAll(".links-nav a"));
    const secoes = links.map(link => document.querySelector(link.hash));
    const nav = document.querySelector(".barra-navegacao");
    let agendado = false;
    function atualizar() {
        agendado = false;
        const limite = nav.getBoundingClientRect().bottom + 110;
        const posicoes = secoes.map(secao => secao.getBoundingClientRect().top);
        let atual = 0;
        posicoes.forEach((posicao, indice) => { if (posicao <= limite) atual = indice; });
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) atual = links.length - 1;
        links.forEach((link, indice) => {
            if (indice === atual) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
        });
    }
    function agendar() {
        if (agendado) return;
        agendado = true;
        window.requestAnimationFrame(atualizar);
    }
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    atualizar();
}

// 18. EVENT LISTENERS
document.addEventListener("click", function(e) {
    const el = e.target;

    const btnCadastrado = el.closest(".selecionar-cadastrado");
    if (btnCadastrado) {
        e.preventDefault();
        const id = Number(btnCadastrado.dataset.id);
        const papel = btnCadastrado.dataset.papel;
        const ponto = pontos.find(p => p.id === id);
        if (ponto) {
            mapa.closePopup();
            definirPontoSelecao(papel, ponto);
        }
        return;
    }

    const btnConfirmar = el.closest(".confirmar-selecao");
    if (btnConfirmar) {
        e.preventDefault();
        if (selecaoPendente) {
            definirPontoSelecao(selecaoPendente.papel, selecaoPendente.ponto);
            selecaoPendente = null;
            mapa.closePopup();
        }
        return;
    }

    const btnCancelar = el.closest(".cancelar-selecao");
    if (btnCancelar) {
        e.preventDefault();
        selecaoPendente = null;
        mapa.closePopup();
        return;
    }

    if (el.closest("#novoCalculo")) {
        e.preventDefault();
        limparSelecaoCompleta();
        campoOrigem?.focus();
        return;
    }
});

if (btnRotaAcessivel) btnRotaAcessivel.addEventListener("click", exibirRotaAcessivel);
if (btnRotaEscada) btnRotaEscada.addEventListener("click", exibirRotaEscadaria);
if (btnLimparRotas) btnLimparRotas.addEventListener("click", () => {
    limparRotasNoMapa();
    limparSelecaoCompleta();
    ajustarMapaAcessos();
    const status = document.getElementById("statusMapa");
    if (status) status.textContent = "Traçados em destaque e seleção de pontos limpos.";
});

if (botaoBuscarRota) {
    botaoBuscarRota.addEventListener("click", () => {
        [campoOrigem, campoDestino].forEach(campo => {
            campo?.removeAttribute("aria-invalid");
            campo?.removeAttribute("aria-describedby");
        });
        const idA = Number(campoOrigem?.value);
        const idB = Number(campoDestino?.value);

        if (!idA || !idB) {
            if (elementoResultado) elementoResultado.innerHTML = '<p class="erro-calculo">Escolha uma origem e um destino antes de calcular.</p>';
            const campo = !idA ? campoOrigem : campoDestino;
            campo?.setAttribute("aria-invalid", "true");
            campo?.setAttribute("aria-describedby", "resultado");
            campo?.focus();
            return;
        }

        if (idA === idB) {
            if (elementoResultado) elementoResultado.innerHTML = '<p class="erro-calculo">Escolha um destino diferente da origem para calcular o deslocamento.</p>';
            campoDestino?.setAttribute("aria-invalid", "true");
            campoDestino?.setAttribute("aria-describedby", "resultado");
            campoDestino?.focus();
            return;
        }

        const pA = pontos.find(p => p.id === idA);
        const pB = pontos.find(p => p.id === idB);

        if (pA && pB) {
            definirPontoSelecao("A", pA);
            definirPontoSelecao("B", pB);
        }
    });
}

// 19. INICIALIZAÇÃO
preencherSeletores();
renderizarListas();
// Matrizes desativadas temporariamente conforme solicitado
// renderizarTabelaMatriz("tabelaMatrizAdjacencia", matrizAdjacencia, verticesGrafo, false);
// renderizarTabelaMatriz("tabelaMatrizCustos", matrizCustosPCD, verticesGrafo, true);
configurarModalFotos();
configurarIndice();
configurarRotulosEntradas();
ajustarMapaAcessos();
mostrarInstrucoesSelecao();
mapa.on("resize", () => {
    configurarRotulosEntradas();
    ajustarMapaAcessos(camadaRotaAcessivel || camadaRotaEscada);
});

window.addEventListener("load", () => {
    setTimeout(() => mapa.invalidateSize(), 300);
});
