package com.example.VideoConference.room.service;

import com.example.VideoConference.common.JanusRequest;
import com.example.VideoConference.room.domain.Room;
import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.request.DestroyRoomRequestDto;
import com.example.VideoConference.room.dto.response.CreateRoomResponseDto;
import com.example.VideoConference.room.dto.response.DestroyRoomResponseDto;
import com.example.VideoConference.room.dto.response.FindRoomResponseDto;
import com.example.VideoConference.room.dto.result.CreateRoomResultDto;
import com.example.VideoConference.room.dto.result.DestroyRoomResultDto;
import com.example.VideoConference.exception.JanusRequestException;
import com.example.VideoConference.room.repository.RoomRepository;
import com.google.gson.Gson;
import com.google.gson.internal.Primitives;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RoomService {
    private final RoomRepository roomRepository;
    private final Integer RANDOM_NUMBER_DIGIT = 12;
    private final RestTemplate restTemplate;
    private final Gson gson;
    @Value("${janus.server}")
    private String janusServer;
    @Value("${janus.admin.secret}")
    private String adminSecret;

    @Transactional
    public CreateRoomResponseDto createRoom(CreateRoomRequestDto requestDto) {
        CreateRoomResultDto resultDto = postAndGetResponseDto(requestDto, CreateRoomResultDto.class);
        Room room = roomRepository.save(makeRoom(requestDto, resultDto));
        return CreateRoomResponseDto.create(room);
    }

    public <T> T postAndGetResponseDto(Object requestDto, Class<T> classOfT) {
        JanusRequest janusRequest = JanusRequest.create(makeRandomNumber(RANDOM_NUMBER_DIGIT), adminSecret, requestDto);
        String json = gson.toJson(janusRequest);
        try {
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(janusServer, json, String.class);
            return Primitives.wrap(classOfT).cast(gson.fromJson(responseEntity.getBody(), classOfT));
        } catch (Exception e) {
            throw new JanusRequestException();
        }
    }

    private String makeRandomNumber(int n) {
        Random rand = new Random();
        String rst = Integer.toString(rand.nextInt(10));
        for(int i=0; i < n-1; i++){
            rst += Integer.toString(rand.nextInt(10));
        }
        return rst;
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
    public DestroyRoomResponseDto destroyRoom(Long roomId) {
        DestroyRoomRequestDto requestDto = DestroyRoomRequestDto.create(roomId);
        DestroyRoomResultDto resultDto = postAndGetResponseDto(requestDto, DestroyRoomResultDto.class);
        return DestroyRoomResponseDto.create(resultDto);
    }

    public List<FindRoomResponseDto> findRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream()
                .map(FindRoomResponseDto::create)
                .collect(Collectors.toList());
    }
}
