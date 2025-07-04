package poklukar.reservationsystem.service;

import org.springframework.stereotype.Service;
import poklukar.reservationsystem.model.entity.Reservation;
import poklukar.reservationsystem.model.dto.ReservationRequest;
import poklukar.reservationsystem.model.dto.ReservationResponse;
import poklukar.reservationsystem.model.dto.ReservationResponseGroup;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public interface ReservationService {
    List<ReservationResponse> getAllReservations();
    ReservationResponse getReservationById(Long id);
    List<ReservationResponseGroup> getReservationsGroupedByResource(LocalDate date);
    ReservationResponse createReservation(ReservationRequest request);
    ReservationResponse updateReservation(Long id, ReservationRequest request);
    ReservationResponse deleteReservation(Long id);
    List<Reservation> getReservationsByDate(LocalDate date);
    List<ReservationResponse> getReservationsBetween(LocalDateTime start, LocalDateTime end);
    boolean hasConflict(Long resourceId, LocalDateTime start, LocalDateTime end);
    boolean hasConflictExcludingId(Long resourceId, Long excludeId, LocalDateTime start, LocalDateTime end);
}
