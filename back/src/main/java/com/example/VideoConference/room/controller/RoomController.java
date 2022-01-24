package com.example.VideoConference.room.controller;

import com.example.VideoConference.response.Response;
import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.service.RoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;

    @GetMapping("/rooms")
    public Response createRoom() {
        return Response.success(roomService.findRooms());
    }

    @PostMapping("/rooms")
    public Response createRoom(@Valid @RequestBody CreateRoomRequestDto requestDto) {
        return Response.success(roomService.createRoom(requestDto));
    }

    @DeleteMapping("/rooms/{roomId}")
    public Response createRoom(@PathVariable Long roomId) {
        return Response.success(roomService.destroyRoom(roomId));
    }
}
