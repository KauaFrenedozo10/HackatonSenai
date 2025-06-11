package com.atividade.hackaton.service;

import com.atividade.hackaton.dto.ProdutoDTO;
import com.atividade.hackaton.entity.Produto;
import com.atividade.hackaton.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository; // Pacote do repositório já está correto

    public ProdutoDTO criarProduto(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao()); // Mantido 'descricao'
        produto.setCor(produtoDTO.getCor()); // Adicionado
        produto.setFabricante(produtoDTO.getFabricante()); // Adicionado
        produto.setPreco(produtoDTO.getPreco());
        produto.setQuantidadeEstoque(produtoDTO.getQuantidadeEstoque()); // Mantido 'quantidadeEstoque'
        produto.setImagem(produtoDTO.getImagem()); // Adicionado

        Produto produtoSalvo = produtoRepository.save(produto);
        return converterParaDTO(produtoSalvo);
    }

    public List<ProdutoDTO> listarProdutos() {
        return produtoRepository.findAll().stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    public ProdutoDTO obterProdutoPorId(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com id: " + id));
        return converterParaDTO(produto);
    }

    public ProdutoDTO atualizarProduto(Long id, ProdutoDTO produtoDTO) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com id: " + id));

        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao()); // Mantido 'descricao'
        produto.setCor(produtoDTO.getCor()); // Adicionado
        produto.setFabricante(produtoDTO.getFabricante()); // Adicionado
        produto.setPreco(produtoDTO.getPreco());
        produto.setQuantidadeEstoque(produtoDTO.getQuantidadeEstoque()); // Mantido 'quantidadeEstoque'
        produto.setImagem(produtoDTO.getImagem()); // Adicionado

        Produto produtoAtualizado = produtoRepository.save(produto);
        return converterParaDTO(produtoAtualizado);
    }

    public void deletarProduto(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new EntityNotFoundException("Produto não encontrado com id: " + id);
        }
        produtoRepository.deleteById(id);
    }

    private ProdutoDTO converterParaDTO(Produto produto) {
        ProdutoDTO produtoDTO = new ProdutoDTO();
        produtoDTO.setId(produto.getId());
        produtoDTO.setNome(produto.getNome());
        produtoDTO.setDescricao(produto.getDescricao()); // Mantido 'descricao'
        produtoDTO.setCor(produto.getCor()); // Adicionado
        produtoDTO.setFabricante(produto.getFabricante()); // Adicionado
        produtoDTO.setPreco(produto.getPreco());
        produtoDTO.setQuantidadeEstoque(produto.getQuantidadeEstoque()); // Mantido 'quantidadeEstoque'
        produtoDTO.setImagem(produto.getImagem()); // Adicionado
        return produtoDTO;
    }
}