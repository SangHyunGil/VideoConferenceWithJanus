package com.example.VideoConference.room.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestroyRoomRequestDto {
    private String request;
    private Long room;

    public static DestroyRoomRequestDto create(Long roomId) {
        return new DestroyRoomRequestDto("destroy", roomId);
    }
}
