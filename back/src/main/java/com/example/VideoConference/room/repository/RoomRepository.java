package com.example.VideoConference.room.repository;

import com.example.VideoConference.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByNumber(Long number);
}
