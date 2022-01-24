package com.example.VideoConference.room.dto.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoomResultDto {
    private String janus;
    private String transaction;
    private CreateRoomResultResponseDto response;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class CreateRoomResultResponseDto {
        private String videoroom;
        private Long room;
        private String permanent;
    }
}
