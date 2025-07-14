package poklukar.reservationsystem.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Reservation System API",
                version = "1.0.0",
                description = "API for managing resources and their reservations"
        ))
public class OpenApiConfig {}
