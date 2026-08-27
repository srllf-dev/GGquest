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
  const botaoAdicionar = document.querySelector(".botao-adicionar");
  const formularioJogo = document.querySelector("#formulario-jogo");
  const campoNomeJogo = document.querySelector("#nome-jogo");
  const botaoCancelar = document.querySelector(".botao-cancelar");
  const botaoFecharFormulario = document.querySelector(".botao-fechar-formulario");
  const controleNota = document.querySelector("#nota-jogo");
  const notaDigitada = document.querySelector("#nota-digitada");

function limitarNota(valor) {
  const nota = Number(valor);

  if (!Number.isFinite(nota)) {
    return 0;
  }

  return Math.min(10, Math.max(0, nota));
}

function atualizarBarra(valor) {
  const nota = limitarNota(valor);

  controleNota.value = nota;
  controleNota.style.setProperty("--progresso", `${nota * 10}%`);
}

controleNota.addEventListener("input", () => {
  notaDigitada.value = Number(controleNota.value).toFixed(1);
  atualizarBarra(controleNota.value);
});

notaDigitada.addEventListener("input", () => {
  if (notaDigitada.value === "") {
    atualizarBarra(0);
    return;
  }

  atualizarBarra(notaDigitada.value);
});

notaDigitada.addEventListener("blur", () => {
  const nota = limitarNota(notaDigitada.value);

  notaDigitada.value = nota.toFixed(1);
  atualizarBarra(nota);
});

atualizarBarra(controleNota.value);

botaoAdicionar.addEventListener("click", () => {
  formularioJogo.hidden = false;
  campoNomeJogo.focus();
});

function fecharFormulario() {
  formularioJogo.hidden = true;
  formularioJogo.reset();
}

botaoCancelar.addEventListener("click", fecharFormulario);
botaoFecharFormulario.addEventListener("click", fecharFormulario);

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
