package poklukar.reservationsystem.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import poklukar.reservationsystem.model.dto.ResourceRequest;
import poklukar.reservationsystem.model.dto.ResourceResponse;
import poklukar.reservationsystem.service.ResourceService;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService resourceService;

    @Autowired
    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @GetMapping
    public List<ResourceResponse> getAllResources() {
        return resourceService.getAllResources();
    }

    @GetMapping("/{id}")
    public ResourceResponse getResourceById(@Positive @PathVariable Long id) {
        return resourceService.getResourceById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceResponse createResource(@Valid @RequestBody ResourceRequest request) {
        return resourceService.createResource(request);
    }

    @PutMapping("/{id}")
    public ResourceResponse updateResource(@Positive @PathVariable Long id, @Valid @RequestBody ResourceRequest request) {
        return resourceService.updateResource(id, request);
    }

    @DeleteMapping("/{id}")
    public ResourceResponse deleteResource(@Positive @PathVariable Long id) {
        return resourceService.deleteResource(id);
    }
}
