# README

Fake data were taken from https://www.mockaroo.com/schemas/.

## Links

- [Mockaroo - Random Data Generator and API Mocking Tool](https://www.mockaroo.com/)
- [MySQL to SQLite Online Converter](https://ww9.github.io/mysql2sqlite/)

## Create database with schema

~~~bash
sqlite3 database.sqlite3 -init schema.sql
~~~

## Seed data into database

~~~bash
sqlite3 database.sqlite3 -init seeds/users.sql
sqlite3 database.sqlite3 -init seeds/organizations.sql
sqlite3 database.sqlite3 -init seeds/contacts.sql
~~~
