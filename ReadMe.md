https://sequelize.org/docs/v6/

# Connect to PostgreSQL DB

`psql postgresql://configmaster@localhost:5433/configmaster`

# Components

Add one:

`curl -X POST -H "Content-Type: application/json"  -d '{ "name" : "testComponent1" }' http://localhost:3000/component`

List one:

`http://localhost:3000/component/testComponent1`

Lis all:

`http://localhost:3000/components`

# Parameters

Add one:

`curl -X POST -H "Content-Type: application/json"  -d '{ "name" : "testParam1", "value": "testValue1" }' http://localhost:3000/parameter/testComponent1/`

List One

`http://localhost:3000/component/testComponent1/testParam1`


List All for Component

`http://localhost:3000/component/testComponent1`



