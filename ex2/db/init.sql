CREATE TABLE Users (
    id int PRIMARY KEY,
    email varchar(255),
    name varchar(255),
    password varchar(255)
);

INSERT INTO Users (id, email, name, password) VALUES (1, 'khoanguyen@saritasa.com', 'khoanguyen', '123');
INSERT INTO Users (id, email, name, password) VALUES (2, 'test@saritasa.com','test', '123');
INSERT INTO Users (id, email, name, password) VALUES (3, 'user@saritasa.com','user2','123');