package poklukar.reservationsystem.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import poklukar.reservationsystem.model.dto.ReservationRequest;
import poklukar.reservationsystem.model.dto.ReservationResponse;
import poklukar.reservationsystem.model.dto.ReservationResponseGroup;
import poklukar.reservationsystem.service.ReservationService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public List<ReservationResponse> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public ReservationResponse getReservationById(@Positive @PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @GetMapping("/grouped")
    public List<ReservationResponseGroup> getReservationsGroupedByResource(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return reservationService.getReservationsGroupedByResource(date);
    }

    @GetMapping("/range")
    public List<ReservationResponse> getReservationsInRange(
            @RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        return reservationService.getReservationsBetween(from, to);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservationResponse createReservation(@Valid @RequestBody ReservationRequest request) {
        return reservationService.createReservation(request);
    }

    @PutMapping("/{id}")
    public ReservationResponse updateReservation(@Positive @PathVariable Long id, @Valid @RequestBody ReservationRequest request) {
        return reservationService.updateReservation(id, request);
    }

    @DeleteMapping("/{id}")
    public ReservationResponse deleteReservation(@Positive @PathVariable Long id) {
        return reservationService.deleteReservation(id);
    }
}
