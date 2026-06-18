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
// DADOS INICIAIS
// ===============================

const dadosIniciais = {
  "Diretoria": [
    { ramal: "1000", nome: "Fernando dos Reis", cargo: "Presidente", tipo: "Fone", observacao: "" },
    { ramal: "8001", nome: "Fernando dos Reis", cargo: "Presidente", tipo: "Móvel", observacao: "" },
    { ramal: "8002", nome: "Marco Guidi", cargo: "Vice-Presidente", tipo: "Fone", observacao: "" },
    { ramal: "101", nome: "Almir Torcato", cargo: "Gestor Corporativo", tipo: "Fone", observacao: "" },
    { ramal: "1001", nome: "Almir Torcato", cargo: "Gestor Corporativo", tipo: "Móvel", observacao: "" }
  ],

  "Soluções Integradas": [
    { ramal: "102", nome: "Thiago Silva", cargo: "Gestor Operacional", tipo: "Fone", observacao: "" },
    { ramal: "1002", nome: "Thiago Silva", cargo: "Gestor Operacional", tipo: "Móvel", observacao: "" }
  ],

  "Tecnologia da Informação": [
    { ramal: "103", nome: "Alessandro Costa", cargo: "Suporte Técnico", tipo: "Fone", observacao: "" },
    { ramal: "1004", nome: "Pedro Casalli", cargo: "Suporte Técnico", tipo: "Móvel", observacao: "" }
  ],

  "CanaoesteLab": [
    { ramal: "160", nome: "Lucas Teodoro", cargo: "Coordenador", tipo: "Fone", observacao: "" },
    { ramal: "161", nome: "Daniel Carvalho", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "161", nome: "Beatriz Danelon", cargo: "Analista", tipo: "Fone", observacao: "" }
  ],

  "Administrativo": [
    { ramal: "105", nome: "Edson Mussa", cargo: "Coordenador", tipo: "Fone", observacao: "" },
    { ramal: "1105", nome: "Edson Mussa", cargo: "Coordenador", tipo: "PC", observacao: "" },
    { ramal: "134", nome: "Júlia Perticarrari", cargo: "Jovem Aprendiz", tipo: "Fone", observacao: "" },
    { ramal: "106", nome: "Daiane Serafim", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "108", nome: "Gabriel Santos", cargo: "Recursos Humanos", tipo: "Fone", observacao: "" },
    { ramal: "1108", nome: "Gabriel Santos", cargo: "Recursos Humanos", tipo: "PC", observacao: "" },
    { ramal: "107", nome: "José Alberto", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "109", nome: "Ruth Neudielle", cargo: "Financeiro", tipo: "Fone", observacao: "" },
    { ramal: "1109", nome: "Ruth Neudielle", cargo: "Financeiro", tipo: "PC", observacao: "" }
  ],

  "Comunicação e Marketing": [
    { ramal: "110", nome: "Lucas Figueiredo", cargo: "Coordenador", tipo: "Fone", observacao: "" },
    { ramal: "1010", nome: "Lucas Figueiredo", cargo: "Coordenador", tipo: "Móvel", observacao: "" },
    { ramal: "111", nome: "Ludmila Haikal Rizzi", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "132", nome: "Ana Lívia", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "133", nome: "Kelvin Oliveira", cargo: "Jovem Aprendiz", tipo: "PC", observacao: "" }
  ],

  "CanaoesteBio": [
    { ramal: "151", nome: "André Volpe", cargo: "Gestor Operacional", tipo: "Fone", observacao: "" },
    { ramal: "1051", nome: "André Volpe", cargo: "Gestor Operacional", tipo: "Móvel", observacao: "" },
    { ramal: "1151", nome: "André Volpe", cargo: "Gestor Operacional", tipo: "PC", observacao: "" },
    { ramal: "150", nome: "Murilo Lopes", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "1150", nome: "Murilo Lopes", cargo: "", tipo: "PC", observacao: "" },
    { ramal: "1250", nome: "Murilo Lopes", cargo: "", tipo: "Móvel", observacao: "" },
    { ramal: "152", nome: "Maysa Corrêa", cargo: "Laboratório", tipo: "Fone", observacao: "" },
    { ramal: "156", nome: "Maysa Corrêa", cargo: "Laboratório", tipo: "Fone", observacao: "" },
    { ramal: "153", nome: "Sala de Reunião", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "154", nome: "Fábrica", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "155", nome: "Casa de Máquina", cargo: "", tipo: "Fone", observacao: "" }
  ],

  "Geotecnologia": [
    { ramal: "115", nome: "André Leite", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "116", nome: "Marcelo Pardinho", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "117", nome: "André Rafael", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "118", nome: "Lucas Meloni", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "119", nome: "Antônio Peghini", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "120", nome: "Creomar Peres", cargo: "", tipo: "Fone", observacao: "" }
  ],

  "Projeto Vem Ser": [
    { ramal: "170", nome: "Haroldo Beraldo", cargo: "", tipo: "Fone", observacao: "" }
  ],

  "Frota": [
    { ramal: "112", nome: "Pedro Alves", cargo: "", tipo: "Fone", observacao: "" }
  ],

  "Ambiental": [
    { ramal: "121", nome: "Fábio Soldera", cargo: "Gestor Operacional", tipo: "Fone", observacao: "" },
    { ramal: "1021", nome: "Fábio Soldera", cargo: "Gestor Operacional", tipo: "Móvel", observacao: "" },
    { ramal: "1121", nome: "Fábio Soldera", cargo: "Gestor Operacional", tipo: "PC", observacao: "" },
    { ramal: "122", nome: "Ricardo Vaz", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "1022", nome: "Ricardo Vaz", cargo: "", tipo: "Móvel", observacao: "" },
    { ramal: "1122", nome: "Ricardo Vaz", cargo: "", tipo: "PC", observacao: "" },
    { ramal: "126", nome: "Guilherme Di Bianco", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "127", nome: "Marcelo Tová", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "135", nome: "Guilherme Santos", cargo: "Jovem Aprendiz", tipo: "Fone", observacao: "" },
    { ramal: "1036", nome: "Andréia Balleiro", cargo: "Comercial CanaoesteGreen", tipo: "Móvel", observacao: "" }
  ],

  "Jurídico": [
    { ramal: "124", nome: "Juliano Bortoloti", cargo: "Gestor Jurídico", tipo: "Fone", observacao: "" },
    { ramal: "125", nome: "Diego Rossaneis", cargo: "Advogado", tipo: "Fone", observacao: "" },
    { ramal: "128", nome: "Renata/Daniela", cargo: "Secretária", tipo: "Fone", observacao: "" },
    { ramal: "129", nome: "Rafael Costa", cargo: "Advogado", tipo: "Fone", observacao: "" }
  ],

  "Departamento Técnico": [
    { ramal: "113", nome: "Alessandra Durigan", cargo: "Gestora Operacional", tipo: "Fone", observacao: "" },
    { ramal: "1013", nome: "Alessandra Durigan", cargo: "Gestora Operacional", tipo: "Móvel", observacao: "" },
    { ramal: "1113", nome: "Alessandra Durigan", cargo: "Gestora Operacional", tipo: "PC", observacao: "" },
    { ramal: "157", nome: "André Volpe", cargo: "Gestor Operacional", tipo: "Fone", observacao: "" },

    { ramal: "100", nome: "Adalita Andreata", cargo: "Secretária Sertãozinho", tipo: "Fone", observacao: "" },
    { ramal: "114", nome: "Victor Prati", cargo: "Agrônomo Sertãozinho", tipo: "Fone", observacao: "" },
    { ramal: "1014", nome: "Victor Prati", cargo: "Agrônomo Sertãozinho", tipo: "Móvel", observacao: "" },
    { ramal: "1114", nome: "Victor Prati", cargo: "Agrônomo Sertãozinho", tipo: "PC", observacao: "" },

    { ramal: "200", nome: "Elaine Chrispim", cargo: "Secretária Cravinhos", tipo: "Fone", observacao: "" },
    { ramal: "201", nome: "Marco Polegato", cargo: "Agrônomo Cravinhos", tipo: "Fone", observacao: "" },

    { ramal: "205", nome: "Carla Hipólito", cargo: "Secretária Serrana", tipo: "Fone", observacao: "" },
    { ramal: "206", nome: "Danilo Mazoni", cargo: "Agrônomo Serrana", tipo: "Fone", observacao: "" },

    { ramal: "210", nome: "Michele Gonçalves", cargo: "Secretária Pontal", tipo: "Fone", observacao: "" },
    { ramal: "211", nome: "João Pedro Fontanari", cargo: "Agrônomo Pontal", tipo: "Fone", observacao: "" },

    { ramal: "215", nome: "Tatiane Trovo", cargo: "Secretária Pitangueiras", tipo: "Fone", observacao: "" },
    { ramal: "216", nome: "Felipe Volpe", cargo: "Agrônomo Pitangueiras", tipo: "Fone", observacao: "" },

    { ramal: "220", nome: "Rose de Oliveira", cargo: "Secretária Bebedouro", tipo: "Fone", observacao: "" },
    { ramal: "2120", nome: "Rose de Oliveira", cargo: "Secretária Bebedouro", tipo: "Móvel", observacao: "" },
    { ramal: "221", nome: "Felipe Volpe", cargo: "Agrônomo Bebedouro", tipo: "Fone", observacao: "" },

    { ramal: "225", nome: "Juliana Leite", cargo: "Secretária Viradouro", tipo: "Fone", observacao: "" },
    { ramal: "226", nome: "Antonio Pagotto", cargo: "Agrônomo Viradouro", tipo: "Fone", observacao: "" },

    { ramal: "230", nome: "Aline Padovan", cargo: "Secretária Morro Agudo", tipo: "Fone", observacao: "" },
    { ramal: "231", nome: "João Fernando", cargo: "Agrônomo Morro Agudo", tipo: "Fone", observacao: "" },

    { ramal: "235", nome: "Maria Izabela Rodrigues", cargo: "Escritório Barretos", tipo: "Fone", observacao: "" },
    { ramal: "236", nome: "Luiz Silverio Neto", cargo: "Agrônomo Barretos", tipo: "Fone", observacao: "" },

    { ramal: "240", nome: "Guilherme Tormena", cargo: "Agrônomo Ituverava", tipo: "Fone", observacao: "" },

    { ramal: "245", nome: "Eduardo Neto", cargo: "Agrônomo Descalvado", tipo: "Fone", observacao: "" },

    { ramal: "250", nome: "Joice Mantovani", cargo: "Secretária Severínia", tipo: "Fone", observacao: "" },
    { ramal: "251", nome: "Ivan Tilelli Burjaili", cargo: "Agrônomo Severínia", tipo: "Fone", observacao: "" },
    { ramal: "2051", nome: "Ivan Tilelli Burjaili", cargo: "Agrônomo Severínia", tipo: "Móvel", observacao: "" },

    { ramal: "255", nome: "Ariele M. Lima de Castro", cargo: "Secretária Catanduva", tipo: "Fone", observacao: "" },
    { ramal: "1255", nome: "Ariele M. Lima de Castro", cargo: "Secretária Catanduva", tipo: "Móvel", observacao: "" },
    { ramal: "2255", nome: "Ariele M. Lima de Castro", cargo: "Secretária Catanduva", tipo: "PC", observacao: "" },

    { ramal: "256", nome: "Aderbal José Turin", cargo: "Geo Catanduva", tipo: "Fone", observacao: "" },
    { ramal: "1256", nome: "Aderbal José Turin", cargo: "Geo Catanduva", tipo: "Móvel", observacao: "" },
    { ramal: "2256", nome: "Aderbal José Turin", cargo: "Geo Catanduva", tipo: "PC", observacao: "" },

    { ramal: "2256", nome: "Marcelo Colla", cargo: "Jurídico Catanduva", tipo: "Fone", observacao: "" }
  ]
};

// ===============================
// VARIÁVEIS
// ===============================

let dadosRamais = {};
let categoriasRecolhidas = {};
let termoBusca = "";
let usuarioAtual = null;
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
  usuarioAtual = user;
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
      aplicarModoConsulta();
      mostrarToast("Login feito, mas este usuário não tem permissão para editar.");
    }

    renderizarRamais();
  });
});

function aplicarModoEditor(email) {
  document.body.classList.add("modo-editor");

  statusUsuario.textContent = `Editor: ${email}`;
  statusUsuario.classList.add("editor");

  btnLogin.classList.add("escondido");
  btnLogout.classList.remove("escondido");
}

function aplicarModoConsulta() {
  document.body.classList.remove("modo-editor");

  statusUsuario.textContent = "Modo consulta";
  statusUsuario.classList.remove("editor");

  btnLogin.classList.remove("escondido");
  btnLogout.classList.add("escondido");

  podeEditar = false;
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

btnEntrarLogin.addEventListener("click", () => {
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
    .catch(() => {
      mostrarToast("E-mail ou senha incorretos.");
    });
});

btnLogout.addEventListener("click", () => {
  auth.signOut();
});

// ===============================
// INICIAR FIREBASE
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

    if (podeEditar) {
      areaRamais.innerHTML += `
        <p class="carregando">
          Banco vazio. Aperte F12, vá no Console e digite: carregarDadosIniciais()
        </p>
      `;
    }

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

          <button 
            class="btn-pequeno btn-adicionar-menor" 
            data-acao="adicionar" 
            data-categoria="${escaparHtml(categoria)}"
          >
            + Adicionar
          </button>
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

  const linhas = pessoas.map(pessoa => {
    const cargo = pessoa.cargo
      ? `<div class="cargo-pessoa">${escaparHtml(pessoa.cargo)}</div>`
      : `<div class="cargo-vazio">Sem função informada</div>`;

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
            <th class="col-acoes">Ações</th>
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
// CLIQUES NA ÁREA DOS RAMAIS
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
  }

  if (acao === "adicionar") {
    if (!podeEditar) {
      mostrarToast("Você não tem permissão para adicionar.");
      return;
    }

    abrirModalAdicionarPessoa(categoria);
  }

  if (acao === "editar") {
    if (!podeEditar) {
      mostrarToast("Você não tem permissão para editar.");
      return;
    }

    abrirModalEditarPessoa(categoria, id);
  }

  if (acao === "excluir") {
    if (!podeEditar) {
      mostrarToast("Você não tem permissão para excluir.");
      return;
    }

    excluirPessoa(categoria, id);
  }
});

// ===============================
// CATEGORIAS
// ===============================

btnAdicionarCategoria.addEventListener("click", () => {
  if (!podeEditar) {
    mostrarToast("Você não tem permissão para criar categorias.");
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
    mostrarToast("Você não tem permissão para salvar categorias.");
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
    mostrarToast("Categoria criada com sucesso.");
  }).catch(() => {
    mostrarToast("Erro: sem permissão para criar categoria.");
  });
});

// ===============================
// PESSOAS / RAMAIS
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
    mostrarToast("Você não tem permissão para salvar ramais.");
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
      mostrarToast("Ramal atualizado com sucesso.");
    } else {
      mostrarToast("Ramal adicionado com sucesso.");
    }

    modalPessoa.classList.remove("aberto");
  }).catch(() => {
    mostrarToast("Erro: sem permissão para salvar.");
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
    mostrarToast("Erro: sem permissão para excluir.");
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

// Use esta função somente se seu banco estiver vazio.
// Faça login como editor, aperte F12, vá em Console e digite:
// carregarDadosIniciais()
function carregarDadosIniciais() {
  if (!podeEditar) {
    mostrarToast("Faça login como editor para carregar os dados iniciais.");
    return;
  }

  ramaisRef.set(dadosIniciais).then(() => {
    registrarUltimaAtualizacao();
    mostrarToast("Dados iniciais carregados.");
  }).catch(() => {
    mostrarToast("Erro ao carregar dados iniciais.");
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