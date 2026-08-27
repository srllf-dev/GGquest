import { STATUS_EXIBICAO } from "./data.js";
export function renderizarJogos(jogos) {
  let html  = '';

  jogos.forEach(jogo => {
      html += `
  <div class="jogo-card">
    <span class="jogo-status">${STATUS_EXIBICAO[jogo.status]}</span>
    <h3 class="jogo-nome">${jogo.nome}</h3>
    <p class="jogo-genero">${jogo.genero}</p>
    <p class="jogo-nota">${jogo.nota}</p>
    <p class="jogo-favorito">${jogo.favorito ? "❤️": ""}</p>
  </div>
`;
  });

    document.querySelector("#jogos-lista").innerHTML = html;
}
