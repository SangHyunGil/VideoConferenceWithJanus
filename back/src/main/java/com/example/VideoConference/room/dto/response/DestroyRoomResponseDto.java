package com.example.VideoConference.room.dto.response;

import com.example.VideoConference.room.dto.result.DestroyRoomResultDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DestroyRoomResponseDto {
    String result;
    String room;

    public static DestroyRoomResponseDto create(DestroyRoomResultDto resultDto) {
        return new DestroyRoomResponseDto(resultDto.getResponse().getVideoroom(), resultDto.getResponse().getRoom());
    }
}
