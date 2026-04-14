CREATE TABLE dulces (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL
);

-- 3 dulces para la tienda:
INSERT INTO dulces (nombre, precio, stock,) VALUES 
('Mochi de Fresa', 2500.00, 10),
('Dora-yaki', 1800.00, 5),
('Pocky Matcha', 1200.00, 20);

id SERIAL PRIMARY KEY,
nombre VARCHAR(100),
stock INTEGER

SELECT * FROM dulces;

ALTER TABLE dulces ADD COLUMN imagen VARCHAR(255) DEFAULT 'default.jpg';
ALTER TABLE dulces ADD COLUMN imagen VARCHAR(255);


CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- usuario de prueba (clave: 123456)
INSERT INTO usuarios (email, password) VALUES ('gato@dulces.com', '123456');