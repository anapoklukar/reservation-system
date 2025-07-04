package poklukar.reservationsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import poklukar.reservationsystem.model.entity.Resource;

import java.util.List;

@Repository
public interface ResourceRepository extends JpaRepository<Resource, Long> {

    @Query("SELECT r FROM Resource r ORDER BY r.id ASC")
    List<Resource> getAllResources();

    @Query("SELECT r FROM Resource r WHERE r.id = :id")
    Resource getResourceById(Long id);

    @Query("SELECT r FROM Resource r WHERE r.name = :name")
    Resource getResourceByName(String name);
}
