CREATE DATABASE e-commerce-app

CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    email_address TEXT NOT NULL,
    password_digest TEXT NOT NULL
);

CREATE TABLE user_address (
    -- user_id foreign key
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code NUMERIC NOT NULL,
    country TEXT NOT NULL
);

CREATE TABLE user_review (
    id SERIAL PRIMARY KEY, 
    -- user_id foreign key
    -- ordered_product_id foreign key
    rating_value NUMERIC,
    comment TEXT
);

CREATE TABLE product_category (

);

CREATE TABLE product (

);

CREATE TABLE shopping_cart (

);

CREATE TABLE user_payment_method (

);

-- order line?

-- shop order??