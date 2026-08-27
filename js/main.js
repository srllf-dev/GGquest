// main.js
// Ponto de entrada: conecta os outros módulos.

document.addEventListener("DOMContentLoaded", () => {
  console.log("GGquest carregado.");
});


import { jogos } from "./data.js";

jogos.forEach(jogo => {
    console.log(jogo.nome);
    console.log(jogo.genero);
    console.log(jogo.nota);
});

let html  = '';

jogos.forEach(jogo => {
  html += `<p>${jogo.nome} - ${jogo.genero} - Nota: ${jogo.nota}</p>`;
})

document.querySelector("jogos-lista").innerHTML = html;
