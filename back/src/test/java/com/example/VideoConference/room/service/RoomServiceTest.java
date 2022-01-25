package com.example.VideoConference.room.service;

import com.example.VideoConference.RoomTestCaseFactory;
import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.request.EditRoomRequestDto;
import com.example.VideoConference.room.dto.response.CreateRoomResponseDto;
import com.example.VideoConference.room.dto.response.DestroyRoomResponseDto;
import com.example.VideoConference.room.dto.response.EditRoomResponseDto;
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
        CreateRoomRequestDto requestDto = RoomTestCaseFactory.createRoomRequestDto();

        //when
        CreateRoomResponseDto responseDto = roomService.createRoom(requestDto);

        //then
        Assertions.assertNotNull(roomRepository.findByNumber(responseDto.getNumber()));
    }

    @Test
    @DisplayName("방을 수정한다.")
    public void editRoom() throws Exception {
        //given
        CreateRoomRequestDto createRequestDto = RoomTestCaseFactory.createRoomRequestDto();
        CreateRoomResponseDto room = roomService.createRoom(createRequestDto);
        EditRoomRequestDto editRequestDto = RoomTestCaseFactory.editRoomRequestDto(room.getNumber());

        //when
        EditRoomResponseDto responseDto = roomService.editRoom(editRequestDto);

        //then
        Assertions.assertEquals("제목 수정", responseDto.getDescription());
        Assertions.assertEquals("22", responseDto.getPin());
    }

    @Test
    @DisplayName("방을 제거한다.")
    public void destroyRoom() throws Exception {
        //given
        CreateRoomRequestDto requestDto = RoomTestCaseFactory.createRoomRequestDto();
        CreateRoomResponseDto room = roomService.createRoom(requestDto);

        //when
        DestroyRoomResponseDto responseDto = roomService.destroyRoom(room.getNumber());

        //then
        Assertions.assertEquals("destroyed", responseDto.getResult());
    }

    @Test
    @DisplayName("방을 모두 조회한다.")
    public void findRooms() throws Exception {
        //given
        CreateRoomRequestDto requestDto = RoomTestCaseFactory.createRoomRequestDto();
        roomService.createRoom(requestDto);

        //when
        List<FindRoomResponseDto> rooms = roomService.findRooms();
        // then
        Assertions.assertEquals(1, rooms.size());
    }
}