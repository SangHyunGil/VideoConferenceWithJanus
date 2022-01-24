package com.example.VideoConference.room.service;

import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.response.CreateRoomResponseDto;
import com.example.VideoConference.room.dto.response.DestroyRoomResponseDto;
import com.example.VideoConference.room.repository.RoomRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class RoomServiceTest {
    @Autowired
    RoomService roomService;
    @Autowired
    RoomRepository roomRepository;

    @Test
    public void createRoom() throws Exception {
        //given
        CreateRoomRequestDto createRoom = new CreateRoomRequestDto("create", "제목", "11", "상현");

        //when
        CreateRoomResponseDto responseDto = roomService.createRoom(createRoom);

        //then
        Assertions.assertNotNull(roomRepository.findByNumber(responseDto.getNumber()));
    }

    @Test
    public void destroyRoom() throws Exception {
        //given
        CreateRoomRequestDto createRoom = new CreateRoomRequestDto("create", "제목", "11", "상현");
        CreateRoomResponseDto room = roomService.createRoom(createRoom);

        //when
        DestroyRoomResponseDto responseDto = roomService.destroyRoom(room.getNumber());

        //then
        Assertions.assertEquals("destroyed", responseDto.getResult());
    }
}