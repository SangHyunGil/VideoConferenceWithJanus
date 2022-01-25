package com.example.VideoConference.room.service;

import com.example.VideoConference.common.JanusHelper;
import com.example.VideoConference.exception.RoomNotFoundException;
import com.example.VideoConference.room.domain.Room;
import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.request.DestroyRoomRequestDto;
import com.example.VideoConference.room.dto.request.EditRoomRequestDto;
import com.example.VideoConference.room.dto.response.CreateRoomResponseDto;
import com.example.VideoConference.room.dto.response.DestroyRoomResponseDto;
import com.example.VideoConference.room.dto.response.EditRoomResponseDto;
import com.example.VideoConference.room.dto.response.FindRoomResponseDto;
import com.example.VideoConference.room.dto.result.CreateRoomResultDto;
import com.example.VideoConference.room.dto.result.DestroyRoomResultDto;
import com.example.VideoConference.room.dto.result.EditRoomResultDto;
import com.example.VideoConference.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {
    private final RoomRepository roomRepository;
    private final JanusHelper janusHelper;

    @Transactional
    public CreateRoomResponseDto createRoom(CreateRoomRequestDto requestDto) {
        CreateRoomResultDto resultDto = janusHelper.postAndGetResponseDto(requestDto, CreateRoomResultDto.class);
        Room room = roomRepository.save(makeRoom(requestDto, resultDto));
        return CreateRoomResponseDto.create(room);
    }

    private Room makeRoom(CreateRoomRequestDto requestDto, CreateRoomResultDto resultDto) {
        return Room.builder()
                .number(resultDto.getResponse().getRoom())
                .description(requestDto.getDescription())
                .pin(requestDto.getPin())
                .username(requestDto.getUsername())
                .build();
    }

    @Transactional
    public EditRoomResponseDto editRoom(Long number, EditRoomRequestDto requestDto) {
        janusHelper.postAndGetResponseDto(requestDto, EditRoomResultDto.class);
        Room room = roomRepository.findByNumber(number).orElseThrow(RoomNotFoundException::new);
        return EditRoomResponseDto.create(room.edit(requestDto));
    }

    @Transactional
    public DestroyRoomResponseDto destroyRoom(Long number) {
        DestroyRoomRequestDto requestDto = DestroyRoomRequestDto.create(number);
        DestroyRoomResultDto resultDto = janusHelper.postAndGetResponseDto(requestDto, DestroyRoomResultDto.class);
        return DestroyRoomResponseDto.create(resultDto);
    }

    public List<FindRoomResponseDto> findRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream()
                .map(FindRoomResponseDto::create)
                .collect(Collectors.toList());
    }
}
