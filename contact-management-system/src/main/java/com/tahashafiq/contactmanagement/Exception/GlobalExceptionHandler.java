package com.tahashafiq.contactmanagement.Exception;

import com.tahashafiq.contactmanagement.payload.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse> handlerResourceNotFoundException(ResourceNotFoundException exception) {
        String message = exception.getMessage();
        ApiResponse build = ApiResponse.builder()
                .message(message)
                .success(false)
                .httpStatus(HttpStatus.NOT_FOUND).build();
        return  new ResponseEntity<>(build, HttpStatus.NOT_FOUND);
    };


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handlerException(Exception exception) {
        log.error("Something went wrong", exception);
        String message = exception.getMessage();
        ApiResponse build =ApiResponse.builder()
                .message(message)
                .success(false)
                .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR).build();
        return  new ResponseEntity<>(build, HttpStatus.INTERNAL_SERVER_ERROR);
    };
}
