package com.friends.friends.Repository;

import com.friends.friends.Entity.Task;
import com.friends.friends.Enums.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query("SELECT t FROM Task t WHERE t.createdAt >= :fromDate ORDER BY t.createdAt DESC")
    List<Task> findAllCreatedAfter(@Param("fromDate") LocalDateTime fromDate);

    // ✅ Najde všechny úkoly, které jsou ve stavu RUNNING nebo PAUSED, seřazené podle vytvoření
    @Query("SELECT t FROM Task t WHERE t.status IN (:statuses) ORDER BY t.createdAt ASC")
    List<Task> findAllActiveTasks(@Param("statuses") List<TaskStatus> statuses);
}
