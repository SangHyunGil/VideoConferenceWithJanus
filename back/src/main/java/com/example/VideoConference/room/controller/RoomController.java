package com.example.VideoConference.room.controller;

import com.example.VideoConference.response.Response;
import com.example.VideoConference.room.dto.request.CreateRoomRequestDto;
import com.example.VideoConference.room.dto.request.EditRoomRequestDto;
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
    public Response findRooms() {
        return Response.success(roomService.findRooms());
    }

    @PostMapping("/rooms")
    public Response createRoom(@Valid @RequestBody CreateRoomRequestDto requestDto) {
        return Response.success(roomService.createRoom(requestDto));
    }

    @PutMapping("/rooms/{number}")
    public Response editRoom(@PathVariable Long number, @Valid @RequestBody EditRoomRequestDto requestDto) {
        return Response.success(roomService.editRoom(number, requestDto));
    }

    @DeleteMapping("/rooms/{number}")
    public Response destroyRoom(@PathVariable Long number) {
        return Response.success(roomService.destroyRoom(number));
    }
}
