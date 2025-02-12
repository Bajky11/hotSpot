package com.friends.friends.Scheduled;

import com.friends.friends.Entity.Friend;
import com.friends.friends.Entity.User;
import com.friends.friends.Repository.FriendRepository;
import com.friends.friends.Repository.UserRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ScheduledTasks {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    public ScheduledTasks(FriendRepository friendRepository, UserRepository userRepository) {
        this.friendRepository = friendRepository;
        this.userRepository = userRepository;
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void runDailyTask() {
        System.out.println("Spouštím úlohu každých 5 vteřin");
        System.out.println("Spouštím úlohu každých 5 vteřin");

        userRepository.findAll().forEach(user -> {
            System.out.println("Uživatel: " + user.getUsername());

            List<Friend> friends = friendRepository.findByUser(user);
            if (friends.isEmpty()) {
                System.out.println("Tento uživatel nemá žádné přátele.");
            } else {
                System.out.println("Seznam přátel:");
                friends.forEach(friend -> {
                    friend.decreaseScore(10);
                    System.out.println(friend.toString());
                });
                friendRepository.saveAll(friends);  // Uloží všechny změny najednou
            }
        });
    }
}