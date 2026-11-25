CREATE TABLE jocs (
  id TEXT PRIMARY KEY,
  titulo TEXT,
  precio REAL,
  valoracion REAL,
  stock INTEGER,
  disponible INTEGER,
  fecha TEXT,
  imagen TEXT,
  descripcion TEXT,
  comentario TEXT
);

INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('RET-001', 'Chrono Trigger', 35.99, 9.1, 11, 1, '1995-03-11', './Imagenes/img_caj1.jpg', 'Legendario RPG sobre viajes en el tiempo con diseños de Akira Toriyama. Conserva la caja original y el manual en perfecto estado.', NULL);

INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('RET-002', 'Castlevania: Symphony of the Night', 41.90, 5.5, 7, 1, '1997-03-20', './Imagenes/img_caj2.jpg', 'La obra cumbre que definió un género entero dentro del castillo de Drácula. Edición Black Label completa en caja de metacrilato.', 'Obra maestra del metroidvania.');

INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('RET-003', 'Super Mario World', 45.50, 9.6, 8, 1, '1990-11-21', './Imagenes/img_caj3.jpg', NULL, NULL);

INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('RET-004', 'The Legend of Zelda: Ocarina of Time', 59.00, 9.2, 12, 1, '1998-11-21', './Imagenes/img_caj4.JPG', 'La transición al 3D que cambió la industria de los videojuegos para siempre. Incluye pila de salvado recién cambiada.', NULL);

INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('RET-005', 'Street Fighter II Turbo', 39.00, 9.9, 5, 1, '1993-07-11', './Imagenes/img_caj5.png', 'Velocidad endiablada y los doce luchadores originales reunidos en el cartucho rey de los salones recreativos.', NULL);

INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('RET-006', 'Silent Hill', 99.00, 9.3, 12, 1, '1999-01-31', './Imagenes/img_caj6.webp', NULL, NULL);

INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('RET-007', 'Metal Slug: Super Vehicle-001', 39.00, 7.7, 0, 0, '1996-04-18', './Imagenes/img_caj7.jpg', 'Caos de disparos en 2D y animaciones pixel art hechas completamente a mano. Actualmente agotado, disponible bajo reserva.', NULL);

INSERT INTO jocs (id, titulo, precio, valoracion, stock, disponible, fecha, imagen, descripcion, comentario)
VALUES ('RET-008', 'Pokémon Edición Roja', 68.99, 9.4, 6, 1, '1996-02-27', './Imagenes/img_caj8.jpg', 'El fenómeno mundial donde empezó todo el viaje por la región de Kanto. Cartucho gris con pegatina original intacta.', NULL);