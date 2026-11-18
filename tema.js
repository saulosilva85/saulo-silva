// Modo claro/escuro: lembra a escolha do visitante e, na primeira visita,
// segue a preferência do sistema operacional.
(function () {
  var tema;
  try { tema = localStorage.getItem("tema"); } catch (e) {}
  if (tema !== "claro" && tema !== "escuro") {
    tema = window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
  }
  document.documentElement.setAttribute("data-tema", tema);

  function atualizarBotao(botao) {
    var escuro = document.documentElement.getAttribute("data-tema") === "escuro";
    botao.textContent = escuro ? "☀️ Modo claro" : "🌙 Modo escuro";
    botao.setAttribute("aria-label", escuro ? "Mudar para modo claro" : "Mudar para modo escuro");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var botao = document.querySelector(".tema-botao");
    if (!botao) return;
    atualizarBotao(botao);
    botao.addEventListener("click", function () {
      var novo = document.documentElement.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
      document.documentElement.setAttribute("data-tema", novo);
      try { localStorage.setItem("tema", novo); } catch (e) {}
      atualizarBotao(botao);
    });
  });
})();
