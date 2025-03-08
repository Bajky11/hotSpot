package com.friends.friends.Dto;

import com.friends.friends.Enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class TaskDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Hourly rate is required")
    private BigDecimal hourlyRate;

    private String tag;

    private TaskStatus status = TaskStatus.PAUSED; // Výchozí stav, pokud není zadán
}