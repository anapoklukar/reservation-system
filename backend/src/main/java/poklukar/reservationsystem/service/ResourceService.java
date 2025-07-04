package poklukar.reservationsystem.service;

import poklukar.reservationsystem.model.dto.ResourceRequest;
import poklukar.reservationsystem.model.dto.ResourceResponse;

import java.util.List;

public interface ResourceService {
    List<ResourceResponse> getAllResources();
    ResourceResponse getResourceById(Long id);
    ResourceResponse createResource(ResourceRequest request);
    ResourceResponse updateResource(Long id, ResourceRequest request);
    ResourceResponse deleteResource(Long id);
}