package com.atividade.hackaton.service;

import com.atividade.hackaton.dto.ProdutoDTO;
import com.atividade.hackaton.entity.ImagemProduto;
import com.atividade.hackaton.entity.Produto;
import com.atividade.hackaton.repository.ImagemProdutoRepository; // Importar novo repositório
import com.atividade.hackaton.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // Importar para transações

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ImagemProdutoRepository imagemProdutoRepository; // Injete o novo repositório

    @Transactional // Garante que a operação seja atômica
    public ProdutoDTO criarProduto(ProdutoDTO produtoDTO) {
        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao()); // Corrigido para 'descricao'
        produto.setCor(produtoDTO.getCor());
        produto.setFabricante(produtoDTO.getFabricante());
        produto.setPreco(produtoDTO.getPreco());
        produto.setQuantidade(produtoDTO.getQuantidade()); // Corrigido para 'quantidade'

        // Salvar o produto primeiro para obter o ID
        Produto produtoSalvo = produtoRepository.save(produto);

        // Adicionar imagens associadas
        if (produtoDTO.getUrlsImagens() != null && !produtoDTO.getUrlsImagens().isEmpty()) {
            for (String url : produtoDTO.getUrlsImagens()) {
                ImagemProduto imagem = new ImagemProduto();
                imagem.setUrlImagem(url);
                imagem.setProduto(produtoSalvo); // Associa a imagem ao produto
                imagemProdutoRepository.save(imagem); // Salva a imagem
            }
        }
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

    @Transactional // Garante que a operação seja atômica
    public ProdutoDTO atualizarProduto(Long id, ProdutoDTO produtoDTO) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com id: " + id));

        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao()); // Corrigido para 'descricao'
        produto.setCor(produtoDTO.getCor());
        produto.setFabricante(produtoDTO.getFabricante());
        produto.setPreco(produtoDTO.getPreco());
        produto.setQuantidade(produtoDTO.getQuantidade()); // Corrigido para 'quantidade'

        // Remover imagens antigas
        produto.getImagens().clear(); // Isso aciona o orphanRemoval = true e remove do DB

        // Adicionar novas imagens
        if (produtoDTO.getUrlsImagens() != null && !produtoDTO.getUrlsImagens().isEmpty()) {
            for (String url : produtoDTO.getUrlsImagens()) {
                ImagemProduto imagem = new ImagemProduto();
                imagem.setUrlImagem(url);
                imagem.setProduto(produto);
                produto.addImagem(imagem); // Adiciona à lista da entidade Produto
            }
        }

        Produto produtoAtualizado = produtoRepository.save(produto); // Salva o produto e, devido ao Cascade, as imagens
        return converterParaDTO(produtoAtualizado);
    }

    public void deletarProduto(Long id) {
        if (!produtoRepository.existsById(id)) {
            throw new EntityNotFoundException("Produto não encontrado com id: " + id);
        }
        produtoRepository.deleteById(id); // O CascadeType.ALL em Produto vai deletar as imagens associadas
    }

    private ProdutoDTO converterParaDTO(Produto produto) {
        ProdutoDTO produtoDTO = new ProdutoDTO();
        produtoDTO.setId(produto.getId());
        produtoDTO.setNome(produto.getNome());
        produtoDTO.setDescricao(produto.getDescricao()); // Corrigido para 'descricao'
        produtoDTO.setCor(produto.getCor());
        produtoDTO.setFabricante(produto.getFabricante());
        produtoDTO.setPreco(produto.getPreco());
        produtoDTO.setQuantidade(produto.getQuantidade()); // Corrigido para 'quantidade'

        // Mapear URLs das imagens
        if (produto.getImagens() != null) {
            produtoDTO.setUrlsImagens(
                    produto.getImagens().stream()
                            .map(ImagemProduto::getUrlImagem)
                            .collect(Collectors.toList())
            );
        } else {
            produtoDTO.setUrlsImagens(List.of()); // Retorna lista vazia se não houver imagens
        }

        return produtoDTO;
    }
}