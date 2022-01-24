package com.example.VideoConference.room.service;

import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.response.CreateRoomResponseDto;
import com.example.VideoConference.room.dto.response.DestroyRoomResponseDto;
import com.example.VideoConference.room.dto.response.FindRoomResponseDto;
import com.example.VideoConference.room.repository.RoomRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@SpringBootTest
@Transactional
class RoomServiceTest {
    @Autowired
    RoomService roomService;
    @Autowired
    RoomRepository roomRepository;

    @Test
    @DisplayName("방을 생성한다.")
    public void createRoom() throws Exception {
        //given
        CreateRoomRequestDto createRoom = new CreateRoomRequestDto("create", "제목", "11", "상현");

        //when
        CreateRoomResponseDto responseDto = roomService.createRoom(createRoom);

        //then
        Assertions.assertNotNull(roomRepository.findByNumber(responseDto.getNumber()));
    }

    @Test
    @DisplayName("방을 제거한다.")
    public void destroyRoom() throws Exception {
        //given
        CreateRoomRequestDto createRoom = new CreateRoomRequestDto("create", "제목", "11", "상현");
        CreateRoomResponseDto room = roomService.createRoom(createRoom);

        //when
        DestroyRoomResponseDto responseDto = roomService.destroyRoom(room.getNumber());

        //then
        Assertions.assertEquals("destroyed", responseDto.getResult());
    }

    @Test
    @DisplayName("방을 모두 조회한다.")
    public void findRooms() throws Exception {
        //given
        CreateRoomRequestDto createRoom = new CreateRoomRequestDto("create", "제목", "11", "상현");
        CreateRoomResponseDto room = roomService.createRoom(createRoom);

        //when
        List<FindRoomResponseDto> rooms = roomService.findRooms();
        // then
        Assertions.assertEquals(1, rooms.size());
    }
}