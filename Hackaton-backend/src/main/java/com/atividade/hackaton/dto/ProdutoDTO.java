package com.atividade.hackaton.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List; // Importar List

public class ProdutoDTO {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;
    private String nome;
    private String descricao; // Alterado de textoDescritivo para descricao para alinhar com o SQL
    private String cor;
    private String fabricante;
    private Double preco;
    private Integer quantidade; // Renomeado para 'quantidade' para corresponder ao SQL fornecido
    private List<String> urlsImagens; // Adicionado para lidar com múltiplas URLs de imagem

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

<<<<<<< HEAD
    public String getDescricao() { // Getter para 'descricao'
        return descricao;
    }

    public void setDescricao(String descricao) { // Setter para 'descricao'
        this.descricao = descricao;
=======
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
>>>>>>> a903f2f8cfaa73ea7190777acbad244952e7a59b
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

<<<<<<< HEAD
    public Integer getQuantidade() { // Getter para 'quantidade'
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) { // Setter para 'quantidade'
        this.quantidade = quantidade;
=======
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
>>>>>>> a903f2f8cfaa73ea7190777acbad244952e7a59b
    }

    public List<String> getUrlsImagens() {
        return urlsImagens;
    }

    public void setUrlsImagens(List<String> urlsImagens) {
        this.urlsImagens = urlsImagens;
    }
}