-- Muestra todos los juegos con todas sus columnas.
SELECT * FROM jocs;

-- Muestra el título y el precio de los juegos que cuestan menos de 40 euros.
SELECT titulo, precio
FROM jocs
WHERE precio < 40;

-- Muestra los juegos que cuestan menos de 40 euros y que además tienen stock.
SELECT *
FROM jocs
WHERE precio < 40 AND stock > 0;

-- Muestra los juegos cuyo título contiene la palabra Mario.
SELECT *
FROM jocs
WHERE titulo LIKE '%Mario%';

-- Muestra el título y el precio ordenados del más caro al más barato.
SELECT titulo, precio
FROM jocs
ORDER BY precio DESC;

-- Muestra el título y el precio ordenados del más barato al más caro.
SELECT titulo, precio
FROM jocs
ORDER BY precio ASC;

-- Devuelve cuántos juegos hay, el precio medio y el precio máximo.
SELECT COUNT(*), AVG(precio), MAX(precio)
FROM jocs;

-- Muestra los juegos agotados, es decir, con stock igual a 0.
SELECT *
FROM jocs
WHERE stock = 0;

-- Juego de prueba: añade el juego JOC-999.
INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('JOC-999', 'Juego de prueba', 9.99, 5.0, 10, 1, '2025-01-01', './Imagenes/prueba.jpg', 'Juego de prueba', NULL);

-- Muestra el juego de prueba recién añadido.
SELECT *
FROM jocs
WHERE id = 'JOC-999';

-- Antes de modificar, comprueba qué fila cambiará.
SELECT *
FROM jocs
WHERE id = 'JOC-999';

-- Cambia el stock del juego de prueba a 3.
UPDATE jocs
SET stock = 3
WHERE id = 'JOC-999';

-- Antes de eliminar, comprueba qué fila desaparecerá.
SELECT *
FROM jocs
WHERE id = 'JOC-999';

-- Elimina el juego de prueba.
DELETE FROM jocs
WHERE id = 'JOC-999';

-- Comprueba que la tabla vuelve a tener solo los 8 juegos originales.
SELECT COUNT(*) FROM jocs;