package com.friends.friends.dto;

import com.friends.friends.Entity.Friend;
import com.friends.friends.Enums.RelationshipPriority;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class FriendResponseDTO {

    private final Long id;

    private final String name;

    private final LocalDate birthday;

    private final int score;

    private final Integer loveScore;

    private final RelationshipPriority relationshipPriority;

    public FriendResponseDTO(Friend friend) {
        this.id = friend.getId();
        this.name = friend.getName();
        this.birthday = friend.getBirthday();
        this.score = friend.getScore();
        this.loveScore = friend.getLoveScore();
        this.relationshipPriority = friend.getRelationshipPriority();
    }
}
