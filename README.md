# Sistema de Vendas

## Descrição

O Sistema de Vendas é uma aplicação web simples para gerenciar clientes, produtos e pedidos. Desenvolvido em HTML, CSS e JavaScript puro, o sistema oferece funcionalidades básicas para o cadastro de clientes, produtos, realização de pedidos e apresentação de todas as vendas realizadas.

## Funcionalidades

1. **Cadastrar Cliente:** Permite ao usuário inserir o ID e o nome de um cliente.
2. **Cadastrar Produto:** Permite ao usuário inserir o ID, nome e preço de venda de um produto.
3. **Cadastrar Pedido:** Permite ao usuário selecionar um cliente cadastrado e adicionar produtos ao pedido, calculando automaticamente o valor total.
4. **Apresentar Todas as Vendas:** Exibe todas as vendas realizadas até o momento, incluindo informações do cliente, produtos comprados e o valor total de cada venda.

## Armazenamento Local (LocalStorage)

O Sistema de Vendas utiliza o recurso de armazenamento local do navegador, conhecido como LocalStorage, para armazenar informações importantes, como clientes, produtos e pedidos. O LocalStorage permite que os dados sejam armazenados localmente no navegador do usuário, persistindo mesmo após o fechamento da janela do navegador.

### Como Funciona

Quando um cliente, produto ou pedido é cadastrado no sistema, os dados são armazenados no LocalStorage do navegador em formato de chave-valor. Isso significa que cada item armazenado possui uma chave única associada a ele, permitindo recuperar e manipular esses dados posteriormente.

### Vantagens

- **Persistência dos Dados:** As informações cadastradas no sistema permanecem disponíveis mesmo após o usuário fechar a janela do navegador ou atualizar a página.
- **Facilidade de Acesso:** Os dados armazenados no LocalStorage podem ser facilmente acessados e manipulados por meio de JavaScript, sem a necessidade de interação com um servidor.
- **Desempenho:** O armazenamento local é mais rápido do que fazer requisições constantes a um servidor, tornando a experiência do usuário mais ágil.

### Limitações

- **Limite de Armazenamento:** O LocalStorage possui um limite de armazenamento que varia de navegador para navegador, geralmente entre 5MB e 10MB por domínio. É importante ter em mente esse limite ao armazenar grandes volumes de dados.

### Segurança

- **Segurança dos Dados:** Os dados armazenados no LocalStorage são acessíveis apenas para o próprio domínio que os criou. Isso significa que outros sites não têm acesso aos dados armazenados no LocalStorage do seu sistema de vendas.

### Manutenção

- **Limpeza de Dados:** É importante implementar rotinas de limpeza de dados no sistema para remover informações obsoletas ou desnecessárias do LocalStorage, evitando o acúmulo excessivo de dados e possíveis problemas de desempenho.

## Como Usar

1. Clone ou baixe este repositório para sua máquina.
2. Abra o arquivo `index.html` em um navegador da web compatível.

https://github.com/PriscilaKimura/Sistema-de-Vendas/assets/141864300/ce033013-5945-40cd-9f90-694b65e14d7d

