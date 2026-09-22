// Comportamento mínimo do site: menu no celular, cabeçalho ao rolar e entrada suave das seções.
// Sem bibliotecas nem chamadas externas.
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var burger = document.querySelector(".burger");
  var menu = document.getElementById("menu");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function fecharMenu() {
    document.body.classList.remove("nav-open");
    if (burger) { burger.setAttribute("aria-expanded", "false"); burger.setAttribute("aria-label", "Abrir menu"); }
  }
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var aberto = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", aberto ? "true" : "false");
      burger.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) fecharMenu(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharMenu(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 1080) fecharMenu(); });
  }

  var itens = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    itens.forEach(function (el) { el.classList.add("in"); });
    return;
  }
  var obs = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  itens.forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 80 + "ms";
    obs.observe(el);
  });
})();
