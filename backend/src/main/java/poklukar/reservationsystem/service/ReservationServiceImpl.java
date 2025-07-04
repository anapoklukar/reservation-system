package poklukar.reservationsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import poklukar.reservationsystem.model.dto.ReservationRequest;
import poklukar.reservationsystem.model.dto.ReservationResponse;
import poklukar.reservationsystem.model.dto.ReservationResponseGroup;
import poklukar.reservationsystem.model.entity.Reservation;
import poklukar.reservationsystem.model.entity.Resource;
import poklukar.reservationsystem.repository.ReservationRepository;
import poklukar.reservationsystem.repository.ResourceRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ResourceRepository resourceRepository;

    @Autowired
    public ReservationServiceImpl(ReservationRepository reservationRepository, ResourceRepository resourceRepository) {
        this.reservationRepository = reservationRepository;
        this.resourceRepository = resourceRepository;
    }

    @Override
    public List<ReservationResponse> getAllReservations() {
        return reservationRepository.getAllReservations().stream()
                .map(this::mapToReservationResponse)
                .toList();
    }

    @Override
    public ReservationResponse getReservationById(Long id) {
        Reservation reservation = getReservationEntityById(id);
        return mapToReservationResponse(reservation);
    }

    @Override
    public List<ReservationResponseGroup> getReservationsGroupedByResource(LocalDate date) {
        validateDate(date);

        List<Reservation> allReservations = getReservationsByDate(date);

        if (allReservations.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No reservations found for this day");
        }

        Map<Resource, List<Reservation>> grouped = allReservations.stream()
                .collect(Collectors.groupingBy(Reservation::getResource));

        return grouped.entrySet().stream()
                .map(this::mapToReservationResponseGroup)
                .toList();
    }

    @Override
    public ReservationResponse createReservation(ReservationRequest request) {
        if (request.getStartAt() == null || request.getEndAt() == null ||
                request.getEndAt().isBefore(request.getStartAt())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid start/end time");
        }
        validateSameDay(request.getStartAt(), request.getEndAt());

        Resource resource = getResourceEntityById(request.getResourceId());
        validateNoConflict(resource.getId(), request.getStartAt(), request.getEndAt());

        Reservation reservation = buildReservation(request, resource);
        Reservation saved = reservationRepository.save(reservation);

        return mapToReservationResponse(saved);
    }

    @Override
    public ReservationResponse updateReservation(Long id, ReservationRequest request) {
        if (request.getStartAt() == null || request.getEndAt() == null ||
                request.getEndAt().isBefore(request.getStartAt())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid start/end time");
        }
        validateSameDay(request.getStartAt(), request.getEndAt());

        Reservation existingReservation = getReservationEntityById(id);
        Resource targetResource = getResourceEntityById(request.getResourceId());

        validateNoConflictExcludingId(targetResource.getId(), id, request.getStartAt(), request.getEndAt());

        if (hasNoChanges(existingReservation, request)) {
            return mapToReservationResponse(existingReservation);
        }

        updateReservationFields(existingReservation, request, targetResource);
        Reservation updated = reservationRepository.save(existingReservation);

        return mapToReservationResponse(updated);
    }

    @Override
    public ReservationResponse deleteReservation(Long id) {
        Reservation reservation = getReservationEntityById(id);
        reservationRepository.deleteById(id);

        return mapToReservationResponse(reservation);
    }

    @Override
    public List<Reservation> getReservationsByDate(LocalDate date) {
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);
        return reservationRepository.getReservationsByDate(startOfDay, endOfDay);
    }

    @Override
    public List<ReservationResponse> getReservationsBetween(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null || end.isBefore(start)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid start/end range");
        }

        List<Reservation> reservations = reservationRepository.getReservationsByDate(start, end);
        return reservations.stream()
                .map(this::mapToReservationResponse)
                .toList();
    }


    @Override
    public boolean hasConflict(Long resourceId, LocalDateTime start, LocalDateTime end) {
        return reservationRepository.hasConflict(resourceId, start, end);
    }

    @Override
    public boolean hasConflictExcludingId(Long resourceId, Long excludeId, LocalDateTime start, LocalDateTime end) {
        return reservationRepository.hasConflictExcludingId(resourceId, excludeId, start, end);
    }

    private void validateDate(LocalDate date) {
        if (date == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date is required");
        }
    }

    private void validateSameDay(LocalDateTime start, LocalDateTime end) {
        if (!start.toLocalDate().equals(end.toLocalDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Reservation must start and end on the same day");
        }
    }

    private void validateNoConflict(Long resourceId, LocalDateTime start, LocalDateTime end) {
        if (hasConflict(resourceId, start, end)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Reservation time conflicts with an existing reservation");
        }
    }

    private void validateNoConflictExcludingId(Long resourceId, Long excludeId, LocalDateTime start, LocalDateTime end) {
        if (hasConflictExcludingId(resourceId, excludeId, start, end)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Time slot already taken for this resource");
        }
    }

    private Reservation getReservationEntityById(Long id) {
        Reservation reservation = reservationRepository.getReservationById(id);
        if (reservation == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Reservation not found with ID: " + id);
        }
        return reservation;
    }

    private Resource getResourceEntityById(Long resourceId) {
        Resource resource = resourceRepository.getResourceById(resourceId);
        if (resource == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found with ID: " + resourceId);
        }
        return resource;
    }

    private boolean hasNoChanges(Reservation existing, ReservationRequest request) {
        return existing.getTitle().equals(request.getTitle()) &&
                existing.getStartAt().equals(request.getStartAt()) &&
                existing.getEndAt().equals(request.getEndAt()) &&
                existing.getResource().getId().equals(request.getResourceId());
    }

    private Reservation buildReservation(ReservationRequest request, Resource resource) {
        Reservation reservation = new Reservation();
        reservation.setResource(resource);
        reservation.setTitle(request.getTitle());
        reservation.setStartAt(request.getStartAt());
        reservation.setEndAt(request.getEndAt());
        return reservation;
    }

    private void updateReservationFields(Reservation reservation, ReservationRequest request, Resource resource) {
        reservation.setTitle(request.getTitle());
        reservation.setStartAt(request.getStartAt());
        reservation.setEndAt(request.getEndAt());
        reservation.setResource(resource);
    }

    private ReservationResponse mapToReservationResponse(Reservation reservation) {
        return new ReservationResponse(
                reservation.getId(),
                reservation.getResource().getId(),
                reservation.getTitle(),
                reservation.getStartAt(),
                reservation.getEndAt()
        );
    }

    private ReservationResponseGroup mapToReservationResponseGroup(Map.Entry<Resource, List<Reservation>> entry) {
        return new ReservationResponseGroup(
                entry.getKey().getId(),
                entry.getKey().getName(),
                entry.getValue().stream()
                        .map(this::mapToReservationResponse)
                        .toList()
        );
    }
}
