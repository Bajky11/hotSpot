package com.friends.friends.CommandLineRunner;

import com.friends.friends.Entity.AccountType.Account;
import com.friends.friends.Entity.AccountType.AccountType;
import com.friends.friends.Entity.Location.Location;
import com.friends.friends.Repository.AccountRepository;
import com.friends.friends.Repository.AccountTypeRepository;
import com.friends.friends.Repository.LocationRepository;
import jakarta.transaction.Transactional;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;
    private final AccountTypeRepository accountTypeRepository;
    private final AccountRepository accountRepository;
    private final LocationRepository locationRepository;
    private final GeometryFactory geometryFactory;

    public DataInitializer(
            JdbcTemplate jdbcTemplate,
            AccountTypeRepository accountTypeRepository,
            AccountRepository accountRepository,
            LocationRepository locationRepository
    ) {
        this.jdbcTemplate = jdbcTemplate;
        this.accountTypeRepository = accountTypeRepository;
        this.accountRepository = accountRepository;
        this.locationRepository = locationRepository;
        this.geometryFactory = new GeometryFactory();

    }

    @Override
    @Transactional
    public void run(String... args) {
        populateAccountTypeTable();
        populateAccountTable();
        populateLocationTable();
    }

    private boolean checkIfAlreadyPopulated(long repositoryCount, String tableName) {
        if (repositoryCount == 0) {
            System.out.println(tableName + " table successfully populated with default data.");
            return false;
        } else {
            System.out.println(tableName + " table already has data, aborting default population...");
            return true;
        }
    }

    private void populateAccountTypeTable() {
        if (checkIfAlreadyPopulated(accountTypeRepository.count(), "AccountType")) {
            return;
        }

        AccountType personal = new AccountType(null, "PERSONAL");
        AccountType company = new AccountType(null, "COMPANY");
        accountTypeRepository.save(personal);
        accountTypeRepository.save(company);
    }

    private void populateAccountTable() {
        if (checkIfAlreadyPopulated(accountRepository.count(), "Account")) {
            return;
        }

        AccountType personalType = accountTypeRepository.findByName("PERSONAL");
        AccountType companyType = accountTypeRepository.findByName("COMPANY");

        if (personalType == null || companyType == null) {
            System.err.println("Can not access required rows in AccountType table, aborting populateAccountTable...");
            return;
        }

        Account personal = new Account(null, "John Doe", personalType);
        Account company = new Account(null, "MADMONQ", companyType);

        accountRepository.save(personal);
        accountRepository.save(company);
    }

    private void populateLocationTable() {

        if (checkIfAlreadyPopulated(locationRepository.count(), "Location")) {
            return;
        }

        List<Location> locations = List.of(
                createLocation("Zelená brána", 50.0375, 15.7792),
                createLocation("Pernštýnské náměstí", 50.0369, 15.7795),
                createLocation("Automatické mlýny", 50.0351, 15.7812),
                createLocation("Park Na Špici", 50.0325, 15.7821),
                createLocation("Hokejová aréna Pardubice", 50.0403, 15.7819)
        );

        locationRepository.saveAll(locations);
    }

    private Location createLocation(String name, double lat, double lon) {
        Point point = geometryFactory.createPoint(new Coordinate(lon, lat));
        point.setSRID(4326);
        return new Location(null, name, point);
    }


    private void createPersonalAccountsView() {
        String sql = """
                CREATE OR REPLACE VIEW accounts_personal AS
                SELECT
                    a.id AS account_id,
                    a.name AS account_name,
                    at.name AS account_type
                FROM account a
                LEFT JOIN account_type at ON a.account_type_id = at.id
                WHERE at.name = 'PERSONAL';
                """;

        jdbcTemplate.execute(sql);
        System.out.println("✅ SQL pohled `full_account_view` byl vytvořen!");
    }


}


