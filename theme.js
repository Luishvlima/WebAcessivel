// Mantém exclusivamente o modo escuro ativo em toda a plataforma
(() => {
    const raiz = document.documentElement;
    raiz.dataset.theme = "dark";
    try {
        window.localStorage.setItem("geo-acessivel-tema", "dark");
    } catch {}
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#0B0D10");
})();
