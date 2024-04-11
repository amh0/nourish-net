
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
    titulo VARCHAR(20),
    mensaje VARCHAR(100),
    fecha DATE,
    hora TIME,
    tipo_not VARCHAR(30)
);

CREATE TABLE TIENE_N (
    idusuario INT,
    idnotif INT,
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
    estado VARCHAR(20),
    fecha_vencimiento DATE,
    fecha_publicacion DATE,
    -- cantidad INT,
    cantidad_disponible INT DEFAULT 0,
    cantidad_reservada INT DEFAULT 0,
    cantidad_no_disponible INT DEFAULT 0,
    unidad_medida VARCHAR(30),
    imagen VARCHAR(50),
    idgeneral INT,
    FOREIGN KEY (idgeneral) REFERENCES GENERAL(idgeneral)
);

CREATE TABLE DONACION (
    iddonacion INT AUTO_INCREMENT PRIMARY KEY,
    tipo_envio VARCHAR(20),
    estado VARCHAR(20),
    lugar_entrega VARCHAR(20),
    fecha_entrega DATE,
    hora_entrega TIME,
    mensaje_solicitud VARCHAR(200),
    cantidad_donacion INT,
    idgeneral INT,
    idalimento INT,
    idvoluntario INT,
    conf_donante BOOLEAN DEFAULT 0,
    conf_receptor BOOLEAN DEFAULT 0,
    FOREIGN KEY (idgeneral) REFERENCES GENERAL(idgeneral),
    FOREIGN KEY (idalimento) REFERENCES ALIMENTO(idalimento),
    FOREIGN KEY (idvoluntario) REFERENCES VOLUNTARIO(idvoluntario)
);

CREATE TABLE RECIBO (
    idrecibo INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    nota VARCHAR(100),
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