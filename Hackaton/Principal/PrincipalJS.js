// Principal/PrincipalJS.js

document.addEventListener("DOMContentLoaded", () => {
    // A variável imageBase64 não é mais usada para upload, mas podemos usá-la para pré-visualização.
    // Agora pegaremos a URL de um input de texto.
    const imageUrlInput = document.getElementById('imageUrlInput');
    const avatarMedico = document.getElementById('avatarMedico');

    if (imageUrlInput && avatarMedico) {
        imageUrlInput.addEventListener('input', () => {
            const url = imageUrlInput.value;
            // Valida se a URL parece uma imagem antes de atribuir
            if (url && (url.startsWith('http://') || url.startsWith('https://')) && /\.(jpeg|jpg|gif|png|webp|svg)$/i.test(url)) {
                avatarMedico.src = url;
            } else {
                avatarMedico.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // Placeholder se a URL for inválida ou vazia
            }
        });
    }

    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nome = document.getElementById("nomeInput");
            const descricao = document.getElementById("descricaoInput");
            const cor = document.getElementById("corInput");
            const fabricante = document.getElementById("fabricanteInput");
            const preco = document.getElementById("precoInput");
            const quantidade = document.getElementById("quantidadeInput"); // ID alterado aqui

            // Validação básica
            if (!nome.value.trim() || !descricao.value.trim() || !cor.value.trim() || !fabricante.value.trim() || !preco.value.trim() || !quantidade.value.trim()) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            const imageUrl = imageUrlInput.value.trim();
            if (!imageUrl) {
                alert("Por favor, insira a URL da imagem do produto.");
                return;
            }

            const produtoDTO = {
                nome: nome.value.trim(),
                descricao: descricao.value.trim(), // Nome do campo correspondendo ao backend
                cor: cor.value.trim(),
                fabricante: fabricante.value.trim(),
                preco: parseFloat(preco.value.trim()),
                quantidade: parseInt(quantidade.value.trim(), 10), // Nome do campo correspondendo ao backend
                urlsImagens: [imageUrl] // Envia a URL da imagem como uma lista
            };

            try {
                const response = await axios.post("http://localhost:8080/api/produtos", produtoDTO, {
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                alert("Produto cadastrado com sucesso!");
                console.log(response.data);
                form.reset();
                avatarMedico.src = "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // Reseta a pré-visualização
                imageUrlInput.value = ""; // Limpa o campo de URL
            } catch (error) {
                console.error("Erro na requisição:", error.response ? error.response.data : error.message);
                alert("Erro ao cadastrar produto. Verifique os dados e tente novamente.");
            }
        });
    }
});