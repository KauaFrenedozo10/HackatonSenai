
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
            const quantidade = document.getElementById("quantidadeInput");
            const fotoInput = document.getElementById("uploadMedico");

            // Validação básica
            if (!nome.value.trim() || !descricao.value.trim() || !cor.value.trim() || !fabricante.value.trim() || !preco.value.trim() || !quantidade.value.trim()) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            if (!fotoInput.files || fotoInput.files.length === 0) {
                alert("Por favor, selecione uma imagem do produto.");
                return;
            }

            const formData = new FormData();
            const produtoDTO = {
                nome: nome.value.trim(),
                descricao: descricao.value.trim(),
                cor: cor.value.trim(),
                fabricante: fabricante.value.trim(),
                preco: parseFloat(preco.value.trim()),
                quantidade: parseInt(quantidade.value.trim(), 10),
                imagem: "temporario"
            };

            formData.append("imagem", fotoInput.files[0]);
            formData.append("produtoDTO", new Blob([JSON.stringify(produtoDTO)], {
                type: "application/json"
            }));

            try {
                const response = await axios.post("http://10.110.12.50:5000/produto/post", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                alert("Produto cadastrado com sucesso!");
                console.log(response.data);
                form.reset();
                document.getElementById('avatarMedico').src = "https://cdn-icons-png.flaticon.com/512/847/847969.png";
            } catch (error) {
                console.error(error);
                alert("Erro ao cadastrar produto. Verifique os dados e tente novamente.");
            }
        });
    }
});