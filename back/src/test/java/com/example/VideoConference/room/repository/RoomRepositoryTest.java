package com.example.VideoConference.room.repository;

import com.example.VideoConference.room.domain.Room;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class RoomRepositoryTest {
    @Autowired
    RoomRepository roomRepository;

    @BeforeEach
    public void init() {
        roomRepository.save(new Room(9797L, "제목", "1234", "상현"));
    }

    @Test
    @DisplayName("방 번호로 방을 조회한다.")
    public void findRoomByNumber() throws Exception {
        //given

        //when, then
        Assertions.assertNotNull(roomRepository.findByNumber(9797L));
    }
}