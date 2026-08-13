# 🎮 GGquest

> A Steam registra o que você joga. O GGquest registra sua jornada como jogador.

## O que é

GGquest é uma aplicação para registrar, avaliar e gamificar sua jornada pelos games — biblioteca + ranking pessoal (estilo IMDb) + quests + XP/níveis + conquistas + perfil.

Não é uma rede social nem concorrente da Steam.

## Áreas do produto

- 🏠 **Jornada** — resumo pessoal (nível, XP, estatísticas)
- 📚 **Biblioteca** — seus jogos, status, filtros
- 🏆 **Ranking** — ordenado por nota, desempate manual (nota maior sempre vence)
- 🗺️ **Quests** — quadro de missões, progresso, XP
- 🏅 **Conquistas** — badges, secretas, progresso
- 👤 **Perfil** — identidade gamer
- 🎮 **Página do jogo** — detalhe, acessado pela Biblioteca

## Status

🚧 Em desenvolvimento — V1

## Stack (V1)

- HTML5
- CSS3
- JavaScript puro (módulos ES)
- localStorage (persistência local)
- Fetch de uma API externa de jogos (depois que a lógica com dado fake estiver funcionando)

Banco de dados (SQL) só entra quando o localStorage não for mais suficiente (ex: perfil público, sincronização entre dispositivos). React e backend (Node + banco) ficam para versões futuras.

## Estrutura do projeto

```
GGquest/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── main.js       (ponto de entrada)
│   ├── data.js        (leitura/escrita no localStorage)
│   ├── library.js      (lógica da Biblioteca)
│   ├── ranking.js       (cálculo do ranking)
│   ├── quests.js         (lógica de quests/XP)
│   └── ui.js               (renderização/DOM)
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## Como rodar localmente

Abra o `index.html` no navegador ou use a extensão Live Server no VS Code. (Como usamos `type="module"`, alguns navegadores exigem servir os arquivos via um servidor local, em vez de abrir o `.html` direto do disco.)
