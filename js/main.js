import { carregarJogos, salvarJogos } from "./data.js";
import { renderizarJogos } from "./ui.js";

let jogos = carregarJogos();
let filtroAtivo = "todos";
let termoBusca = "";

function atualizarLista() {
  let jogosFiltrados = jogos.map((jogo, indice) => ({
    ...jogo,
    indice
  }));

  if (filtroAtivo !== "todos") {
    jogosFiltrados = jogosFiltrados.filter(
      (jogo) => jogo.status === filtroAtivo
    );
  }

  jogosFiltrados = jogosFiltrados.filter((jogo) =>
    jogo.nome.toLowerCase().includes(termoBusca)
  );

  renderizarJogos(jogosFiltrados);
}

document.addEventListener("DOMContentLoaded", () => {
  const filtros = document.querySelectorAll(".filtro");
  const campoBusca = document.querySelector(".campo-busca");
  const listaJogos = document.querySelector("#jogos-lista");
  const botaoAdicionar = document.querySelector(".botao-adicionar");
  const formularioJogo = document.querySelector("#formulario-jogo");
  const campoNomeJogo = document.querySelector("#nome-jogo");
  const campoGeneroJogo = document.querySelector("#genero-jogo");
  const campoAnaliseJogo = document.querySelector("#analise-jogo");
  const campoFavoritoJogo = document.querySelector("#favorito-jogo");
  const botaoCancelar = document.querySelector(".botao-cancelar");
  const botaoFecharFormulario = document.querySelector(
    ".botao-fechar-formulario"
  );
  const botaoSalvar = document.querySelector(".botao-salvar");
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

  function fecharFormulario() {
    formularioJogo.hidden = true;
    formularioJogo.reset();
    notaDigitada.value = "0.0";
    atualizarBarra(0);
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

  botaoAdicionar.addEventListener("click", () => {
    formularioJogo.hidden = false;
    campoNomeJogo.focus();
  });

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

  botaoSalvar.addEventListener("click", () => {
    const nome = campoNomeJogo.value.trim();

    if (!nome) {
      campoNomeJogo.focus();
      return;
    }

    const statusSelecionado = document.querySelector(
      'input[name="status"]:checked'
    );

    const novoJogo = {
      nome,
      capa: "",
      genero: campoGeneroJogo.value.trim() || "Não informado",
      nota: Number(notaDigitada.value),
      status: statusSelecionado.value,
      favorito: campoFavoritoJogo.checked,
      tags: [],
      review: campoAnaliseJogo.value.trim(),
      dataInicio: null,
      dataConclusao: null,
      completoCem: false
    };

    jogos.push(novoJogo);
    salvarJogos(jogos);
    fecharFormulario();
    atualizarLista();
  });

  listaJogos.addEventListener("click", (evento) => {
    const botaoExcluir = evento.target.closest(".botao-excluir");

    if (!botaoExcluir) {
      return;
    }

    const indice = Number(botaoExcluir.dataset.indice);
    const jogo = jogos[indice];

    if (!jogo) {
      return;
    }

    const confirmou = window.confirm(
      `Excluir "${jogo.nome}" da sua Biblioteca?`
    );

    if (!confirmou) {
      return;
    }

    jogos.splice(indice, 1);
    salvarJogos(jogos);
    atualizarLista();
  });

  atualizarBarra(controleNota.value);
  atualizarLista();
});
