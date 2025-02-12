package com.friends.friends.Repository;

import com.friends.friends.Entity.Friend;
import com.friends.friends.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    List<Friend> findByUser(User user);
}
