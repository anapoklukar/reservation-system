package poklukar.reservationsystem.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
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
import poklukar.reservationsystem.util.ApiPaths;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Validated
@RestController
@RequestMapping(ApiPaths.RESERVATIONS)
@Tag(name = "Reservations", description = "Manage resource reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @Operation(summary = "Get all reservations")
    @GetMapping
    public List<ReservationResponse> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @Operation(summary = "Get a reservation by its ID")
    @GetMapping("/{id}")
    public ReservationResponse getReservationById(
            @Parameter(description = "Reservation ID", required = true)
            @Positive @PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @Operation(summary = "Get all reservations on a given date, grouped by resource")
    @GetMapping("/grouped")
    public List<ReservationResponseGroup> getReservationsGroupedByResource(
            @Parameter(description = "Date in format YYYY-MM-DD", required = true)
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return reservationService.getReservationsGroupedByResource(date);
    }

    @Operation(summary = "Get all reservations between two timestamps")
    @GetMapping("/range")
    public List<ReservationResponse> getReservationsInRange(
            @Parameter(description = "Start date-time (ISO)", required = true)
            @RequestParam(name = "from") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
            @Parameter(description = "End date-time (ISO)", required = true)
            @RequestParam(name = "to") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to
    ) {
        return reservationService.getReservationsBetween(from, to);
    }

    @Operation(summary = "Create a new reservation")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ReservationResponse createReservation(
            @Parameter(description = "Reservation data", required = true)
            @Valid @RequestBody ReservationRequest request) {
        return reservationService.createReservation(request);
    }

    @Operation(summary = "Update an existing reservation")
    @PutMapping("/{id}")
    public ReservationResponse updateReservation(
            @Parameter(description = "Reservation ID", required = true)
            @Positive @PathVariable Long id,
            @Parameter(description = "Updated reservation data", required = true)
            @Valid @RequestBody ReservationRequest request) {
        return reservationService.updateReservation(id, request);
    }

    @Operation(summary = "Delete a reservation by ID")
    @DeleteMapping("/{id}")
    public ReservationResponse deleteReservation(
            @Parameter(description = "Reservation ID", required = true)
            @Positive @PathVariable Long id) {
        return reservationService.deleteReservation(id);
    }
}
