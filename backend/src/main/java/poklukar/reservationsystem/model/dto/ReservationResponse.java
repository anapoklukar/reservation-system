package poklukar.reservationsystem.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponse {
    private Long id;
    private Long resourceId;
    private String title;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
}
