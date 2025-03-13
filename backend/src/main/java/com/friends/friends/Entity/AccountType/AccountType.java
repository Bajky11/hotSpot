package com.friends.friends.Entity.AccountType;

import jakarta.persistence.*;
import jakarta.persistence.Id;

@Entity
public class Entity {

    @Id
    private Long id;


    public Long getId() {
        return id;
    }
}
