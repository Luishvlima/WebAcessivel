// Apply the theme before the stylesheet loads, independently of the map.
(() => {
    // Chave do localStorage atualizada para o projeto WebAcessibilidade
    const chave = "webacessibilidade-tema";
    const chaveAntiga = "geo-acessivel-tema";
    const raiz = document.documentElement;
    const preferenciaSistema = window.matchMedia("(prefers-color-scheme: dark)");
    let escolha = null;

    function temaValido(tema) {
        return tema === "light" || tema === "dark";
    }

    try {
        const salvo = window.localStorage.getItem(chave) || window.localStorage.getItem(chaveAntiga);
        if (temaValido(salvo)) escolha = salvo;
    } catch {
        // The toggle still works when browser storage is unavailable.
    }

    function aplicarTema() {
        const tema = escolha || (preferenciaSistema.matches ? "dark" : "light");
        raiz.dataset.theme = tema;
        document.querySelector('meta[name="theme-color"]')?.setAttribute(
            "content", tema === "dark" ? "#0B0D10" : "#ffffff"
        );
        document.getElementById("alternarTema")?.setAttribute(
            "aria-pressed", String(tema === "dark")
        );
    }

    aplicarTema();

    function configurarControle() {
        const botao = document.getElementById("alternarTema");
        if (!botao) return;
        aplicarTema();
        botao.addEventListener("click", () => {
            escolha = raiz.dataset.theme === "dark" ? "light" : "dark";
            aplicarTema();
            try {
                window.localStorage.setItem(chave, escolha);
            } catch {
                // Keep the current choice for this page if storage is blocked.
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", configurarControle, { once: true });
    } else {
        configurarControle();
    }

    preferenciaSistema.addEventListener("change", () => {
        if (!escolha) aplicarTema();
    });
    window.addEventListener("storage", evento => {
        if (evento.key !== chave && evento.key !== chaveAntiga && evento.key !== null) return;
        escolha = temaValido(evento.newValue) ? evento.newValue : null;
        aplicarTema();
    });
})();
