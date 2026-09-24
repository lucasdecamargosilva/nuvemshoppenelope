/*
 * Provou Levou — carregador do provador (Nuvemshop Scripts API, app 25651).
 * Sobe UMA vez no Portal de Parceiros. Ele só carrega o widget da loja, que
 * mora no GitHub Pages — atualizar o widget não exige mexer aqui.
 *
 * Qual widget carregar:
 *  1) query param "w" definido por loja no POST /scripts (query_params),
 *     ex.: {"w":"nuvemshoppenelope/widget-penelope.js"}
 *  2) fallback: mapa por id da loja (LS.store.id) abaixo.
 * Só aceita caminhos "repo/arquivo.js" dentro de lucasdecamargosilva.github.io.
 */
(function () {
    try {
        if (window.__PL_LOADER__) return;
        window.__PL_LOADER__ = true;

        // o provador só existe em página de produto: não pesa o resto da loja
        if (!/\/produtos?\//.test(window.location.pathname)) return;

        var MAPA = {
            4310239: 'nuvemshoppenelope/widget-penelope.js' // Penélope Cabelos
        };

        var w = '';
        var s = document.currentScript;
        if (s && s.src) {
            try { w = new URL(s.src).searchParams.get('w') || ''; } catch (e) {}
        }
        if (!w && window.LS && window.LS.store) w = MAPA[window.LS.store.id] || '';
        if (!/^[a-z0-9-]+\/[a-z0-9-]+\.js$/i.test(w)) return;

        var t = document.createElement('script');
        t.src = 'https://lucasdecamargosilva.github.io/' + w;
        t.async = true;
        (document.head || document.documentElement).appendChild(t);
    } catch (e) {}
})();
