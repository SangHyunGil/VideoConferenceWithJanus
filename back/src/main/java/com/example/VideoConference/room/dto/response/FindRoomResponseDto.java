package com.example.VideoConference.room.dto.response;

import com.example.VideoConference.room.domain.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindRoomResponseDto {
    private Long number;
    private String description;
    private Boolean hasPin;
    private String username;

    public static FindRoomResponseDto create(Room room) {
        return new FindRoomResponseDto(room.getNumber(), room.getDescription(),
                room.getPin() != null, room.getUsername());
    }
}
