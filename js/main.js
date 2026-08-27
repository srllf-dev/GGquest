import { jogos } from "./data.js";
import { renderizarJogos } from "./ui.js";

let filtroAtivo = "todos";
let termoBusca = "";

function atualizarLista() {
  let jogosFiltrados =
    filtroAtivo === "todos"
      ? jogos
      : jogos.filter((jogo) => jogo.status === filtroAtivo);

  jogosFiltrados = jogosFiltrados.filter((jogo) =>
    jogo.nome.toLowerCase().includes(termoBusca)
  );

  renderizarJogos(jogosFiltrados);
}

document.addEventListener("DOMContentLoaded", () => {
  const filtros = document.querySelectorAll(".filtro");
  const campoBusca = document.querySelector(".campo-busca");

  filtros.forEach((filtro) => {
    filtro.addEventListener("click", () => {
      filtroAtivo = filtro.dataset.status;

      filtros.forEach((botao) => {
        botao.classList.remove("ativo");
      });

      filtro.classList.add("ativo");
      atualizarLista();
    });
  });

  campoBusca.addEventListener("input", (evento) => {
    termoBusca = evento.target.value.trim().toLowerCase();
    atualizarLista();
  });

  atualizarLista();
});
