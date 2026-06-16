// ===============================
// CONFIGURAÇÃO DO FIREBASE
// ===============================

const firebaseConfig = {
  databaseURL: "https://ramaiscanaoeste-default-rtdb.firebaseio.com/"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.database();
const ramaisRef = db.ref("ramais_canaoeste");

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
    { ramal: "134", nome: "Júlia Perticarrari", cargo: "Jovem Aprendiz", tipo: "Fone", observacao: "" },
    { ramal: "106", nome: "Daiane Serafim", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "108", nome: "Gabriel Santos", cargo: "Recursos Humanos", tipo: "Fone", observacao: "" },
    { ramal: "107", nome: "José Alberto", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "109", nome: "Ruth Neudielle", cargo: "Financeiro", tipo: "Fone", observacao: "" }
  ],

  "Comunicação e Marketing": [
    { ramal: "110", nome: "Lucas Figueiredo", cargo: "Coordenador", tipo: "Fone", observacao: "" },
    { ramal: "111", nome: "Ludmila Haikal Rizzi", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "132", nome: "Ana Lívia", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "133", nome: "Kelvin Oliveira", cargo: "Jovem Aprendiz", tipo: "PC", observacao: "" }
  ],

  "CanaoesteBio": [
    { ramal: "151", nome: "André Volpe", cargo: "Gestor Operacional", tipo: "Fone", observacao: "" },
    { ramal: "1150", nome: "Murilo Lopes", cargo: "", tipo: "Fone", observacao: "" },
    { ramal: "152", nome: "Maysa Corrêa", cargo: "Laboratório", tipo: "Fone", observacao: "" },
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
    { ramal: "1021", nome: "Fábio Soldera", cargo: "Gestor Operacional", tipo: "Fone", observacao: "" },
    { ramal: "1122", nome: "Ricardo Vaz", cargo: "", tipo: "Fone", observacao: "" },
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
    { ramal: "157", nome: "André Volpe", cargo: "Gestor Operacional", tipo: "Fone", observacao: "" },

    { ramal: "100", nome: "Adalita Andreata", cargo: "Secretária Sertãozinho", tipo: "Fone", observacao: "" },
    { ramal: "114", nome: "Victor Prati", cargo: "Agrônomo Sertãozinho", tipo: "Fone", observacao: "" },

    { ramal: "200", nome: "Elaine Chrispim", cargo: "Secretária Cravinhos", tipo: "Fone", observacao: "" },
    { ramal: "201", nome: "Marco Polegato", cargo: "Agrônomo Cravinhos", tipo: "Fone", observacao: "" },

    { ramal: "205", nome: "Carla Hipólito", cargo: "Secretária Serrana", tipo: "Fone", observacao: "" },
    { ramal: "206", nome: "Danilo Mazoni", cargo: "Agrônomo Serrana", tipo: "Fone", observacao: "" },

    { ramal: "210", nome: "Michele Gonçalves", cargo: "Secretária Pontal", tipo: "Fone", observacao: "" },
    { ramal: "211", nome: "João Pedro Fontanari", cargo: "Agrônomo Pontal", tipo: "Fone", observacao: "" },

    { ramal: "215", nome: "Tatiane Trovo", cargo: "Secretária Pitangueiras", tipo: "Fone", observacao: "" },
    { ramal: "216", nome: "Felipe Volpe", cargo: "Agrônomo Pitangueiras", tipo: "Fone", observacao: "" },

    { ramal: "220", nome: "Rose de Oliveira", cargo: "Secretária Bebedouro", tipo: "Fone", observacao: "" },
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

    { ramal: "255", nome: "Ariele M. Lima de Castro", cargo: "Secretária Catanduva", tipo: "Fone", observacao: "" },
    { ramal: "256", nome: "Aderbal José Turin", cargo: "Geo Catanduva", tipo: "Fone", observacao: "" },
    { ramal: "2256", nome: "Marcelo Colla", cargo: "Jurídico Catanduva", tipo: "Fone", observacao: "" }
  ]
};

// ===============================
// VARIÁVEIS
// ===============================

let dadosRamais = {};
let categoriasRecolhidas = {};
let termoBusca = "";

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

const toast = document.getElementById("toast");

const btnMenu = document.getElementById("btnMenu");
const btnFecharMenu = document.getElementById("btnFecharMenu");
const menuLateral = document.getElementById("menuLateral");
const listaCategoriasMenu = document.getElementById("listaCategoriasMenu");

const btnExpandirTudo = document.getElementById("btnExpandirTudo");
const btnRecolherTudo = document.getElementById("btnRecolherTudo");
const btnSair = document.getElementById("btnSair");
const ultimaAtualizacao = document.getElementById("ultimaAtualizacao");
const atualizacaoRef = db.ref("ultima_atualizacao_ramais");

// ===============================
// INICIAR
// ===============================

ramaisRef.once("value").then(snapshot => {
  if (!snapshot.exists()) {
    ramaisRef.set(dadosIniciais);
  }
});

ramaisRef.on("value", snapshot => {
  dadosRamais = snapshot.val() || {};
  renderizarRamais();
  renderizarMenu();
});
atualizacaoRef.on("value", snapshot => {
  const data = snapshot.val();

  if (!data) {
    ultimaAtualizacao.innerHTML = "Última atualização: ainda não registrada";
    return;
  }

  ultimaAtualizacao.innerHTML = `
    Última atualização: <strong>${formatarDataHora(data)}</strong>
  `;
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

    card.innerHTML = `
      <div class="categoria-topo">
        <h2>${escaparHtml(categoria)}</h2>

        <div class="categoria-acoes">
  <button class="btn-toggle btn-mostrar-destaque" onclick="alternarCategoria('${escaparAspas(categoria)}')">
    ${recolhida ? "Mostrar" : "Ocultar"}
  </button>

  <button class="btn-pequeno btn-adicionar-menor" onclick="abrirModalAdicionarPessoa('${escaparAspas(categoria)}')">
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
    return `
      <tr>
        <td class="col-ramal">${escaparHtml(pessoa.ramal || "")}</td>

<td class="col-nome">
  <div class="nome-pessoa">${escaparHtml(pessoa.nome || "")}</div>
  ${pessoa.observacao ? `<div class="cargo-pessoa">${escaparHtml(pessoa.observacao)}</div>` : ""}
</td>

<td class="col-cargo">
  <div class="cargo-pessoa">${escaparHtml(pessoa.cargo || "")}</div>
</td>

<td class="col-tipo">
  <span class="tag-tipo">${escaparHtml(pessoa.tipo || "Fone")}</span>
</td>

<td class="col-acoes">
  <div class="acoes-botoes">
    <button class="btn-editar" onclick="abrirModalEditarPessoa('${escaparAspas(categoria)}', '${pessoa.id}')">
      Editar
    </button>

    <button class="btn-perigo" onclick="excluirPessoa('${escaparAspas(categoria)}', '${pessoa.id}')">
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

function renderizarMenu() {
  listaCategoriasMenu.innerHTML = "";

  const categorias = ordenarCategorias(Object.keys(dadosRamais));

  categorias.forEach(categoria => {
    const link = document.createElement("a");
    link.href = `#${criarIdCategoria(categoria)}`;
    link.textContent = categoria;

    link.addEventListener("click", () => {
      menuLateral.classList.remove("aberto");
    });

    listaCategoriasMenu.appendChild(link);
  });
}

// ===============================
// CATEGORIAS
// ===============================

btnAdicionarCategoria.addEventListener("click", () => {
  nomeNovaCategoria.value = "";
  modalCategoria.classList.add("aberto");
  nomeNovaCategoria.focus();
});

btnCancelarCategoria.addEventListener("click", () => {
  modalCategoria.classList.remove("aberto");
});

btnSalvarCategoria.addEventListener("click", () => {
  const nome = nomeNovaCategoria.value.trim();

  if (!nome) {
    mostrarToast("Digite o nome da categoria.");
    return;
  }

  if (dadosRamais[nome]) {
    mostrarToast("Essa categoria já existe.");
    return;
  }

  ramaisRef.child(nome).set([]);
registrarUltimaAtualizacao();

modalCategoria.classList.remove("aberto");
mostrarToast("Categoria criada com sucesso.");
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
  const pessoa = dadosRamais[categoria][pessoaId];

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

  if (pessoaId) {
  ramaisRef.child(categoria).child(pessoaId).update(pessoa);
  mostrarToast("Ramal atualizado com sucesso.");
} else {
  ramaisRef.child(categoria).push(pessoa);
  mostrarToast("Ramal adicionado com sucesso.");
}

registrarUltimaAtualizacao();

modalPessoa.classList.remove("aberto");
});

function excluirPessoa(categoria, pessoaId) {
  const confirmar = confirm("Tem certeza que deseja excluir este ramal?");

  if (!confirmar) {
    return;
  }

  ramaisRef.child(categoria).child(pessoaId).remove();
registrarUltimaAtualizacao();

mostrarToast("Ramal excluído.");
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
// MENU
// ===============================

btnMenu.addEventListener("click", () => {
  menuLateral.classList.add("aberto");
});

btnFecharMenu.addEventListener("click", () => {
  menuLateral.classList.remove("aberto");
});

// ===============================
// BOTÃO SAIR
// ===============================

btnSair.addEventListener("click", () => {
  const confirmar = confirm("Deseja sair da página de ramais?");

  if (confirmar) {
    window.location.href = "about:blank";
  }
});

// ===============================
// UTILITÁRIOS
// ===============================

function converterParaArray(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item, index) => ({
      id: index,
      ...item
    }));
  }

  return Object.keys(obj || {}).map(id => ({
    id,
    ...obj[id]
  }));
}

function ordenarCategorias(categorias) {
  return categorias.sort((a, b) => {
    if (a.toLowerCase() === "diretoria") return -1;
    if (b.toLowerCase() === "diretoria") return 1;
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

function escaparAspas(texto) {
  return String(texto)
    .replaceAll("\\", "\\\\")
    .replaceAll("'", "\\'");
}

function registrarUltimaAtualizacao() {
  const agora = new Date().toISOString();
  atualizacaoRef.set(agora);
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

// Fecha modal clicando fora
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

.btn-mostrar-destaque {
  background: #009879;
  font-weight: bold;
  min-width: 86px;
}

.btn-mostrar-destaque:hover {
  background: #007b63;
}

.btn-adicionar-menor {
  background: rgba(255, 255, 255, 0.22);
  font-weight: bold;
}

.btn-adicionar-menor:hover {
  background: rgba(255, 255, 255, 0.34);
}
