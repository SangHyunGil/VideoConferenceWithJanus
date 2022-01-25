package com.example.VideoConference.room.domain;

import com.example.VideoConference.common.EntityDate;
import com.example.VideoConference.room.dto.request.EditRoomRequestDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Room extends EntityDate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long number;
    private String description;
    private String pin;
    private String username;

    @Builder
    public Room(Long number, String description, String pin, String username) {
        this.number = number;
        this.description = description;
        this.pin = pin;
        this.username = username;
    }

    public Room edit(EditRoomRequestDto requestDto) {
        this.description = requestDto.getDescription();
        this.pin = requestDto.getPin();
        return this;
    }
}
