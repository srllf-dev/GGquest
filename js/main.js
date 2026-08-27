// main.js
// Ponto de entrada: conecta os outros módulos.

document.addEventListener("DOMContentLoaded", () => {
  console.log("GGquest carregado.");
});


import { jogos } from "./data.js";

import { renderizarJogos } from "./ui.js";

renderizarJogos(jogos);
