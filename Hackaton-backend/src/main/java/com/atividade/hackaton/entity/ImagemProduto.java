package com.atividade.hackaton.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "imagens_produto") // Garante que o nome da tabela seja 'imagens_produto'
public class ImagemProduto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "url_imagem", nullable = false, length = 250) // Nome da coluna e restrições
    private String urlImagem;

    // Relacionamento Many-to-One com Produto
    // JoinColumn indica a coluna de chave estrangeira (produto_id)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }
}