package com.example.VideoConference.exception;

import com.example.VideoConference.response.Response;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {
    @ExceptionHandler(JanusRequestException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Response janusResultException() {
        return Response.failure(-101, "Janus 요청이 실패했습니다.");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response validationException(MethodArgumentNotValidException e) {
        return Response.failure(-102, e.getBindingResult().getFieldError().getDefaultMessage());
    }

    @ExceptionHandler(RoomNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Response roomNotFoundException() {
        return Response.failure(-103, "존재하지 않는 방입니다.");
    }
}
