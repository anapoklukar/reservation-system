package poklukar.reservationsystem.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationResponseGroup {
    private Long resourceId;
    private String resourceName;
    private List<ReservationResponse> reservations;
}
