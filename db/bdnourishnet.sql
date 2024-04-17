
CREATE DATABASE bdnourishnet;
use bdnourishnet;

CREATE TABLE USUARIO (
    idusuario INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(50),
    contrasenia VARCHAR(255),
    img_perfil VARCHAR(50)
);
ALTER TABLE USUARIO AUTO_INCREMENT = 100;

CREATE TABLE GENERAL (
    idgeneral INT PRIMARY KEY,
    rol VARCHAR(50)
);
-- ROL: Donador Receptor Benefico
-- TIPO: persona, organizacion
 

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
    titulo VARCHAR(250),
    descripcion VARCHAR(250),
    ubicacion VARCHAR(250),
    fecha_limite DATE,
    contacto VARCHAR(100),
    imagen VARCHAR(100),
    prioridad VARCHAR(30),
    tipos_alimentos VARCHAR(100),
    beneficiario VARCHAR(100),
    idusuario INT,
    fecha_publicacion DATETIME,
    FOREIGN KEY (idusuario) REFERENCES usuario(idusuario)
);
-- PRIORIDAD: 
-- Urgente: Situaciones críticas que requieren acción inmediata para evitar consecuencias graves.
-- Alta
-- Media: Solicitudes significativas que necesitan ser atendidas con prontitud, pero sin urgencia inmediata.
-- Baja: Peticiones de menor importancia que pueden ser manejadas en momentos menos ocupados.
-- Permanente/Continua: Necesidades o solicitudes que son constantes y no están relacionadas con una situación específica.

-- modificqué el FK solo para pruebas
CREATE TABLE ALIMENTO (
    idalimento INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30),
    descripcion VARCHAR(500),
    estado VARCHAR(20),
    fecha_vencimiento DATE,
    fecha_publicacion DATE,
    cantidad INT,
    unidad_medida VARCHAR(30),
    imagen VARCHAR(50),
    idgeneral INT,
    FOREIGN KEY (idgeneral) REFERENCES ORGANIZACION(idorg)
);

CREATE TABLE DONACION (
    iddonacion INT AUTO_INCREMENT PRIMARY KEY,
    tipo_envio VARCHAR(20),
    estado VARCHAR(20),
    fecha_entrega DATE,
    hora_entrega TIME,
    mensaje_solicitud VARCHAR(200),
    cantidad_donacion INT,
    idgeneral INT,
    idalimento INT,
    idvoluntario INT,
    -- FOREIGN KEY (idgeneral) REFERENCES GENERAL(idgeneral),
    FOREIGN KEY (idalimento) REFERENCES ALIMENTO(idalimento)
    -- FOREIGN KEY (idvoluntario) REFERENCES VOLUNTARIO(idvoluntario)
);

CREATE TABLE RECIBO (
    idrecibo INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    observacion VARCHAR(100),
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
