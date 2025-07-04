package poklukar.reservationsystem.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationRequest {

    @NotNull(message = "Resource ID must not be null")
    @Positive(message = "Resource ID must be a positive number")
    private Long resourceId;

    @NotBlank(message = "Title must not be blank")
    private String title;

    @NotNull(message = "Start time must not be null")
    private LocalDateTime startAt;

    @NotNull(message = "End time must not be null")
    private LocalDateTime endAt;
}
