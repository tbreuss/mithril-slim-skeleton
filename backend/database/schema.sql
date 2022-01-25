BEGIN TRANSACTION;

CREATE TABLE users (
    id INTEGER NOT NULL ,
    username TEXT  DEFAULT NULL,
    email TEXT  DEFAULT NULL,
    first_name TEXT  DEFAULT NULL,
    last_name TEXT  DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE UNIQUE INDEX users_username ON users (username);

CREATE TABLE organizations (
    id INT,
    name TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    address TEXT DEFAULT NULL,
    city TEXT DEFAULT NULL,
    region TEXT DEFAULT NULL,
    country TEXT DEFAULT NULL,
    postal_code TEXT DEFAULT NULL,
    created_at DATE,
    updated_at DATE,
    deleted_at DATE,
    PRIMARY KEY (id)
);

CREATE TABLE contacts (
    id INT,
    organization_id INT,
    first_name TEXT DEFAULT NULL,
    last_name TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    address TEXT DEFAULT NULL,
    city TEXT DEFAULT NULL,
    region TEXT DEFAULT NULL,
    country TEXT DEFAULT NULL,
    postal_code TEXT DEFAULT NULL,
    created_at DATE,
    updated_at DATE,
    deleted_at DATE,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INT,
    first_name TEXT DEFAULT NULL,
    last_name TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    password TEXT DEFAULT NULL,
    owner TEXT DEFAULT NULL,
    created_at DATE,
    updated_at DATE,
    deleted_at DATE
);

COMMIT;
