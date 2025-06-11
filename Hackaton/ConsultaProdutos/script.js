const API_BASE_URL = "http://localhost:8080/api/produtos"; // URL base para a API do backend

// Função para buscar e exibir produtos do backend
async function fetchAndDisplayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '<div class="text-center text-secondary">Carregando produtos...</div>'; // Mensagem de carregamento
    try {
        const response = await axios.get(API_BASE_URL); // Requisição GET para listar produtos
        const products = response.data; // Os produtos vêm da resposta da API

        productList.innerHTML = ''; // Limpa a mensagem de carregamento
        if (products.length === 0) {
            productList.innerHTML = '<div class="text-center text-secondary">Nenhum produto cadastrado.</div>';
            return;
        }

        products.forEach(product => {
            const productCard = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${product.imagem || 'https://via.placeholder.com/180'}" class="card-img-top" alt="${product.nome}">
                        <div class="card-body">
                            <h5 class="card-title">${product.nome}</h5>
                            <p class="card-text">${product.descricao}</p> <p class="card-text"><strong>Cor:</strong> ${product.cor}</p>
                            <p class="card-text"><strong>Fabricante:</strong> ${product.fabricante}</p>
                            <p class="card-text"><strong>Preço:</strong> R$${product.preco ? product.preco.toFixed(2) : 'N/A'}</p>
                            <p class="card-text"><strong>Quantidade em Estoque:</strong> ${product.quantidadeEstoque}</p> <div class="d-flex justify-content-between">
                                <button class="btn btn-primary" onclick="editProduct(${product.id})">Editar</button>
                                <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productList.innerHTML += productCard;
        });
    } catch (error) {
        console.error("Erro ao buscar produtos:", error.response ? error.response.data : error.message);
        productList.innerHTML = '<div class="text-center text-danger">Erro ao carregar produtos. Tente novamente mais tarde.</div>';
        showAlert('Erro ao carregar produtos.', 'danger');
    }
}

// Função para preencher o modal de edição com dados do produto do backend
async function editProduct(id) {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`); // Requisição GET para obter produto por ID
        const product = response.data; // Dados do produto

        document.getElementById('editId').value = product.id;
        document.getElementById('editNome').value = product.nome;
        document.getElementById('editDescricao').value = product.descricao; // Campo 'descricao'
        document.getElementById('editCor').value = product.cor;
        document.getElementById('editFabricante').value = product.fabricante;
        document.getElementById('editPreco').value = product.preco;
        document.getElementById('editQuantidadeEstoque').value = product.quantidadeEstoque; // Campo 'quantidadeEstoque'

        const modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    } catch (error) {
        console.error("Erro ao buscar produto para edição:", error.response ? error.response.data : error.message);
        showAlert('Erro ao carregar produto para edição.', 'danger');
    }
}

// Função para salvar edição no backend
document.getElementById('editForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('editId').value);

    // Rebusca o produto para garantir que temos a imagem original se não houver um campo de edição de imagem
    let originalProduct;
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        originalProduct = response.data;
    } catch (error) {
        console.error("Erro ao recuperar imagem original para edição:", error);
        showAlert('Erro ao preparar edição. Tente novamente.', 'danger');
        return;
    }

    const updatedProduct = {
        id: id,
        nome: document.getElementById('editNome').value.trim(),
        descricao: document.getElementById('editDescricao').value.trim(), // Campo 'descricao'
        cor: document.getElementById('editCor').value.trim(),
        fabricante: document.getElementById('editFabricante').value.trim(),
        preco: parseFloat(document.getElementById('editPreco').value.trim()),
        quantidadeEstoque: parseInt(document.getElementById('editQuantidadeEstoque').value.trim(), 10), // Campo 'quantidadeEstoque'
        imagem: originalProduct.imagem // Mantém a imagem original, pois não há campo de upload no modal
    };

    try {
        await axios.put(`${API_BASE_URL}/${id}`, updatedProduct); // Requisição PUT para atualizar
        showAlert('Produto editado com sucesso!', 'success');
        const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        modal.hide();
        fetchAndDisplayProducts(); // Recarrega a lista de produtos
    } catch (error) {
        console.error("Erro ao salvar edição:", error.response ? error.response.data : error.message);
        showAlert('Erro ao editar produto. Verifique os dados e tente novamente.', 'danger');
    }
});

// Função para excluir produto no backend
async function deleteProduct(id) {
    if (confirm('Tem certeza de que deseja excluir este produto?')) {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`); // Requisição DELETE para excluir
            showAlert('Produto excluído com sucesso!', 'success');
            fetchAndDisplayProducts(); // Recarrega a lista de produtos
        } catch (error) {
            console.error("Erro ao excluir produto:", error.response ? error.response.data : error.message);
            showAlert('Erro ao excluir produto. Tente novamente.', 'danger');
        }
    }
}