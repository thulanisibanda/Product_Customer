CREATE TABLE customer (
    id    bigint GENERATED BY DEFAULT AS IDENTITY,
    name varchar(255) NOT NULL,
    line_1 varchar(255),
    line_2 varchar(255),
    line_3 varchar(255),
    street varchar(255),
    city varchar(255),
    county varchar(255),
    postcode varchar(255),
    lon float,
    lat float,
    PRIMARY KEY (id)
);
CREATE TABLE product (
    id    bigint GENERATED BY DEFAULT AS IDENTITY,
    price decimal(19, 2) NOT NULL,
    sku   varchar(255),
    description   varchar(255),
    PRIMARY KEY (id)
);
ALTER TABLE product
    ADD CONSTRAINT UK_q1mafxn973ldq80m1irp3mpvq UNIQUE (sku);
