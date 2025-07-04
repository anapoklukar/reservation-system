package poklukar.reservationsystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import poklukar.reservationsystem.model.dto.ResourceRequest;
import poklukar.reservationsystem.model.dto.ResourceResponse;
import poklukar.reservationsystem.model.entity.Resource;
import poklukar.reservationsystem.repository.ResourceRepository;

import java.util.List;

@Service
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;

    @Autowired
    public ResourceServiceImpl(ResourceRepository resourceRepository) {
        this.resourceRepository = resourceRepository;
    }

    @Override
    public List<ResourceResponse> getAllResources() {
        return resourceRepository.getAllResources().stream()
                .map(this::mapToResourceResponse)
                .toList();
    }

    @Override
    public ResourceResponse getResourceById(Long id) {
        Resource resource = resourceRepository.getResourceById(id);
        if (resource == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found with ID: " + id);
        }

        return mapToResourceResponse(resource);
    }

    @Override
    public ResourceResponse createResource(ResourceRequest request) {
        validateResourceNameUnique(request.getName());

        Resource newResource = new Resource();
        newResource.setName(request.getName());

        Resource saved = resourceRepository.save(newResource);
        return mapToResourceResponse(saved);
    }

    @Override
    public ResourceResponse updateResource(Long id, ResourceRequest request) {
        Resource existing = resourceRepository.getResourceById(id);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found with ID: " + id);
        }

        validateResourceNameUniqueForUpdate(request.getName(), id);

        existing.setName(request.getName());
        Resource updated = resourceRepository.save(existing);
        return mapToResourceResponse(updated);
    }

    @Override
    public ResourceResponse deleteResource(Long id) {
        Resource resource = resourceRepository.getResourceById(id);
        if (resource == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resource not found with ID: " + id);
        }

        resourceRepository.deleteById(id);
        return mapToResourceResponse(resource);
    }

    private void validateResourceNameUnique(String name) {
        Resource existing = resourceRepository.getResourceByName(name);
        if (existing != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Resource with that name already exists");
        }
    }

    private void validateResourceNameUniqueForUpdate(String name, Long currentId) {
        Resource existing = resourceRepository.getResourceByName(name);
        if (existing != null && !existing.getId().equals(currentId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Another resource with that name already exists");
        }
    }

    private ResourceResponse mapToResourceResponse(Resource resource) {
        return new ResourceResponse(resource.getId(), resource.getName());
    }
}