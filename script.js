function cadastrarCliente(event) {
  event.preventDefault();

  let idElement = document.getElementById("cliente-id");
  let nomeElement = document.getElementById("cliente-nome");

  let id = idElement.value;
  let nome = nomeElement.value;

  if (!id) {
    id = prompt("Insira o ID do cliente:");
  }

  if (!nome) {
    nome = prompt("Insira o nome do cliente:");
  }

  if (!id || !nome) {
    alert("Por favor, insira o ID e o nome do cliente.");
    return false;
  }

  let cliente = { id: id, nome: nome };
  salvarNoLocalStorage("clientes", cliente);
  alert("Cliente cadastrado com sucesso:", cliente);

  // Mudar para a próxima etapa (cadastro de produto)
  // toggleForm(null, 'produto-form');
}

// Função para cadastrar um produto
function cadastrarProduto(event) {
  event.preventDefault();

  let idElement = document.getElementById("produto-id");
  let nomeElement = document.getElementById("produto-nome");
  let precoElement = document.getElementById("produto-preco");

  let id = idElement.value;
  let nome = nomeElement.value;
  let preco = parseFloat(precoElement.value);

  if (!id) {
    id = prompt("Insira o ID do produto:");
  }

  if (!nome) {
    nome = prompt("Insira o nome do produto:");
  }

  if (isNaN(preco) || preco <= 0) {
    preco = parseFloat(prompt("Insira o preço de venda do produto:"));
  }

  if (!id || !nome || isNaN(preco) || preco <= 0) {
    alert("Por favor, insira o ID, o nome e um preço válido para o produto.");
    return;
  }

  let produto = { id: id, nome: nome, preco: preco };
  salvarNoLocalStorage("produtos", produto);
  alert("Produto cadastrado com sucesso:", produto);
}
// Função para mostrar o formulário de cadastro de pedido
function mostrarFormularioPedido() {
  // Esconder o formulário de cadastro de produto
  document.getElementById("produto-form").style.display = "none";

  // Mostrar o formulário de cadastro de pedido
  document.getElementById("pedido-form").style.display = "block";

  // Preencher o select de clientes
  preencherSelectClientes();
}

// Função para cadastrar um pedido
function cadastrarPedido(event) {
  event.preventDefault();

  // Selecionar cliente
  let clienteIdElement = document.getElementById("cliente-selecionado");
  let clienteId = clienteIdElement.value;
  let clienteNome = clienteIdElement.options[clienteIdElement.selectedIndex].text

  if (!clienteId) {
    alert("Por favor, selecione um cliente.");
    return;
  }

  // Adicionar produtos ao pedido
  let produtos = [];
  while (true) {
    let produtoId = document.getElementById("produto-id-pedido").value;
    if (!produtoId) break;

    let quantidade = parseInt(document.getElementById("quantidade").value);
    if (!quantidade || quantidade <= 0) {
      alert("Por favor, insira uma quantidade válida para o produto.");
      return;
    }

    let produto = recuperarDoLocalStorage("produtos", produtoId);
    if (!produto) {
      alert("Produto não encontrado.");
      return;
    }

    produtos.push({
      id: produtoId,
      nome: produto.nome,
      preco: produto.preco,
      quantidade: quantidade,
    });

    // Limpar os campos para o próximo produto
    document.getElementById("produto-id-pedido").value = "";
    document.getElementById("quantidade").value = "";

    // Adicionar mais produtos?
    let adicionarMais = confirm("Deseja adicionar mais produtos?");
    if (!adicionarMais) break;
  }

  // Calcular o valor total do pedido
  let valorTotal = produtos.reduce(
    (total, produto) => total + produto.preco * produto.quantidade,
    0
  );

  // Salvar o pedido
  let pedido = {
    clienteId: clienteNome,
    produtos: produtos,
    valorTotal: valorTotal,
  };
  salvarNoLocalStorage("pedidos", pedido);
  alert("Pedido cadastrado com sucesso:", pedido);

  // Mostrar o formulário de vendas
  // mostrarFormularioVendas();

}

// Função para preencher o select de clientes
function preencherSelectClientes() {
  let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  let selectClientes = document.getElementById("cliente-selecionado");
  selectClientes.innerHTML = "";

  clientes.forEach((cliente) => {
    let option = document.createElement("option");
    option.value = cliente.id;
    option.textContent = cliente.nome;
    selectClientes.appendChild(option);
  });
}

// Função para mostrar o formulário de vendas
function mostrarFormularioVendas() {
  // Esconder o formulário de cadastro de pedido
  document.getElementById("pedido-form").style.display = "none";

  // Mostrar o formulário de vendas
  document.getElementById("vendas-section").style.display = "block";

  // Chamar função para mostrar todas as vendas
  mostrarTodasAsVendas();
}

// Função para mostrar todas as vendas
function mostrarTodasAsVendas() {
  let vendas = JSON.parse(localStorage.getItem("pedidos")) || [];

  let tabelaVendas = document.getElementById("tabela-vendas");
  tabelaVendas.innerHTML = "<thead><tr><th>Cliente</th> <th>Produtos</th><th>Valor Total</th></tr> </thead> <tbody> </tbody>";

  vendas.forEach((venda, index) => {
    let row = tabelaVendas.insertRow();
    let cellCliente = row.insertCell(0);
    let cellProdutos = row.insertCell(1);
    let cellValorTotal = row.insertCell(2);

    cellCliente.textContent = venda.clienteId;
    cellProdutos.textContent = venda.produtos.map(produto => produto.nome).join(", ");
    cellValorTotal.textContent = venda.valorTotal.toFixed(2);
  });
}
// Função para mostrar o formulário de vendas e exibir as vendas
function mostrarFormularioVendas() {
  // Esconder o formulário de cadastro de pedido
  // document.getElementById("pedido-form").style.display = "none";

  // Mostrar o formulário de vendas
  document.getElementById("vendas-section").style.display = "block";

  // Chamar função para mostrar todas as vendas
  mostrarTodasAsVendas();
}

// Função para salvar um objeto no localStorage
function salvarNoLocalStorage(key, valor) {
  let items = JSON.parse(localStorage.getItem(key)) || [];
  items.push(valor);
  localStorage.setItem(key, JSON.stringify(items));
}

// Função para recuperar um objeto do localStorage
function recuperarDoLocalStorage(key, id) {
  let items = JSON.parse(localStorage.getItem(key)) || [];
  return items.find((item) => item.id === id);
}

// Função para recuperar todos os objetos do localStorage
function recuperarTodosDoLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// Chamar a função para preencher o select de clientes ao carregar a página
window.onload = function () {
  preencherSelectClientes();
};

// Função para alternar a exibição dos formulários
function toggleForm(event, formId) {

  event.preventDefault();
  let forms = document.querySelectorAll(".form-container");
  forms.forEach((form) => {
    if (form.id === formId) {
      form.style.display = "block";
    } else {
      form.style.display = "none";
    }

  });

  if (formId == 'pedido-form'){
    preencherSelectClientes()
  }
}
