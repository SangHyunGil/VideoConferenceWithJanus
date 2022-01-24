package com.example.VideoConference.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JanusRequest {
    private String janus;
    private String plugin;
    private String transaction;
    private String admin_secret;
    private Object request;

    public static JanusRequest create(String transaction, String adminSecret, Object requestDto) {
        return new JanusRequest("message_plugin", "janus.plugin.videoroom", transaction, adminSecret, requestDto);
    }
}
