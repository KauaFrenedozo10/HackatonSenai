// src/main/java/com/atividade/hackaton/config/CorsConfig.java
package com.atividade.hackaton.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins(
                        "http://localhost",
                        "http://localhost:8080", // Adicionado por precaução, se for acessar o frontend de outra forma
                        "http://127.0.0.1:5500", // <--- Adicione esta linha
                        "null" // Para casos de abertura direta do arquivo HTML
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}