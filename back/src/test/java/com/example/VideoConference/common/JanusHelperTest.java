package com.example.VideoConference.common;

import com.example.VideoConference.RoomTestCaseFactory;
import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.request.DestroyRoomRequestDto;
import com.example.VideoConference.room.dto.request.EditRoomRequestDto;
import com.example.VideoConference.room.dto.result.CreateRoomResultDto;
import com.example.VideoConference.room.dto.result.DestroyRoomResultDto;
import com.example.VideoConference.room.dto.result.EditRoomResultDto;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class JanusHelperTest {
    @Autowired
    JanusHelper janusHelper;

    @Test
    public void createPost() throws Exception {
        //given
        CreateRoomRequestDto requestDto = RoomTestCaseFactory.createRoomRequestDto();

        //when
        CreateRoomResultDto resultDto = janusHelper.postAndGetResponseDto(requestDto, CreateRoomResultDto.class);

        //then
        Assertions.assertNotNull(resultDto);
    }

    @Test
    public void editPost() throws Exception {
        //given
        CreateRoomRequestDto createRequestDto = RoomTestCaseFactory.createRoomRequestDto();
        janusHelper.postAndGetResponseDto(createRequestDto, CreateRoomResultDto.class);
        EditRoomRequestDto editRequestDto = RoomTestCaseFactory.editRoomRequestDto();

        //when
        EditRoomResultDto editResultDto = janusHelper.postAndGetResponseDto(editRequestDto, EditRoomResultDto.class);

        //then
        Assertions.assertNotNull(editResultDto);
    }

    @Test
    public void DestroyPost() throws Exception {
        CreateRoomRequestDto createRequestDto = RoomTestCaseFactory.createRoomRequestDto();
        CreateRoomResultDto createResultDto = janusHelper.postAndGetResponseDto(createRequestDto, CreateRoomResultDto.class);
        DestroyRoomRequestDto destroyRequestDto = RoomTestCaseFactory.destroyRoomRequestDto(createResultDto.getResponse().getRoom());

        //when
        DestroyRoomResultDto destroyResultDto = janusHelper.postAndGetResponseDto(destroyRequestDto, DestroyRoomResultDto.class);

        //then
        Assertions.assertNotNull(destroyResultDto);
    }
}