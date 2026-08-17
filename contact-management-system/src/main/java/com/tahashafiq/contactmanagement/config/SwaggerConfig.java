package com.tahashafiq.contactmanagement.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI myCustomConfig(){
        return  new OpenAPI()
                .info(
                        new Info()
                                .title("Contact Management APP")
                                .description("Created By Taha Shafiq as 10Pearls Shine Internship Project"))
                .servers(
                        Arrays.asList( new Server()
                                .url("http://localhost:8080")
                                .description("local")
                ))
                .tags(Arrays.asList(
                        new Tag().name("Admin Apis"),
                        new Tag().name("Public Apis"),
                        new Tag().name("User Apis"),
                        new Tag().name("Contact Apis")
                ))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components().addSecuritySchemes(
                        "bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .in(SecurityScheme.In.HEADER)
                                .name("Authorization")
                ));
    }
}
