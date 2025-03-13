package com.friends.friends.Controller;

import com.friends.friends.Entity.AccountType.Account;
import com.friends.friends.Repository.AccountRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/account")
public class AccountController {

    AccountRepository accountRepository;

    public AccountController(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @GetMapping()
    public ResponseEntity<List<Account>> getAllAccountTypes() {
        List<Account> accounts = accountRepository.findAll();
        if (accounts.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(accounts);
    }
}
