CREATE TABLE dulces (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL
);

-- Insertemos 3 dulces para que la tienda no esté vacía:
INSERT INTO dulces (nombre, precio, stock) VALUES 
('Mochi de Fresa', 2500.00, 10),
('Dora-yaki', 1800.00, 5),
('Pocky Matcha', 1200.00, 20);

id SERIAL PRIMARY KEY,
nombre VARCHAR(100),
stock INTEGER