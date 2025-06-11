// Principal/PrincipalJS.js
let imagemBase64 = "https://cdn-icons-png.flaticon.com/512/847/847969.png"; // Valor inicial para o avatar padrão

document.addEventListener("DOMContentLoaded", () => {
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
            const descricao = document.getElementById("descricaoInput"); // `descricao` é o ID do input no HTML
            const cor = document.getElementById("corInput");
            const fabricante = document.getElementById("fabricanteInput");
            const preco = document.getElementById("precoInput");
            const quantidade = document.getElementById("quantidadeInput");
            // const fotoInput = document.getElementById("uploadMedico"); // Não precisamos mais do file input diretamente aqui

            // Validação básica
            if (!nome.value.trim() || !descricao.value.trim() || !cor.value.trim() || !fabricante.value.trim() || !preco.value.trim() || !quantidade.value.trim()) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // Não é mais necessário verificar fotoInput.files, pois a imagem já estaria no `imageBase64`
            // if (!fotoInput.files || fotoInput.files.length === 0) {
            //     alert("Por favor, selecione uma imagem do produto.");
            //     return;
            // }

            const produtoDTO = {
                nome: nome.value.trim(),
                textoDescritivo: descricao.value.trim(), // CORREÇÃO AQUI
                cor: cor.value.trim(),
                fabricante: fabricante.value.trim(),
                preco: parseFloat(preco.value.trim()),
                quantidade: parseInt(quantidade.value.trim(), 10),
                imagem: imagemBase64 // Envia a imagem em Base64
            };

            try {
                // Remove FormData e envia JSON diretamente
                const response = await axios.post("http://localhost:8080/api/produtos", produtoDTO, {
                    headers: {
                        "Content-Type": "application/json" // Define o Content-Type como JSON
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