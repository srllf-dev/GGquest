import { STATUS_EXIBICAO } from "./data.js";
export function renderizarJogos(jogos) {
  if (jogos.length === 0) {
    document.querySelector("#jogos-lista").innerHTML =
      "<p>Nenhum jogo encontrado.</p>";

    return;
  }

  let html = "";

  jogos.forEach(jogo => {
      html += `
  <div class="jogo-card">
    <div class="jogo-capa-placeholder">
        <span>${jogo.nome}</span>
    </div>

    <span class="jogo-status">${STATUS_EXIBICAO[jogo.status]}</span>
    <h3 class="jogo-nome">${jogo.nome}</h3>
    <p class="jogo-genero">${jogo.genero}</p>
    <p class="jogo-nota">${jogo.nota}</p>
    <p class="jogo-favorito">${jogo.favorito ? "❤️": ""}</p>

    <div class="jogo-acoes">
      <button
        class="botao-excluir"
        type="button"
        data-indice="${jogo.indice}"
      >
        Excluir
      </button>
    </div>
  </div>
`;
  });

    document.querySelector("#jogos-lista").innerHTML = html;
}
