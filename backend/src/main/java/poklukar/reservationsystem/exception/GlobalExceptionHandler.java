package poklukar.reservationsystem.exception;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.ConstraintViolationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import poklukar.reservationsystem.model.dto.ErrorBody;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    private ErrorBody buildError(String errorCode, String message, String path) {
        return new ErrorBody(errorCode, message, path);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ErrorBody> handleResponseStatusException(ResponseStatusException ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.resolve(ex.getStatusCode().value());
        String errorCode = status.name();

        log.warn("Handled ResponseStatusException: {} {} - {}", request.getMethod(), request.getRequestURI(), ex.getReason());
        return new ResponseEntity<>(
                buildError(errorCode, ex.getReason(), request.getRequestURI()),
                ex.getStatusCode()
        );
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorBody> handleConstraintViolation(ConstraintViolationException ex, HttpServletRequest request) {
        String message = ex.getConstraintViolations().stream()
                .map(v -> v.getPropertyPath() + ": " + v.getMessage())
                .findFirst()
                .orElse("Validation error");

        log.warn("400 Bad Request - Constraint violation: {} {} - {}", request.getMethod(), request.getRequestURI(), message);

        return new ResponseEntity<>(
                buildError("VALIDATION_ERROR", message, request.getRequestURI()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorBody> handleValidationException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        FieldError fieldError = ex.getBindingResult().getFieldErrors().stream().findFirst().orElse(null);
        String message = fieldError != null
                ? fieldError.getField() + ": " + fieldError.getDefaultMessage()
                : "Validation error";

        log.warn("400 Bad Request - Validation failed: {} {} - {}", request.getMethod(), request.getRequestURI(), message);

        return new ResponseEntity<>(
                buildError("VALIDATION_ERROR", message, request.getRequestURI()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorBody> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpServletRequest request) {
        log.warn("400 Bad Request - Missing or malformed JSON body at {} {}", request.getMethod(), request.getRequestURI());
        return new ResponseEntity<>(
                buildError("MALFORMED_JSON", "Malformed or missing request body", request.getRequestURI()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorBody> handleNotFound(NoHandlerFoundException ex, HttpServletRequest request) {
        log.warn("404 Not Found: {} {}", request.getMethod(), request.getRequestURI());
        return new ResponseEntity<>(
                buildError("NOT_FOUND", "Endpoint not found", request.getRequestURI()),
                HttpStatus.NOT_FOUND
        );
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorBody> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpServletRequest request) {
        log.warn("405 Method Not Allowed: {} {} - {}", request.getMethod(), request.getRequestURI(), ex.getMessage());
        return new ResponseEntity<>(
                buildError("METHOD_NOT_ALLOWED", "Method not allowed", request.getRequestURI()),
                HttpStatus.METHOD_NOT_ALLOWED
        );
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorBody> handleArgumentTypeMismatch(MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
        log.warn("400 Bad Request - Type Mismatch: {} {} - {}", request.getMethod(), request.getRequestURI(), ex.getMessage());
        return new ResponseEntity<>(
                buildError("TYPE_MISMATCH", "Invalid parameter type", request.getRequestURI()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public ResponseEntity<ErrorBody> handleMissingParams(MissingServletRequestParameterException ex, HttpServletRequest request) {
        log.warn("400 Bad Request - Missing param '{}': {} {}", ex.getParameterName(), request.getMethod(), request.getRequestURI());
        return new ResponseEntity<>(
                buildError("MISSING_PARAMETER", "Missing required parameter: " + ex.getParameterName(), request.getRequestURI()),
                HttpStatus.BAD_REQUEST
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorBody> handleGenericException(Exception ex, HttpServletRequest request) {
        log.error("500 Internal Server Error: {} {}", request.getMethod(), request.getRequestURI(), ex);
        return new ResponseEntity<>(
                buildError("INTERNAL_ERROR", "Unexpected error occurred", request.getRequestURI()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
