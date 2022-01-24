package com.example.VideoConference.room.controller;

import com.example.VideoConference.room.domain.Room;
import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.response.CreateRoomResponseDto;
import com.example.VideoConference.room.service.RoomService;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
class RoomControllerTest {
    MockMvc mockMvc;
    @Autowired
    RoomController roomController;
    @Autowired
    RoomService roomService;
    @BeforeEach
    public void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(roomController).build();
    }

    @Test
    @DisplayName("방을 생성한다.")
    public void createRoom() throws Exception {
        //given
        CreateRoomRequestDto requestDto = new CreateRoomRequestDto("create", "백엔드 스터디 회의1", "1234", "상현");

        //when, then
        mockMvc.perform(post("/rooms")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new Gson().toJson(requestDto)))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("방을 삭제한다.")
    public void destroyRoom() throws Exception {
        //given
        CreateRoomRequestDto requestDto = new CreateRoomRequestDto("create", "백엔드 스터디 회의1", "1234", "상현");
        CreateRoomResponseDto responseDto = roomService.createRoom(requestDto);

        //when, then
        mockMvc.perform(delete("/rooms/"+responseDto.getNumber()))
                .andExpect(status().isOk());
    }
}