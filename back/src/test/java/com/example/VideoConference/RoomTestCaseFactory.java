package com.example.VideoConference;

import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.request.DestroyRoomRequestDto;
import com.example.VideoConference.room.dto.request.EditRoomRequestDto;

public class RoomTestCaseFactory {

    public static CreateRoomRequestDto createRoomRequestDto() {
        return new CreateRoomRequestDto("create", "제목", "11", "상현");
    }

    public static EditRoomRequestDto editRoomRequestDto(Long number) {
        return new EditRoomRequestDto("edit", number, "제목 수정", "22");
    }

    public static DestroyRoomRequestDto destroyRoomRequestDto(Long number) {
        return new DestroyRoomRequestDto("destroy", number);
    }
}
