package com.friends.friends.Repository;

import com.friends.friends.Entity.AccountType.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {
}



