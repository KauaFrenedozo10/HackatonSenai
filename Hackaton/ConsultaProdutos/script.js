// Dados dos produtos baseados nos INSERTs fornecidos
const products = [
    { id: 1, nome: 'Fone com Microfone', textoDescritivo: 'Fone de Ouvido com Microfone, Loop Way, P3', cor: 'Branco', fabricante: 'Philips', preco: 39.99, quantidade: 27, imagens: ['https://i.ibb.co/zhRPrqQS/01.jpg', 'https://i.ibb.co/Vp0B2h2m/02.jpg', 'https://i.ibb.co/nqXtTqG4/03.jpg'] },
    { id: 2, nome: 'Mouse Gamer', textoDescritivo: 'Mouse Gamer Óptico Nitro 7200 DPI, 6 Botões, USB', cor: 'Preto', fabricante: 'Acer', preco: 79.99, quantidade: 18, imagens: ['https://i.ibb.co/60gSPfDP/01.jpg', 'https://i.ibb.co/prfqF9fM/02.jpg', 'https://i.ibb.co/tTx9zdtd/03.jpg'] },
    { id: 3, nome: 'HeadSet', textoDescritivo: 'HeadSet Gamer com Microfone Quantum II, P3', cor: 'Preto', fabricante: 'JBL', preco: 119.99, quantidade: 19, imagens: ['https://i.ibb.co/xqz36nXW/01.jpg', 'https://i.ibb.co/wNBdSfg5/02.jpg', 'https://i.ibb.co/k6zsq6VW/03.jpg'] },
    { id: 4, nome: 'Teclado Gamer', textoDescritivo: 'Teclado Mecânico Gamer Phantom, ABNT2', cor: 'Preto', fabricante: 'Fortrek', preco: 99.99, quantidade: 12, imagens: ['https://i.ibb.co/9zDbk1w/01.jpg', 'https://i.ibb.co/0j0gTT5H/02.jpg', 'https://i.ibb.co/DHCSqKsd/03.jpg'] },
    { id: 5, nome: 'Fone Bluetooth', textoDescritivo: 'Fone de Ouvido Tune Buds, Bluetooth', cor: 'Preto', fabricante: 'JBL', preco: 389.90, quantidade: 3, imagens: ['https://i.ibb.co/pB2hLd9R/03.jpg', 'https://i.ibb.co/3mSRMSgd/02.jpg', 'https://i.ibb.co/ch0hNMsv/04.jpg'] },
    { id: 6, nome: 'Teclado Slim', textoDescritivo: 'Teclado Membrana Fortrek K15, ABNT2, USB', cor: 'Preto', fabricante: 'Fortrek', preco: 89.99, quantidade: 11, imagens: ['https://i.ibb.co/tTYkZ85S/01.jpg', 'https://i.ibb.co/wZr6MgWB/02.jpg', 'https://i.ibb.co/G4BR1Sds/03.jpg'] },
    { id: 7, nome: 'Mouse HX', textoDescritivo: 'Mouse Pulsefire Haste 2 Mini, 26000dpi, 6 Botões, Wireless', cor: 'Preto', fabricante: 'Hyperx', preco: 379.99, quantidade: 5, imagens: ['https://i.ibb.co/Zp3rKKBQ/01.jpg', 'https://i.ibb.co/fzhyhJfc/02.jpg', 'https://i.ibb.co/nskSxbrP/03.jpg'] },
    { id: 8, nome: 'Fone Wireless', textoDescritivo: 'Fone de Ouvido Tune Flex, Wireless', cor: 'Preto', fabricante: 'JBL', preco: 439.99, quantidade: 14, imagens: ['https://i.ibb.co/ksHzyn0Q/01.jpg', 'https://i.ibb.co/JjM8Kn9B/02.jpg', 'https://i.ibb.co/XrWMYMZj/03.jpg'] },
    { id: 9, nome: 'Teclado Slim', textoDescritivo: 'Teclado Membrana Fortrek K15, ABNT2, USB', cor: 'Branco', fabricante: 'Fortrek', preco: 105.99, quantidade: 8, imagens: ['https://i.ibb.co/XfcFtrCH/01.jpg', 'https://i.ibb.co/wrsf52qB/02.jpg', 'https://i.ibb.co/RGDt1tQG/03.jpg'] },
    { id: 10, nome: 'Mouse King', textoDescritivo: 'Mouse King Pro Horda World of Warcraft, 26000dpi, 5 Botões', cor: 'Vermelho', fabricante: 'Redragon', preco: 329.99, quantidade: 6, imagens: ['https://i.ibb.co/wN0tr7sk/01.jpg', 'https://i.ibb.co/8DJncPDX/02.jpg', 'https://i.ibb.co/NnGDKpRD/04.jpg'] },
    { id: 11, nome: 'Fone', textoDescritivo: 'Fone de Ouvido Tune 500 Pure Bass, P2', cor: 'Branco', fabricante: 'JBL', preco: 139.99, quantidade: 12, imagens: ['https://i.ibb.co/LdwJHxtZ/01.jpg', 'https://i.ibb.co/gFXrgBLk/02.jpg', 'https://i.ibb.co/GQ4T0xTd/03.jpg'] },
    { id: 12, nome: 'Mouse King', textoDescritivo: 'Mouse King Pro Horda World of Warcraft, 26000dpi, 5 Botões', cor: 'Azul', fabricante: 'Redragon', preco: 319.99, quantidade: 8, imagens: ['https://i.ibb.co/R47938fc/01.jpg', 'https://i.ibb.co/fV3CvpfR/02.jpg', 'https://i.ibb.co/ccdSz1n9/03.jpg'] }
];

// Função para exibir produtos
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${product.imagens[0]}" class="card-img-top" alt="${product.nome}">
                    <div class="card-body">
                        <h5 class="card-title">${product.nome}</h5>
                        <p class="card-text">${product.textoDescritivo}</p>
                        <p class="card-text"><strong>Cor:</strong> ${product.cor}</p>
                        <p class="card-text"><strong>Fabricante:</strong> ${product.fabricante}</p>
                        <p class="card-text"><strong>Preço:</strong> R$${product.preco.toFixed(2)}</p>
                        <p class="card-text"><strong>Quantidade:</strong> ${product.quantidade}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary" onclick="editProduct(${product.id})">Editar</button>
                            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Função para editar produto
function editProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('editId').value = product.id;
    document.getElementById('editNome').value = product.nome;
    document.getElementById('editDescricao').value = product.textoDescritivo;
    document.getElementById('editCor').value = product.cor;
    document.getElementById('editFabricante').value = product.fabricante;
    document.getElementById('editPreco').value = product.preco;
    document.getElementById('editQuantidade').value = product.quantidade;

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}

// Função para salvar edição
document.getElementById('editForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = parseInt(document.getElementById('editId').value);
    const product = products.find(p => p.id === id);
    product.nome = document.getElementById('editNome').value;
    product.textoDescritivo = document.getElementById('editDescricao').value;
    product.cor = document.getElementById('editCor').value;
    product.fabricante = document.getElementById('editFabricante').value;
    product.preco = parseFloat(document.getElementById('editPreco').value);
    product.quantidade = parseInt(document.getElementById('editQuantidade').value);

    displayProducts();
    const modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    modal.hide();
    showAlert('Produto editado com sucesso!', 'success');
});

// Função para excluir produto
function deleteProduct(id) {
    if (confirm('Tem certeza de que deseja excluir este produto?')) {
        const index = products.findIndex(p => p.id === id);
        products.splice(index, 1);
        displayProducts();
        showAlert('Produto excluído com sucesso!', 'success');
    }
}

// Função para exibir alertas
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" onclick="closeAlert(this)" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.getElementById('productList').before(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}

// Função para fechar alerta
function closeAlert(element) {
    element.closest('.alert').remove();
}

// Exibir produtos ao carregar a página
displayProducts();