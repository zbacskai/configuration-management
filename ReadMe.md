# Connect to PostgreSQL DB

`psql postgresql://configmaster@localhost:5433/configmaster`

# Add a new System Description

curl -X POST -H "Content-Type: application/json"  -d '{ "system_id" : "testSystem", "description" : "testdescription" }' http://localhost:3000/systemdef

