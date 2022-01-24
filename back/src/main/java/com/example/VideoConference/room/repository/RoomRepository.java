package com.example.VideoConference.room.repository;

import com.example.VideoConference.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Room findByNumber(Long number);
}
