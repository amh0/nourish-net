-- para reiniciar el id
ALTER TABLE alimento AUTO_INCREMENT = 0;

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
VALUES ('Frutas en Conserva 200 gr', 'Frutas en conserva en almíbar ligero, una deliciosa opción como postre o refrigerio.', 'Disponible', '2025-12-05', '2024-03-25', 5, 'envases', 'product_1.jpg', 1);

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
VALUES ('Harina de Trigo', 'Harina de trigo todo uso, perfecta para hornear pan, pasteles y otros productos horneados.', 'Disponible', '2030-01-02', '2023-03-25', 30, 'u', 'product_2.jpg', 1);

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
VALUES ('Leche en Polvo 200g', 'Leche en polvo fortificada, ideal para preparar bebidas lácteas y recetas.', 'Disponible', '2024-01-03', '2023-03-25', 200, 'u', 'product_3.jpg', 2);

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
VALUES ('Atún enlatado', 'Atún enlatado en aceite vegetal, rico en proteínas y ácidos grasos omega-3.', 'Disponible', '2025-10-20', '2023-03-25', 10, 'latas', 'product_4.jpg', 2);

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
VALUES ('Arroz Blanco', 'Arroz blanco de grano largo, ideal para acompañar comidas.', 'Disponible', '2025-06-30', '2023-03-25', 50, 'kg', 'product_5.jpg',3);

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
VALUES ('Cereal de Avena', 'Cereal de avena integral, una opción nutritiva para el desayuno. Rico en fibra y vitaminas.', 'Disponible', '2025-11-28', '2023-03-25', 5, 'pqte.', 'product_6.jpg', 3);

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
VALUES ('Mermelada de Fresa 150g', 'Mermelada casera de fresa, elaborada con frutas frescas y azúcar. Deliciosa para untar en pan o galletas.', 'Disponible', '2025-11-30', '2023-03-25', 150, 'u', 'product_7.jpg', 2);

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad, unidad_medida, imagen, idgeneral)
VALUES ('Salsa de tomate 200g', 'Salsa de tomate enlatado, ideal para salsas y guisos. Hecho con tomates frescos y jugosos.', 'Disponible', '2025-03-01', '2023-03-25', 30, 'sobres', 'product_8.jpg', 1);


INSERT INTO categoria(nombre_cat, imagen) values
('Fruta', 'noimg.jpg'),
('Verdura', 'noimg.jpg'),
('Bebidas', 'noimg.jpg'),
('Organicos','noimg.jpg')
('Enlatados', 'noimg.jpg'),
('Envasados', 'noimg.jpg'),
('Ingredientes', 'noimg.jpg'),
('No perecedero', 'noimg.jpg'),
('Fresco', 'noimg.jpg'),
('Lacteo', 'noimg.jpg'),
('Otro', 'noimg.jpg'),

INSERT INTO tiene_c (idalimento, idcategoria) VALUES
(1, 1),
(1, 5),
(2, 7),
(2, 8),
(3, 6),
(3, 10),
(3, 7),
(4, 5),
(5, 6),
(5, 7),
(5, 8),
(6, 6),
(6, 7),
(7, 6),
(8, 6),
(8, 7),
(8, 4);

INSERT INTO ORGANIZACION (idorg, nombre, logo, tipo_entidad, ubicacion, direccion, telefono, celular, correo_contacto) VALUES
(1, 'Banco Nacional de Alimentos', 'bna.png', 'Corporación', 'La Paz', 'Av. 16 de Julio', '22020230', '71000001', 'contacto@bna.com'),
(2, 'Hipermaxi', 'hipermaxi.png', 'Corporación', 'La Paz', 'Av. 16 de Julio', '2204140', '71000002', 'info@hipermaxi.com'),
(3, 'Banco Ganadero', 'banco_gan.png', 'Corporación', 'Santa Cruz', '1er Anillio', '2204140', '71000003', 'contacto@ganadero.com'),
(4, 'Hansa Ltda.', 'hansa.png', 'Corporación', 'Cochabamba', 'Av. Blanco Galindo', '220414', '71000004', 'info@hansa.com'),
(5, 'Centro Comunitario de Ayuda', 'centro_com.png', 'Sin animo de Lucro', 'La Paz', 'Av. 16 de Julio', '220414', '71000005', 'contacto@comunidadlapaz.com');
