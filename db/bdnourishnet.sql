CREATE DATABASE bdnourishnet;
use bdnourishnet;

create table usuario (
    idusuario int auto_increment primary key,
    correo varchar(50),
    contrasenia varchar(255),
    img_perfil varchar(50)
);
ALTER TABLE USUARIO AUTO_INCREMENT = 100;

CREATE TABLE GENERAL (
    idgeneral INT PRIMARY KEY,
    rol VARCHAR(50),
    tipo varchar(20)
);

CREATE TABLE PERSONA (
    idpersona INT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido_pat VARCHAR(30),
    apellido_mat VARCHAR(30),
    fechanaci DATE,
    ubicacion VARCHAR(50),
    direccion VARCHAR(50),
    telefono VARCHAR(30),
    celular VARCHAR(30)
);


CREATE TABLE ORGANIZACION (
    idorg INT PRIMARY KEY,
    nombre VARCHAR(30),
    logo VARCHAR(50),
    tipo_entidad VARCHAR(30),
    ubicacion VARCHAR(50),
    direccion VARCHAR(50),
    telefono VARCHAR(30),
    celular VARCHAR(30),
    correo_contacto VARCHAR(50)
);

CREATE TABLE RESPONSABLE (
    idresp INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido_pat VARCHAR(30),
    apellido_mat VARCHAR(30),
    fechanaci DATE,
    direccion VARCHAR(50),
    telefono VARCHAR(30),
    celular VARCHAR(30),
    idorg INT,
    FOREIGN KEY (idorg) REFERENCES ORGANIZACION(idorg)
);
ALTER TABLE RESPONSABLE AUTO_INCREMENT = 1000;

CREATE TABLE VOLUNTARIO (
    idvoluntario INT  PRIMARY KEY,
    nombre VARCHAR(30),
    apellido_pat VARCHAR(30),
    apellido_mat VARCHAR(30),
    fechanaci DATE,
    turno VARCHAR(30),
    tarea VARCHAR(30),
    ubicacion VARCHAR(50),
    direccion VARCHAR(30),
    telefono VARCHAR(30),
    celular VARCHAR(30)
);

--- //////////////////////////////////////////////////////////

CREATE TABLE ADMIN (
    idadmin INT PRIMARY KEY,
    nombre VARCHAR(30),
    apellido_pat VARCHAR(30),
    apellido_mat VARCHAR(30)
);

CREATE TABLE NOTIFICACION (
    idnotif INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    mensaje VARCHAR(150),
    fecha DATETIME,
    evento VARCHAR(50),
    tipo_notif VARCHAR(30)
    link VARCHAR(50) --link del evento
);

CREATE TABLE TIENE_N (
    idusuario INT,
    idnotif INT,
    visto BOOLEAN DEFAULT 0,
    PRIMARY KEY (idusuario, idnotif),
    FOREIGN KEY (idusuario) REFERENCES USUARIO(idusuario),
    FOREIGN KEY (idnotif) REFERENCES NOTIFICACION(idnotif)
);

CREATE TABLE PETICION (
    idpeticion INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(20),
    descripcion VARCHAR(100),
    ubicacion VARCHAR(50),
    fecha_limite DATE,
    contacto VARCHAR(30),
    imagen VARCHAR(50),
    prioridad VARCHAR(30),
    tipos_alimentos VARCHAR(50),
    beneficiario VARCHAR(30),
    idgeneral INT,
    FOREIGN KEY (idgeneral) REFERENCES GENERAL(idgeneral)
);

CREATE TABLE ALIMENTO (
    idalimento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    descripcion VARCHAR(500),
    estado VARCHAR(20) DEFAULT 'No asignado',
    evaluacion VARCHAR(30) DEFAULT 'No evaluado',
    fecha_vencimiento DATE,
    fecha_publicacion DATE,
    cantidad_disponible INT DEFAULT 0,
    cantidad_reservada INT DEFAULT 0,
    cantidad_no_disponible INT DEFAULT 0,
    unidad_medida VARCHAR(30),
    imagen VARCHAR(50),
    calidad VARCHAR(20),
    idgeneral INT,
    idvoluntario INT, 
    FOREIGN KEY (idvoluntario) REFERENCES VOLUNTARIO(idvoluntario),
    FOREIGN KEY (idgeneral) REFERENCES GENERAL(idgeneral)
);
CREATE TABLE TIENE_A(
  iddonacion INT,
  idalimento INT,
  cantidad INT,
  fecha_agregado DATE,
  PRIMARY KEY (iddonacion, idalimento),
  FOREIGN KEY (iddonacion) REFERENCES DONACION(iddonacion),
  FOREIGN KEY (idalimento) REFERENCES ALIMENTO(idalimento)
);

CREATE TABLE DONACION (
    iddonacion INT AUTO_INCREMENT PRIMARY KEY,
    tipo_envio VARCHAR(20),
    estado VARCHAR(20),
    lugar_entrega VARCHAR(50),
    lat DECIMAL(10, 8) DEFAULT -16.501053,
    lng DECIMAL(11, 8) DEFAULT -68.1331531,
    fecha_entrega DATE,
    hora_entrega TIME,
    mensaje_solicitud VARCHAR(200),
    fecha_solicitud DATETIME,
    idgeneral INT,
    idvoluntario INT,
    conf_donante BOOLEAN DEFAULT 0,
    conf_voluntario BOOLEAN DEFAULT 0,
    FOREIGN KEY (idgeneral) REFERENCES GENERAL(idgeneral),
    FOREIGN KEY (idvoluntario) REFERENCES VOLUNTARIO(idvoluntario)
);

CREATE TABLE RECIBO (
    idrecibo INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    nota VARCHAR(100), --eliminar
    iddonacion INT,
    FOREIGN KEY (iddonacion) REFERENCES DONACION(iddonacion)
);

CREATE TABLE CATEGORIA (
    idcategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_cat VARCHAR(50),
    imagen VARCHAR(50)
);

CREATE TABLE TIENE_C (
    idalimento INT,
    idcategoria INT,
    PRIMARY KEY (idalimento, idcategoria),
    FOREIGN KEY (idalimento) REFERENCES ALIMENTO(idalimento),
    FOREIGN KEY (idcategoria) REFERENCES CATEGORIA(idcategoria)
);


-- FUNCIONES
-- reemplazar funciones
drop function if exists nombre_funcion;

-- funcion 1 
delimiter //
create function nombre_idx_gen(idx int)
returns varchar(100)
deterministic
begin
  declare xnombre varchar(100);
  declare xtipo varchar(20);
  select tipo into xtipo
  from general
  where idgeneral = idx;
  if xtipo like 'Persona'  then
    select concat(nombre, ' ', apellido_pat, ' ', apellido_mat) into xnombre
    from persona
    where idpersona = idx;
  else
    select nombre into xnombre
    from organizacion
    where idorg = idx;
  end if;
  return xnombre;
end//
delimiter ;

-- funcion 2 
delimiter //
create function direccion_idx_gen(idx int) returns varchar(100)
deterministic
begin
  declare xdireccion varchar(100);
  declare xtipo varchar(20);
  select tipo into xtipo
  from general
  where idgeneral = idx;
  if xtipo like 'Persona'  then
    select direccion into xdireccion
    from persona
    where idpersona = idx;
  else
    select direccion into xdireccion
    from organizacion
    where idorg = idx;
  end if;
  return xdireccion;
end//
delimiter ;

-- funcion 3

delimiter //
create function cel_idx_gen(idx int) returns varchar(100)
deterministic
begin
  declare xcel varchar(100);
  declare xtipo varchar(20);
  select tipo into xtipo
  from general
  where idgeneral = idx;
  if xtipo like 'Persona'  then
    select celular into xcel
    from persona
    where idpersona = idx;
  else
    select celular into xcel
    from organizacion
    where idorg = idx;
  end if;
  return xcel;
end//
delimiter ;

-- voluntario funcion 1
delimiter //
create function nombre_voluntario_x(idx int) returns varchar(100)
deterministic
begin
  declare xnombre varchar(100) ;
  set xnombre = 'Voluntario no asignado';
  select concat(nombre, ' ', apellido_pat, ' ', apellido_mat) into xnombre
  from voluntario
  where idvoluntario = idx;
  return xnombre;
end//
delimiter ;
-- voluntario funcion 2
delimiter //
create function direccion_voluntario_x(idx int) returns varchar(100)
deterministic
begin
  declare xdireccion varchar(100) ;
  set xdireccion = 'Sin dirección';
  select direccion into xdireccion
  from voluntario
  where idvoluntario = idx;
  return xdireccion;
end//
delimiter ;
-- voluntario funcion3
delimiter //
create function celular_voluntario_x(idx int) returns varchar(30)
deterministic
begin
  declare xcelular varchar(30) ;
  set xcelular = 'Sin número';
  select celular into xcelular
  from voluntario
  where idvoluntario = idx;
  return xcelular;
end//
delimiter ;

