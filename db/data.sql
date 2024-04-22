-- para reiniciar el id
ALTER TABLE alimento AUTO_INCREMENT = 0;

INSERT INTO alimento (nombre, descripcion, estado, fecha_vencimiento, fecha_publicacion, cantidad_disponible, cantidad_reservada, cantidad_no_disponible, unidad_medida, imagen, idgeneral) VALUES
('Frutas en Conserva 200 gr', 'Frutas en conserva en almíbar ligero, una deliciosa opción como postre o refrigerio.', 'Disponible', '2025-12-05', '2024-03-25', 5, 0, 0, 'Envases', 'product_1.jpg', 101),
('Harina de Trigo', 'Harina de trigo todo uso, perfecta para hornear pan, pasteles y otros productos horneados.', 'Disponible', '2030-01-02', '2023-03-25', 30, 0, 0, 'Unidades', 'product_2.jpg', 2002),
('Leche en Polvo 200g', 'Leche en polvo fortificada, ideal para preparar bebidas lácteas y recetas.', 'Disponible', '2024-01-03', '2023-03-25', 200, 0, 0, 'Unidades', 'product_3.jpg', 101),
('Atún enlatado', 'Atún enlatado en aceite vegetal, rico en proteínas y ácidos grasos omega-3.', 'Disponible', '2025-10-20', '2023-03-25', 10, 0, 0, 'Latas', 'product_4.jpg', 2001),
('Arroz Blanco', 'Arroz blanco de grano largo, ideal para acompañar comidas.', 'Disponible', '2025-06-30', '2023-03-25', 200, 0, 0, 'Kg', 'product_5.jpg',101),
('Cereal de Avena', 'Cereal de avena integral, una opción nutritiva para el desayuno. Rico en fibra y vitaminas.', 'Disponible', '2025-11-28', '2023-03-25', 5, 0, 0, 'Paquetes.', 'product_6.jpg', 2004),
('Mermelada de Fresa 150g', 'Mermelada casera de fresa, elaborada con frutas frescas y azúcar. Deliciosa para untar en pan o galletas.', 'Disponible', '2025-11-30', '2023-03-25', 150, 0, 0, 'Unidades', 'product_7.jpg', 2005),
('Salsa de tomate 200g', 'Salsa de tomate enlatado, ideal para salsas y guisos. Hecho con tomates frescos y jugosos.', 'Disponible', '2025-03-01', '2023-03-25', 30, 0, 0, 'Sobres', 'product_8.jpg', 100);


INSERT INTO categoria(nombre_cat, imagen) values
('Fruta', 'noimg.jpg'),
('Verdura', 'noimg.jpg'),
('Bebidas', 'noimg.jpg'),
('Organicos','noimg.jpg'),
('Enlatados', 'noimg.jpg'),
('Envasados', 'noimg.jpg'),
('Ingredientes', 'noimg.jpg'),
('No perecedero', 'noimg.jpg'),
('Fresco', 'noimg.jpg'),
('Lacteo', 'noimg.jpg'),
('Otro', 'noimg.jpg');

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

INSERT INTO GENERAL(idgeneral, rol, tipo) values
(1001, 'Donante', 'Persona'),
(1002, 'Receptor', 'Persona'),
(1003, 'Donante', 'Persona'),
(1004, 'Receptor', 'Persona'),
(1005, 'Receptor', 'Persona'),
(2001, 'Donante', 'Organizacion'),
(2002, 'Donante', 'Organizacion'),
(2003, 'Donante', 'Organizacion'),
(2004, 'Donante', 'Organizacion'),
(2005, 'Receptor', 'Organizacion'),
(2006, 'Receptor', 'Organizacion');

INSERT INTO PERSONA (idpersona, nombre, apellido_pat, apellido_mat, fechanaci, ubicacion, direccion, telefono, celular) VALUES
(1001,'Juan', 'González', 'Lopez', '1990-05-15', 'La Paz, Bolivia', 'Calle 123', '222-5555', '777-8888'),
(1002, 'Maria', 'Martinez', 'Garcia', '1985-10-20', 'Santa Cruz, Bolivia', 'Avenida Principal', '333-6666', '999-1111'),
(1003, 'Carlos', 'Rodriguez', 'Chavez', '1992-03-08', 'Cochabamba, Bolivia', 'Calle 456', '444-7777', '222-3333'),
(1004, 'Luisa', 'Gutierrez', 'Fernandez', '1988-12-01', 'Sucre, Bolivia', 'Avenida Central', '555-8888', '333-4444'),
(1005, 'Pedro', 'Vargas', 'Herrera', '1995-06-25', 'Oruro, Bolivia', 'Calle Secundaria', '666-9999', '444-5555');

INSERT INTO ORGANIZACION (idorg, nombre, logo, tipo_entidad, ubicacion, direccion, telefono, celular, correo_contacto) VALUES
(2001, 'Banco Nacional de Alimentos', 'bna.png', 'Corporación', 'La Paz', 'Av. 16 de Julio', '22020230', '71000001', 'contacto@bna.com'),
(2002, 'Hipermaxi', 'hipermaxi.png', 'Corporación', 'La Paz', 'Av. 16 de Julio', '2204140', '71000002', 'info@hipermaxi.com'),
(2003, 'Banco Ganadero', 'banco_gan.png', 'Corporación', 'Santa Cruz', '1er Anillio', '2204140', '71000003', 'contacto@ganadero.com'),
(2004, 'Hansa Ltda.', 'hansa.png', 'Corporación', 'Cochabamba', 'Av. Blanco Galindo', '220414', '71000004', 'info@hansa.com'),
(2005, 'Centro Comunitario de Ayuda', 'centro_com.png', 'Sin animo de Lucro', 'La Paz', 'Av. 16 de Julio', '220414', '71000005', 'contacto@comunidadlapaz.com'),
(2006, 'Albergue La Paz', 'centro_com.png', 'Sin animo de Lucro', 'La Paz', 'Av. Ballivian', '220414', '71000005', 'contacto@alberguelapaz.com');

-- DONACION
INSERT INTO DONACION (idgeneral,estado) VALUES (100,'Inactivo');

-- ESTADOS DE UNA DONACION
-- Inactivo: El receptor esta seleccionado los prouductos (carrito)
-- Solicitado: El receptor envió la solicitud de donacion
-- Pendiente: El donante aceptó la solicitud del receptor
-- Entregando: El receptor ó donante (pero no ambos) confirmaron la entrega del producto
-- Entregado: El receptor y donante confirmaron la entrega de la donacion
-- Cancelado: El donante o receptor canceló la donación
-- Rechazado: El donante rechazó la solicitud de donación

-- ESTADO DE UN ALIMENTO  
-- No asignado: Este alimento esta en proceso de ser donado, se registraron los datos por el donante
-- No recibido: Este alimento ya fue asignado a una donacion para que se entregue al banco de alimentos, 
--              pero aun no se completó la entrega
-- Cancelado: Este alimento pertenece a una donacion que fue cancelada, no es visible para los usuarios
-- Disponible: El producto fue recibido y tiene cantidad disponible
-- No disponible: El producto no tiene cantidad disponible

-- EVALUACION DE UNA DONACION
-- Excelente: Es visible a todos 
-- Optimo: Es visible a todos
-- Deficiente: El producto no tiene la calidad minima para ser donada, no es visible a los usuarios
-- Error: Los datos registrados no coinciden con el producto recibido, no es visible a los usuarios
-- No evaluado: No es visible a los usuarios, pero si a admins y voluntarios