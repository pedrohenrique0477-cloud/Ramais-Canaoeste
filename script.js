// ===============================
// CONFIGURAÇÃO DO FIREBASE
// ===============================

const firebaseConfig = {
  apiKey: "AIzaSyBUsc9ZrkfKRaVDVM53ew1JnwbbH1_ARuQ",
  authDomain: "ramaiscanaoeste.firebaseapp.com",
  databaseURL: "https://ramaiscanaoeste-default-rtdb.firebaseio.com",
  projectId: "ramaiscanaoeste",
  storageBucket: "ramaiscanaoeste.firebasestorage.app",
  messagingSenderId: "1013260478239",
  appId: "1:1013260478239:web:4a7c90f17089313d61f22a"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const auth = firebase.auth();

const ramaisRef = db.ref("ramais_canaoeste");
const atualizacaoRef = db.ref("ultima_atualizacao_ramais");
const editoresRef = db.ref("editores");

// ===============================
// VARIÁVEIS
// ===============================

let dadosRamais = {};
let categoriasRecolhidas = {};
let termoBusca = "";
let podeEditar = false;

// ===============================
// ELEMENTOS
// ===============================

const areaRamais = document.getElementById("areaRamais");
const campoBusca = document.getElementById("campoBusca");

const btnAdicionarCategoria = document.getElementById("btnAdicionarCategoria");
const modalCategoria = document.getElementById("modalCategoria");
const nomeNovaCategoria = document.getElementById("nomeNovaCategoria");
const btnCancelarCategoria = document.getElementById("btnCancelarCategoria");
const btnSalvarCategoria = document.getElementById("btnSalvarCategoria");

const modalPessoa = document.getElementById("modalPessoa");
const tituloModalPessoa = document.getElementById("tituloModalPessoa");
const categoriaAtual = document.getElementById("categoriaAtual");
const pessoaIdAtual = document.getElementById("pessoaIdAtual");
const campoNome = document.getElementById("campoNome");
const campoRamal = document.getElementById("campoRamal");
const campoCargo = document.getElementById("campoCargo");
const campoCategoriaTexto = document.getElementById("campoCategoriaTexto");
const campoTipo = document.getElementById("campoTipo");
const campoObservacao = document.getElementById("campoObservacao");
const btnCancelarPessoa = document.getElementById("btnCancelarPessoa");
const btnSalvarPessoa = document.getElementById("btnSalvarPessoa");

const btnExpandirTudo = document.getElementById("btnExpandirTudo");
const btnRecolherTudo = document.getElementById("btnRecolherTudo");
const ultimaAtualizacao = document.getElementById("ultimaAtualizacao");
const toast = document.getElementById("toast");

const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const statusUsuario = document.getElementById("statusUsuario");

const modalLogin = document.getElementById("modalLogin");
const campoEmailLogin = document.getElementById("campoEmailLogin");
const campoSenhaLogin = document.getElementById("campoSenhaLogin");
const btnCancelarLogin = document.getElementById("btnCancelarLogin");
const btnEntrarLogin = document.getElementById("btnEntrarLogin");

// ===============================
// LOGIN E PERMISSÃO
// ===============================

auth.onAuthStateChanged(user => {
  podeEditar = false;

  if (!user) {
    aplicarModoConsulta();
    return;
  }

  editoresRef.child(user.uid).once("value").then(snapshot => {
    podeEditar = snapshot.val() === true;

    if (podeEditar) {
      aplicarModoEditor(user.email);
    } else {
      auth.signOut();
      aplicarModoConsulta();
      mostrarToast("Usuário sem permissão para editar.");
    }

    renderizarRamais();
  });
});

function aplicarModoEditor(email) {
  podeEditar = true;

  document.body.classList.add("modo-editor");

  statusUsuario.textContent = `Editor: ${email}`;
  statusUsuario.classList.add("editor");

  btnLogin.classList.add("escondido");
  btnLogout.classList.remove("escondido");

  renderizarRamais();
}

function aplicarModoConsulta() {
  podeEditar = false;

  document.body.classList.remove("modo-editor");

  statusUsuario.textContent = "Modo consulta";
  statusUsuario.classList.remove("editor");

  btnLogin.classList.remove("escondido");
  btnLogout.classList.add("escondido");

  renderizarRamais();
}

btnLogin.addEventListener("click", () => {
  campoEmailLogin.value = "";
  campoSenhaLogin.value = "";
  modalLogin.classList.add("aberto");
  campoEmailLogin.focus();
});

btnCancelarLogin.addEventListener("click", () => {
  modalLogin.classList.remove("aberto");
});

btnEntrarLogin.addEventListener("click", fazerLogin);

campoSenhaLogin.addEventListener("keydown", evento => {
  if (evento.key === "Enter") {
    fazerLogin();
  }
});

function fazerLogin() {
  const email = campoEmailLogin.value.trim();
  const senha = campoSenhaLogin.value;

  if (!email || !senha) {
    mostrarToast("Digite e-mail e senha.");
    return;
  }

  auth.signInWithEmailAndPassword(email, senha)
    .then(() => {
      modalLogin.classList.remove("aberto");
      mostrarToast("Login realizado.");
    })
    .catch(error => {
      console.error("Erro no login:", error.code, error.message);

      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
        mostrarToast("E-mail ou senha incorretos.");
        return;
      }

      if (error.code === "auth/user-not-found") {
        mostrarToast("Usuário não encontrado.");
        return;
      }

      if (error.code === "auth/invalid-email") {
        mostrarToast("E-mail inválido.");
        return;
      }

      if (error.code === "auth/too-many-requests") {
        mostrarToast("Muitas tentativas. Aguarde um pouco.");
        return;
      }

      mostrarToast("Erro ao fazer login.");
    });
}

btnLogout.addEventListener("click", () => {
  auth.signOut();
  mostrarToast("Você saiu da edição.");
});

// ===============================
// FIREBASE DADOS
// ===============================

ramaisRef.on("value", snapshot => {
  dadosRamais = snapshot.val() || {};
  renderizarRamais();
});

atualizacaoRef.on("value", snapshot => {
  const data = snapshot.val();

  if (!data) {
    ultimaAtualizacao.innerHTML = "Última atualização: ainda não registrada";
    return;
  }

  ultimaAtualizacao.innerHTML = `Última atualização: <strong>${formatarDataHora(data)}</strong>`;
});

// ===============================
// RENDERIZAÇÃO
// ===============================

function renderizarRamais() {
  areaRamais.innerHTML = "";

  const categorias = Object.keys(dadosRamais);

  if (categorias.length === 0) {
    areaRamais.innerHTML = `<p class="carregando">Nenhuma categoria cadastrada.</p>`;
    return;
  }

  const categoriasOrdenadas = ordenarCategorias(categorias);

  categoriasOrdenadas.forEach(categoria => {
    const pessoasObj = dadosRamais[categoria] || {};
    const pessoas = converterParaArray(pessoasObj);

    const pessoasFiltradas = pessoas.filter(pessoa => {
      const texto = `
        ${pessoa.nome || ""}
        ${pessoa.ramal || ""}
        ${pessoa.cargo || ""}
        ${pessoa.tipo || ""}
        ${pessoa.observacao || ""}
        ${categoria}
      `.toLowerCase();

      return texto.includes(termoBusca.toLowerCase());
    });

    if (termoBusca && pessoasFiltradas.length === 0) {
      return;
    }

    const card = document.createElement("article");
    card.className = "card-categoria";
    card.id = criarIdCategoria(categoria);

    if (categoria.toLowerCase() === "diretoria") {
      card.classList.add("diretoria");
    }

    const recolhida = categoriasRecolhidas[categoria] === true;
    const textoBotaoMostrar = recolhida ? "Mostrar" : "Ocultar";

    const botaoAdicionar = podeEditar
      ? `
        <button 
          class="btn-pequeno btn-adicionar-menor" 
          data-acao="adicionar" 
          data-categoria="${escaparHtml(categoria)}"
        >
          + Adicionar
        </button>
      `
      : "";

    card.innerHTML = `
      <div class="categoria-topo">
        <h2>${escaparHtml(categoria)}</h2>

        <div class="categoria-acoes">
          <button 
            class="btn-pequeno btn-mostrar-destaque" 
            data-acao="alternar" 
            data-categoria="${escaparHtml(categoria)}"
          >
            ${textoBotaoMostrar}
          </button>

          ${botaoAdicionar}
        </div>
      </div>

      <div class="conteudo-categoria" style="display: ${recolhida ? "none" : "block"}">
        ${montarTabela(categoria, pessoasFiltradas)}
      </div>
    `;

    areaRamais.appendChild(card);
  });

  if (areaRamais.innerHTML.trim() === "") {
    areaRamais.innerHTML = `<p class="carregando">Nenhum ramal encontrado na pesquisa.</p>`;
  }
}

function montarTabela(categoria, pessoas) {
  if (!pessoas || pessoas.length === 0) {
    return `<p class="sem-registros">Nenhum ramal cadastrado nesta categoria.</p>`;
  }

  const cabecalhoAcoes = podeEditar
    ? `<th class="col-acoes">Ações</th>`
    : "";

  const linhas = pessoas.map(pessoa => {
    const cargo = pessoa.cargo
      ? `<div class="cargo-pessoa">${escaparHtml(pessoa.cargo)}</div>`
      : `<div class="cargo-vazio">Sem função informada</div>`;

    const colunaAcoes = podeEditar
      ? `
        <td class="col-acoes">
          <div class="acoes-botoes">
            <button 
              class="btn-editar" 
              data-acao="editar" 
              data-categoria="${escaparHtml(categoria)}" 
              data-id="${escaparHtml(pessoa.id)}"
            >
              Editar
            </button>

            <button 
              class="btn-perigo" 
              data-acao="excluir" 
              data-categoria="${escaparHtml(categoria)}" 
              data-id="${escaparHtml(pessoa.id)}"
            >
              Excluir
            </button>
          </div>
        </td>
      `
      : "";

    return `
      <tr>
        <td class="col-ramal">${escaparHtml(pessoa.ramal || "")}</td>

        <td class="col-nome">
          <div class="nome-pessoa">${escaparHtml(pessoa.nome || "")}</div>
          ${pessoa.observacao ? `<div class="cargo-pessoa">${escaparHtml(pessoa.observacao)}</div>` : ""}
        </td>

        <td class="col-cargo">
          ${cargo}
        </td>

        <td class="col-tipo">
          <span class="tag-tipo">${escaparHtml(pessoa.tipo || "Fone")}</span>
        </td>

        ${colunaAcoes}
      </tr>
    `;
  }).join("");

  return `
    <div class="tabela-wrapper">
      <table class="tabela-ramais">
        <thead>
          <tr>
            <th class="col-ramal">Ramal</th>
            <th class="col-nome">Nome</th>
            <th class="col-cargo">Função / Cargo</th>
            <th class="col-tipo">Tipo</th>
            ${cabecalhoAcoes}
          </tr>
        </thead>

        <tbody>
          ${linhas}
        </tbody>
      </table>
    </div>
  `;
}

// ===============================
// CLIQUES
// ===============================

areaRamais.addEventListener("click", evento => {
  const botao = evento.target.closest("button");

  if (!botao) {
    return;
  }

  const acao = botao.dataset.acao;
  const categoria = botao.dataset.categoria;
  const id = botao.dataset.id;

  if (acao === "alternar") {
    alternarCategoria(categoria);
    return;
  }

  if (!podeEditar) {
    mostrarToast("Entre na área de edição para alterar.");
    return;
  }

  if (acao === "adicionar") {
    abrirModalAdicionarPessoa(categoria);
    return;
  }

  if (acao === "editar") {
    abrirModalEditarPessoa(categoria, id);
    return;
  }

  if (acao === "excluir") {
    excluirPessoa(categoria, id);
    return;
  }
});

// ===============================
// CATEGORIAS
// ===============================

btnAdicionarCategoria.addEventListener("click", () => {
  if (!podeEditar) {
    mostrarToast("Entre na área de edição para criar categorias.");
    return;
  }

  nomeNovaCategoria.value = "";
  modalCategoria.classList.add("aberto");
  nomeNovaCategoria.focus();
});

btnCancelarCategoria.addEventListener("click", () => {
  modalCategoria.classList.remove("aberto");
});

btnSalvarCategoria.addEventListener("click", () => {
  if (!podeEditar) {
    mostrarToast("Sem permissão para salvar.");
    return;
  }

  const nome = nomeNovaCategoria.value.trim();

  if (!nome) {
    mostrarToast("Digite o nome da categoria.");
    return;
  }

  if (dadosRamais[nome]) {
    mostrarToast("Essa categoria já existe.");
    return;
  }

  ramaisRef.child(nome).set({
    temporario: {
      nome: "Temporário",
      ramal: "000",
      cargo: "",
      tipo: "Fone",
      observacao: ""
    }
  }).then(() => {
    return ramaisRef.child(nome).child("temporario").remove();
  }).then(() => {
    registrarUltimaAtualizacao();
    modalCategoria.classList.remove("aberto");
    mostrarToast("Categoria criada.");
  }).catch(() => {
    mostrarToast("Erro: sem permissão.");
  });
});

// ===============================
// PESSOAS
// ===============================

function abrirModalAdicionarPessoa(categoria) {
  tituloModalPessoa.textContent = "Adicionar ramal";

  categoriaAtual.value = categoria;
  pessoaIdAtual.value = "";

  campoNome.value = "";
  campoRamal.value = "";
  campoCargo.value = "";
  campoCategoriaTexto.value = categoria;
  campoTipo.value = "Fone";
  campoObservacao.value = "";

  modalPessoa.classList.add("aberto");
  campoNome.focus();
}

function abrirModalEditarPessoa(categoria, pessoaId) {
  const pessoa = dadosRamais[categoria] && dadosRamais[categoria][pessoaId];

  if (!pessoa) {
    mostrarToast("Ramal não encontrado.");
    return;
  }

  tituloModalPessoa.textContent = "Editar ramal";

  categoriaAtual.value = categoria;
  pessoaIdAtual.value = pessoaId;

  campoNome.value = pessoa.nome || "";
  campoRamal.value = pessoa.ramal || "";
  campoCargo.value = pessoa.cargo || "";
  campoCategoriaTexto.value = categoria;
  campoTipo.value = pessoa.tipo || "Fone";
  campoObservacao.value = pessoa.observacao || "";

  modalPessoa.classList.add("aberto");
  campoNome.focus();
}

btnCancelarPessoa.addEventListener("click", () => {
  modalPessoa.classList.remove("aberto");
});

btnSalvarPessoa.addEventListener("click", () => {
  if (!podeEditar) {
    mostrarToast("Sem permissão para salvar.");
    return;
  }

  const categoria = categoriaAtual.value;
  const pessoaId = pessoaIdAtual.value;

  const pessoa = {
    nome: campoNome.value.trim(),
    ramal: campoRamal.value.trim(),
    cargo: campoCargo.value.trim(),
    tipo: campoTipo.value,
    observacao: campoObservacao.value.trim()
  };

  if (!pessoa.nome) {
    mostrarToast("Digite o nome.");
    return;
  }

  if (!pessoa.ramal) {
    mostrarToast("Digite o ramal.");
    return;
  }

  let acaoFirebase;

  if (pessoaId) {
    acaoFirebase = ramaisRef.child(categoria).child(pessoaId).update(pessoa);
  } else {
    acaoFirebase = ramaisRef.child(categoria).push(pessoa);
  }

  acaoFirebase.then(() => {
    registrarUltimaAtualizacao();

    if (pessoaId) {
      mostrarToast("Ramal atualizado.");
    } else {
      mostrarToast("Ramal adicionado.");
    }

    modalPessoa.classList.remove("aberto");
  }).catch(() => {
    mostrarToast("Erro: sem permissão.");
  });
});

function excluirPessoa(categoria, pessoaId) {
  const pessoa = dadosRamais[categoria] && dadosRamais[categoria][pessoaId];
  const nome = pessoa && pessoa.nome ? pessoa.nome : "este ramal";

  const confirmar = confirm(`Tem certeza que deseja excluir ${nome}?`);

  if (!confirmar) {
    return;
  }

  ramaisRef.child(categoria).child(pessoaId).remove().then(() => {
    registrarUltimaAtualizacao();
    mostrarToast("Ramal excluído.");
  }).catch(() => {
    mostrarToast("Erro: sem permissão.");
  });
}

// ===============================
// BUSCA E VISUALIZAÇÃO
// ===============================

campoBusca.addEventListener("input", () => {
  termoBusca = campoBusca.value.trim();
  renderizarRamais();
});

function alternarCategoria(categoria) {
  categoriasRecolhidas[categoria] = !categoriasRecolhidas[categoria];
  renderizarRamais();
}

btnExpandirTudo.addEventListener("click", () => {
  categoriasRecolhidas = {};
  renderizarRamais();
});

btnRecolherTudo.addEventListener("click", () => {
  Object.keys(dadosRamais).forEach(categoria => {
    categoriasRecolhidas[categoria] = true;
  });

  renderizarRamais();
});

// ===============================
// UTILITÁRIOS
// ===============================

function converterParaArray(obj) {
  if (Array.isArray(obj)) {
    return obj
      .filter(item => item && item.nome)
      .map((item, index) => ({
        id: String(index),
        ...item
      }));
  }

  return Object.keys(obj || {})
    .filter(id => obj[id] && obj[id].nome)
    .map(id => ({
      id,
      ...obj[id]
    }));
}

function ordenarCategorias(categorias) {
  return categorias.sort((a, b) => {
    const categoriaA = a.toLowerCase();
    const categoriaB = b.toLowerCase();

    if (categoriaA === "diretoria") return -1;
    if (categoriaB === "diretoria") return 1;

    if (categoriaA === "departamento técnico") return 1;
    if (categoriaB === "departamento técnico") return -1;

    return a.localeCompare(b, "pt-BR");
  });
}

function criarIdCategoria(categoria) {
  return "categoria-" + categoria
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-");
}

function mostrarToast(mensagem) {
  toast.textContent = mensagem;
  toast.classList.add("mostrar");

  setTimeout(() => {
    toast.classList.remove("mostrar");
  }, 2500);
}

function escaparHtml(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function registrarUltimaAtualizacao() {
  const agora = new Date().toISOString();
  return atualizacaoRef.set(agora);
}

function formatarDataHora(dataISO) {
  const data = new Date(dataISO);

  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

// ===============================
// FECHAR MODAIS CLICANDO FORA
// ===============================

modalCategoria.addEventListener("click", evento => {
  if (evento.target === modalCategoria) {
    modalCategoria.classList.remove("aberto");
  }
});

modalPessoa.addEventListener("click", evento => {
  if (evento.target === modalPessoa) {
    modalPessoa.classList.remove("aberto");
  }
});

modalLogin.addEventListener("click", evento => {
  if (evento.target === modalLogin) {
    modalLogin.classList.remove("aberto");
  }
});
const btnImprimir = document.getElementById("btnImprimir");

if (btnImprimir) {
  btnImprimir.addEventListener("click", () => {
    window.print();
  });
}