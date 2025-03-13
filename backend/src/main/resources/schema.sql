CREATE OR REPLACE VIEW accounts_personal AS
SELECT
    a.id AS account_id,
    a.name AS account_name,
    at.name AS account_type
FROM account a
         LEFT JOIN account_type at ON a.account_type_id = at.id
WHERE at.name = 'PERSONAL';