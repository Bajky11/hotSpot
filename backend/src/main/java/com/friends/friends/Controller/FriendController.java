package com.friends.friends.Controller;

import com.friends.friends.Entity.Friend;
import com.friends.friends.Entity.User;
import com.friends.friends.Repository.FriendRepository;
import com.friends.friends.Repository.UserRepository;
import com.friends.friends.dto.FriendDTO;
import com.friends.friends.dto.FriendResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/friends")
public class FriendController {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    public FriendController(FriendRepository friendRepository, UserRepository userRepository) {
        this.friendRepository = friendRepository;
        this.userRepository = userRepository;
    }

    @GetMapping()
    public List<FriendResponseDTO> getFriends() {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userId).orElseThrow();

        return friendRepository.findByUser(user)
                .stream()
                .map(FriendResponseDTO::new)
                .sorted(Comparator.comparing(FriendResponseDTO::getName)) // Seřadí podle jména
                .collect(Collectors.toList());
    }

    @PostMapping()
    public ResponseEntity<Friend> addFriend(@RequestBody FriendDTO friendDTO) {
        Long userId = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findById(userId).orElseThrow();
        Friend friend = new Friend(user, friendDTO);
        friendRepository.save(friend);
        return ResponseEntity.ok(friend);
    }

    @DeleteMapping("/{friendId}")
    public ResponseEntity<?> removeFriend(@PathVariable Long friendId) {
        friendRepository.deleteById(friendId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{friendId}/increase-score")
    public ResponseEntity<?> increaseFriendScore(@PathVariable Long friendId, @RequestParam int points) {
        try {
            Friend friend = friendRepository.findById(friendId).orElseThrow(() -> new RuntimeException("Friend not found"));
            friend.increaseScore(points);
            friendRepository.save(friend);
            return ResponseEntity.ok(friend);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{friendId}/decrease-score")
    public ResponseEntity<?> decreaseFriendScore(@PathVariable Long friendId, @RequestParam int points) {
        try {
            Friend friend = friendRepository.findById(friendId).orElseThrow(() -> new RuntimeException("Friend not found"));
            friend.decreaseScore(points);
            friendRepository.save(friend);
            return ResponseEntity.ok(friend);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
