package com.atividade.hackaton.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProdutoDTO {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String nome;
    private String descricao; // Mantido como 'descricao'
    private String cor; // Adicionado de volta
    private String fabricante; // Adicionado de volta
    private Double preco;
    private Integer quantidadeEstoque; // Mantido como 'quantidadeEstoque'
    private String imagem; // Adicionado de volta

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

    public String getTextoDescritivo() {
        return textoDescritivo;
    }

    public void setTextoDescritivo(String textoDescritivo) {
        this.textoDescritivo = textoDescritivo;
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

    public String getCor() { // Adicionado de volta
        return cor;
    }

    public void setCor(String cor) { // Adicionado de volta
        this.cor = cor;
    }

    public String getFabricante() { // Adicionado de volta
        return fabricante;
    }

    public void setFabricante(String fabricante) { // Adicionado de volta
        this.fabricante = fabricante;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
    }

    public String getImagem() {
        return imagem;
    }

    public void setImagem(String imagem) {
        this.imagem = imagem;
    }

    public String getImagem() { // Adicionado de volta
        return imagem;
    }

    public void setImagem(String imagem) { // Adicionado de volta
        this.imagem = imagem;
    }
}