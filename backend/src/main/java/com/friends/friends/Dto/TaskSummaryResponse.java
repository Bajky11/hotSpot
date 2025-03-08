package com.friends.friends.Dto;

import java.math.BigDecimal;

public record TaskSummaryResponse(BigDecimal totalEarnings, long totalTime, Integer totalTasks) {
}
