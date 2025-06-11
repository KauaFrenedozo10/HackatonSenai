package com.atividade.hackaton.repository;

import com.atividade.hackaton.entity.ImagemProduto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImagemProdutoRepository extends JpaRepository<ImagemProduto, Long> {
    // Você pode adicionar métodos personalizados aqui, se precisar buscar imagens por produto_id, por exemplo
    List<ImagemProduto> findByProdutoId(Long produtoId);
}