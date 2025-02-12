package com.friends.friends.Entity;

import com.friends.friends.Enums.RelationshipPriority;
import com.friends.friends.dto.FriendDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "friends")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "friend_name", nullable = false)
    private String name;

    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @Column(name = "score", nullable = false)
    private int score = 50;

    @Column(name = "love_score", nullable = true)
    private Integer loveScore = null;

    @Enumerated(EnumType.STRING)
    @Column(name = "relationship_priority", nullable = false, columnDefinition = "varchar(255) default 'KEEP_IN_TOUCH'")
    private RelationshipPriority relationshipPriority = RelationshipPriority.KEEP_IN_TOUCH;

    public Friend(User user, FriendDTO friendDTO) {
        this.user = user;
        this.name = friendDTO.getName();
        this.birthday = friendDTO.getBirthday();
        this.relationshipPriority = RelationshipPriority.valueOf(friendDTO.getRelationshipPriority());
        this.loveScore = friendDTO.isTrackLoveScore() ? 50 : null;
    }

    private void changeLoveScore(int number) {
        this.loveScore += number;

        if (this.loveScore > 100) {
            this.loveScore = 100;
        }

        if (this.loveScore < 0) {
            this.loveScore = 0;
        }
    }

    public void decreaseScore(int number) {
        if (number < 0) {
            throw new IllegalArgumentException("Number must be positive.");
        }

        this.score -= number;
        if (this.score < 0) {
            this.score = 0;  // Zajištění, že skóre nebude menší než 0
        }
    }

    public void increaseScore(int number) {
        if (number < 0) {
            throw new IllegalArgumentException("Number must be positive.");
        }

        this.score += number;
        if (this.score > 100) {
            this.score = 100;  // Zajištění, že skóre nebude větší než 100
        }
    }

    @Override
    public String toString() {
        return "Friend{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", birthday=" + birthday +
                ", score=" + score +
                ", relationshipPriority=" + relationshipPriority +
                '}';
    }
}