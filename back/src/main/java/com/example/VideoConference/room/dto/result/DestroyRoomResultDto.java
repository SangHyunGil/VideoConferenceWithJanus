package com.example.VideoConference.room.dto.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestroyRoomResultDto {
    private String janus;
    private String transaction;
    private DestroyRoomResultResponseDto response;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class DestroyRoomResultResponseDto {
        private String videoroom;
        private String room;
    }
}
