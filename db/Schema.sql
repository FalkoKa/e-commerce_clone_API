CREATE DATABASE e-commerce-app

CREATE TABLE user (
    id SERIAL PRIMARY KEY, 
    email TEXT UNIQUE NOT NULL,
    password_digest TEXT NOT NULL,
    isAdmin BOOLEAN
);

CREATE TABLE user_address (
    user_id INTEGER REFERENCES user (id) ON DELETE CASCADE,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    postal_code NUMERIC NOT NULL,
    country TEXT NOT NULL
);

CREATE TABLE user_review (
    id SERIAL PRIMARY KEY, 
    INTEGER REFERENCES user (id) ON DELETE CASCADE,
    ordered_product_id INTEGER REFERENCES product (id) ON DELETE CASCADE,
    rating_value INTEGER,
    comment TEXT
);

CREATE TABLE product_category (
    id SERIAL PRIMARY KEY, 
    category_name TEXT NOT NULL
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY, 
    category_id INTEGER REFERENCES product_category (id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    image TEXT, 
    price NUMERIC NOT NULL,
    count_in_stock INTEGER NOT NULL,
    brand TEXT,
    color TEXT,
    description TEXT
);

CREATE TABLE shopping_cart (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES user (id) ON DELETE CASCADE,
    user_payment_method TEXT NOT NULL [paypal, credit card]
);

CREATE TABLE shopping_cart_item (
    id SERIAL PRIMARY KEY, 
    cart_id INTEGER REFERENCES shopping_cart (id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES product (id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price NUMERIC NOT NULL
);


-- maybe separate table
CREATE TABLE payment_method (
    user_id foreign key, 
    payment_type TEXT [paypal, creditcard],
    provider TEXT,
    account_number INTEGER,
    expiry_date DATE,
    is_default BOOLEAN
);


-- captures order placed by user
CREATE TABLE shop_order (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER REFERENCES user (id) ON DELETE CASCADE,
    order_date DATE DEFAULT Now(),
    paymemnt_method_id INTEGER REFERENCES shopping_cart (user_payment_method) ON DELETE CASCADE,
    order_total NUMERIG NOT NULL,
    order_status TEXT [processing, shipped, delivered]
);

-- Products ordered by customer?
CREATE TABLE order_line (
    id SERIAL PRIMARY KEY, 
    product_id INTEGER REFERENCES product (id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES shop_order (id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price NUMERIC NOT NULL
);