package com.example.VideoConference.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Response<T> {
    private boolean success;
    private int code;
    private T data;

    public static <T> Response success(T data) {
        return new Response(true, 200, data);
    }

    public static Response failure(int code, String msg) {
        return new Response(false, code, msg);
    }
}
