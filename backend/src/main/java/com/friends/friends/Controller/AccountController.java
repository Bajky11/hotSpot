package com.friends.friends.Controller;

import com.friends.friends.Entity.AccountType.AccountType;
import com.friends.friends.Repository.AccountTypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AccountTypeController {

    AccountTypeRepository accountTypeRepository;

    public AccountTypeController(AccountTypeRepository accountTypeRepository) {
        this.accountTypeRepository = accountTypeRepository;
    }

    @GetMapping()
    public ResponseEntity<List<AccountType>> getAllAccountTypes() {
        List<AccountType> accountTypes = accountTypeRepository.findAll();

        if (accountTypes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(accountTypes);
    }
}
