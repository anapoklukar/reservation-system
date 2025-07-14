package poklukar.reservationsystem.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import poklukar.reservationsystem.model.dto.ResourceRequest;
import poklukar.reservationsystem.model.dto.ResourceResponse;
import poklukar.reservationsystem.service.ResourceService;
import poklukar.reservationsystem.util.ApiPaths;

import java.util.List;

@Validated
@RestController
@RequestMapping(ApiPaths.RESOURCES)
@Tag(name = "Resources", description = "Endpoints for managing resources")
public class ResourceController {

    private final ResourceService resourceService;

    @Autowired
    public ResourceController(ResourceService resourceService) {
        this.resourceService = resourceService;
    }

    @Operation(summary = "Get all resources")
    @GetMapping
    public List<ResourceResponse> getAllResources() {
        return resourceService.getAllResources();
    }

    @Operation(summary = "Get a resource by its ID")
    @GetMapping("/{id}")
    public ResourceResponse getResourceById(
            @Parameter(description = "Resource ID", required = true)
            @Positive @PathVariable Long id) {
        return resourceService.getResourceById(id);
    }

    @Operation(summary = "Create a new resource")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResourceResponse createResource(
            @Parameter(description = "Resource data", required = true)
            @Valid @RequestBody ResourceRequest request) {
        return resourceService.createResource(request);
    }

    @Operation(summary = "Update an existing resource")
    @PutMapping("/{id}")
    public ResourceResponse updateResource(
            @Parameter(description = "Resource ID", required = true)
            @Positive @PathVariable Long id,
            @Parameter(description = "Updated resource data", required = true)
            @Valid @RequestBody ResourceRequest request) {
        return resourceService.updateResource(id, request);
    }

    @Operation(summary = "Delete a resource by its ID")
    @DeleteMapping("/{id}")
    public ResourceResponse deleteResource(
            @Parameter(description = "Resource ID", required = true)
            @Positive @PathVariable Long id) {
        return resourceService.deleteResource(id);
    }
}
