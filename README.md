Repozitář obsahuje 
- FE (Flutter mobilní aplikace)
- BE (Spring aplikace)
- DB (Postgres + Postgis image) - spouští se před BE, nebo společně

DŮLEŽITÉ
- v dockeru musí existovat sít "bajerlukascz_network" aby se kontejnery spustili

BE
- spouští se pomocí docker-compose up -d

FE
- zatím žádný spustitelný build, bez nakonfigurovaného IDE nejde jednoduše spustit