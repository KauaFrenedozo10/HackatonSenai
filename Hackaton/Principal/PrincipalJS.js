// Principal/PrincipalJS.js

document.addEventListener("DOMContentLoaded", () => {
    // A variável imageBase64 agora é declarada dentro do escopo do DOMContentLoaded
    // Isso garante que ela esteja disponível quando o DOM estiver completamente carregado
    let imageBase64 = "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // Valor inicial para o avatar padrão

    function configurarUpload(avatarId, inputId) {
        const avatar = document.getElementById(avatarId);
        const input = document.getElementById(inputId);

        if (avatar && input) {
            input.addEventListener('change', () => {
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = e => {
                        avatar.src = e.target.result;
                        imageBase64 = e.target.result; // Armazena a imagem em Base64
                    };
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    configurarUpload('avatarMedico', 'uploadMedico');

    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const nome = document.getElementById("nomeInput");
            const descricao = document.getElementById("descricaoInput");
            const cor = document.getElementById("corInput");
            const fabricante = document.getElementById("fabricanteInput");
            const preco = document.getElementById("precoInput");
            const quantidadeEstoque = document.getElementById("quantidadeEstoqueInput");

            // Validação básica
            if (!nome.value.trim() || !descricao.value.trim() || !cor.value.trim() || !fabricante.value.trim() || !preco.value.trim() || !quantidadeEstoque.value.trim()) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // Validação da imagem: impede o envio se nenhuma imagem válida for selecionada
            if (imageBase64 === "https://cdn-icons-png.flaticon.com/512/847/847969.png") {
                 alert("Por favor, selecione uma imagem para o produto.");
                 return;
            }

            const produtoDTO = {
                nome: nome.value.trim(),
                descricao: descricao.value.trim(),
                cor: cor.value.trim(),
                fabricante: fabricante.value.trim(),
                preco: parseFloat(preco.value.trim()),
                quantidadeEstoque: parseInt(quantidadeEstoque.value.trim(), 10),
                imagem: imageBase64
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
                document.getElementById('avatarMedico').src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
                imageBase64 = "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // Reseta a imagem Base64
            } catch (error) {
                console.error("Erro na requisição:", error.response ? error.response.data : error.message);
                alert("Erro ao cadastrar produto. Verifique os dados e tente novamente.");
            }
        });
    }
});