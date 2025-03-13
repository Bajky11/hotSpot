package com.friends.friends.Entity.AccountType;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "account")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String name;

    @OneToOne
    @JoinColumn(name = "account_type_id", referencedColumnName = "id", nullable = false)
    private AccountType accountType;
}


