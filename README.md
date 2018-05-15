#FINAL PROJECT SETUP - BACKEND

#SETTING UP DE DB

- DB using PostgreSQL
```
 psql -U vagrant -d template1
```

```
 CREATE ROLE 'labber' WITH LOGIN password 'labber'
```
```
 CREATE DATABASE finalproject OWNER labber;
```
#DB

- Update .env.example with your options from the step before.


#Install the Packages
```
npm i
```
#Run the migrations
```
knex migrate:latest
```

#Run the seeds
```
knex seed:run
```
#Start the server (PORT ```8080```)
```
npm i
```