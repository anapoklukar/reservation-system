package poklukar.reservationsystem;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
class ResourceReservationIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    private String resourcesUrl;
    private String reservationsUrl;
    private HttpHeaders jsonHeaders;

    @BeforeEach
    void setUp() {
        resourcesUrl = "http://localhost:" + port + "/api/resources";
        reservationsUrl = "http://localhost:" + port + "/api/reservations";

        jsonHeaders = new HttpHeaders();
        jsonHeaders.setContentType(MediaType.APPLICATION_JSON);
    }

    @Test
    void testResourceAndReservationLifecycle() {
        // Create a resource first
        Long resourceId = createResource();

        // Test the complete lifecycle
        Long reservationId = createReservation(resourceId);
        verifyReservationExists(reservationId);
        deleteReservation(reservationId);
        deleteResource(resourceId);
    }

    private Long createResource() {
        String resourceJson = """
            {
                "name": "E2E Test Room"
            }
            """;

        HttpEntity<String> request = new HttpEntity<>(resourceJson, jsonHeaders);
        ResponseEntity<Map> response = restTemplate.postForEntity(resourcesUrl, request, Map.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode(),
                "Resource creation should return CREATED status");

        Long resourceId = extractId(response.getBody());
        assertNotNull(resourceId, "Created resource should have an ID");

        return resourceId;
    }

    private Long createReservation(Long resourceId) {
        String reservationJson = String.format("""
            {
                "resourceId": %d,
                "title": "E2E Reservation",
                "startAt": "2025-08-01T10:00:00",
                "endAt": "2025-08-01T11:00:00"
            }
            """, resourceId);

        HttpEntity<String> request = new HttpEntity<>(reservationJson, jsonHeaders);
        ResponseEntity<Map> response = restTemplate.postForEntity(reservationsUrl, request, Map.class);

        assertEquals(HttpStatus.CREATED, response.getStatusCode(),
                "Reservation creation should return CREATED status");

        Long reservationId = extractId(response.getBody());
        assertNotNull(reservationId, "Created reservation should have an ID");

        return reservationId;
    }

    private void verifyReservationExists(Long reservationId) {
        String getUrl = reservationsUrl + "/" + reservationId;
        ResponseEntity<String> response = restTemplate.getForEntity(getUrl, String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode(),
                "Getting reservation should return OK status");
        assertTrue(response.getBody().contains("E2E Reservation"),
                "Response should contain the reservation title");
    }

    private void deleteReservation(Long reservationId) {
        String deleteUrl = reservationsUrl + "/" + reservationId;
        ResponseEntity<String> response = restTemplate.exchange(
                deleteUrl, HttpMethod.DELETE, null, String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode(),
                "Reservation deletion should return OK status");
    }

    private void deleteResource(Long resourceId) {
        String deleteUrl = resourcesUrl + "/" + resourceId;
        ResponseEntity<String> response = restTemplate.exchange(
                deleteUrl, HttpMethod.DELETE, null, String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode(),
                "Resource deletion should return OK status");
    }

    private Long extractId(Map<String, Object> responseBody) {
        return ((Number) responseBody.get("id")).longValue();
    }
}