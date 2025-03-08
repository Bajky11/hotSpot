package com.friends.friends.Entity;

import com.friends.friends.Enums.TaskStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // Název úkolu je povinný
    private String name;

    @Column(nullable = false) // Hodinová mzda je povinná
    private BigDecimal hourlyRate = BigDecimal.ZERO;

    private BigDecimal earnings = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false) // Status musí být vždy vyplněný
    private TaskStatus status;

    @Column(nullable = false, updatable = false) // Nelze změnit po vytvoření
    private LocalDateTime createdAt;

    private LocalDateTime startTime;

    private Long totalTime = 0L; // Výchozí hodnota 0

    private String tag;

    // ✅ Automaticky nastaví createdAt při vložení do DB
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}