INSERT INTO product (id, sku, price, description)
VALUES (DEFAULT, 'AAA001', 5.99,'AAA001'),
       (DEFAULT, 'AAA002', 10.00, 'AAA002'),
       (DEFAULT, 'BBB001', 0.69,'BBB001');

INSERT INTO customer (id, name,line_1,line_2,line_3,street,city,county,postcode,lon,lat)
VALUES (DEFAULT, 'Rick Sanchez','Test line 1', 'test line 2', 'test line 3', 'test street','test city', 'test county', 'SS0 7BA',0.700238,51.543974),
       (DEFAULT, 'Walter White','Test line 1', 'test line 2', 'test line 3', 'test street','test city', 'test county', 'M32 0JG',-2.302836,53.455654),
       (DEFAULT, 'William Butcher','Test line 1', 'test line 2', 'test line 3', 'test street','test city', 'test county', 'OX49 5NU',-1.069876,51.6562);