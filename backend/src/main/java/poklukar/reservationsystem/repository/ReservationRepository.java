package poklukar.reservationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import poklukar.reservationsystem.model.entity.Reservation;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    @Query("SELECT r FROM Reservation r ORDER BY r.id ASC")
    List<Reservation> getAllReservations();

    @Query("SELECT r FROM Reservation r WHERE r.id = :id")
    Reservation getReservationById(Long id);

    @Query("""
        SELECT r FROM Reservation r
        WHERE r.startAt >= :startOfDay AND r.startAt <= :endOfDay
        ORDER BY r.startAt ASC
    """)
    List<Reservation> getReservationsByDate(LocalDateTime startOfDay, LocalDateTime endOfDay);


    @Query("""
        SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END
        FROM Reservation r
        WHERE r.resource.id = :resourceId
          AND r.startAt < :end
          AND r.endAt > :start
    """)
    boolean hasConflict(Long resourceId, LocalDateTime start, LocalDateTime end);

    @Query("""
        SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END
        FROM Reservation r
        WHERE r.resource.id = :resourceId
          AND r.id <> :excludeId
          AND r.startAt < :end
          AND r.endAt > :start
    """)
    boolean hasConflictExcludingId(Long resourceId, Long excludeId, LocalDateTime start, LocalDateTime end);

}
