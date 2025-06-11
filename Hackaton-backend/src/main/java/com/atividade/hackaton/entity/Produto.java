package com.atividade.hackaton.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "produtos") // Garante que o nome da tabela seja 'produtos'
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String descricao; // Alterado de textoDescritivo para descricao para alinhar com DTO e frontend
    private String cor;
    private String fabricante;
    private Double preco;
    private Integer quantidade; // Renomeado para 'quantidade' para corresponder ao SQL fornecido

    // Relacionamento One-to-Many com ImagemProduto
    // mappedBy indica o campo na entidade ImagemProduto que gerencia a relação
    // CascadeType.ALL significa que operações (persist, remove, merge, etc.) em Produto serão propagadas para ImagemProduto
    // orphanRemoval = true garante que imagens órfãs (desassociadas de um produto) sejam removidas
    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ImagemProduto> imagens = new ArrayList<>();

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() { // Getter para 'descricao'
        return descricao;
    }

    public void setDescricao(String descricao) { // Setter para 'descricao'
        this.descricao = descricao;
    }

    public String getCor() {
        return cor;
    }

    public void setCor(String cor) {
        this.cor = cor;
    }

    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getQuantidade() { // Getter para 'quantidade'
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) { // Setter para 'quantidade'
        this.quantidade = quantidade;
    }

    public List<ImagemProduto> getImagens() {
        return imagens;
    }

    public void setImagens(List<ImagemProduto> imagens) {
        this.imagens = imagens;
        // Garante que o lado 'filho' (ImagemProduto) tenha a referência correta ao 'pai' (Produto)
        for (ImagemProduto imagem : imagens) {
            imagem.setProduto(this);
        }
    }

    // Método de conveniência para adicionar uma única imagem
    public void addImagem(ImagemProduto imagem) {
        this.imagens.add(imagem);
        imagem.setProduto(this);
    }

    // Método de conveniência para remover uma única imagem
    public void removeImagem(ImagemProduto imagem) {
        this.imagens.remove(imagem);
        imagem.setProduto(null);
    }
}