package com.example.VideoConference.room.dto.response;

import com.example.VideoConference.room.domain.Room;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EditRoomResponseDto {
    private Long number;
    private String description;
    private String pin;
    private String username;

    public static EditRoomResponseDto create(Room room) {
        return new EditRoomResponseDto(room.getNumber(), room.getDescription(),
                room.getPin(), room.getUsername());
    }
}
