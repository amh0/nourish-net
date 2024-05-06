DROP FUNCTION IF EXISTS cantidadAlimentoPublicadoDonadorx;

DELIMITER //
CREATE FUNCTION cantidadAlimentoPublicadoDonadorx(xidonador INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE xnum INT;
    
    SELECT coalesce(COUNT(*), 0) INTO xnum
	FROM alimento
	WHERE idgeneral = xidonador;

    RETURN xnum;
END //

DELIMITER ;

-- ----------------------------------------------
DROP FUNCTION IF EXISTS cantidadReceptorxEstadox;

DELIMITER //
CREATE FUNCTION cantidadReceptorxEstadox(xidonador INT, xestado VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE xnum INT;
    SELECT coalesce(COUNT(*), 0) INTO xnum
	FROM donacion
	WHERE idgeneral = xidonador
	AND lower(estado) like lower(xestado);

    RETURN xnum;
END //

DELIMITER ;

-- -------------------------------------------------
DROP FUNCTION IF EXISTS cantidadDePeticionesUsuarioX;

DELIMITER //
CREATE FUNCTION cantidadDePeticionesUsuarioX(xidusuario INT)
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE xnro INT;
    
    SELECT COUNT(*) INTO xnro
    FROM peticion
    WHERE idusuario = xidusuario;
    
    RETURN coalesce(xnro, 0);
END //

DELIMITER ;

-- --------------------------------------

SELECT * FROM DONACION WHERE IDUSUARIO = 3

-- DROP FUNCTION IF EXISTS obtenerCategoriasAlimentox;

DELIMITER //
CREATE FUNCTION obtenerCategoriasAlimentox(xidalimento INT)
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
    DECLARE xcat VARCHAR(100);
    
    SELECT GROUP_CONCAT(c.nombre_cat SEPARATOR ', ') INTO xcat
    FROM tiene_c tc
    INNER JOIN categoria c ON tc.idcategoria = c.idcategoria AND tc.idalimento = xidalimento;

    RETURN coalesce(xcat, 'SIN CATEGORIA');
END //

DELIMITER ;


-- ------------------------------------------

DROP FUNCTION IF EXISTS obtenerNombreGeneralx;
DELIMITER //
CREATE FUNCTION obtenerNombreGeneralx(generalID INT, xtipo VARCHAR(100))
RETURNS VARCHAR(100)
DETERMINISTIC
BEGIN
    declare nomCom VARCHAR(100);
    
    IF lower(xtipo) like 'organizacion' THEN
		SELECT nombre INTO nomCom
        FROM organizacion
        WHERE idorg = generalID;
    END IF;
    IF lower(xtipo) like 'persona' THEN
		SELECT CONCAT_WS(' ',apellido_pat,apellido_mat,nombre) INTO nomCom
        FROM persona
        WHERE idpersona = generalID;
    END IF;


    RETURN COALESCE(TRIM(nomCom), '');
END //

DELIMITER ;


-- ---------------------------------------------------
DROP FUNCTION IF EXISTS obtenerNombreAlimentoYCantidadPorDonacion;
DELIMITER //

CREATE FUNCTION obtenerNombreAlimentoYCantidadPorDonacion(
    xiddonacion INT
)
RETURNS VARCHAR(500)
DETERMINISTIC
BEGIN
    DECLARE x VARCHAR(500) DEFAULT '';

    SELECT GROUP_CONCAT(CONCAT(a.nombre,' (', ta.cantidad,' ',a.unidad_medida,') - ' ) SEPARATOR '\n') INTO x
    FROM TIENE_A ta
    INNER JOIN alimento a ON a.idalimento = ta.idalimento
    WHERE ta.iddonacion = xiddonacion;

	
    RETURN x;
END //
DELIMITER ;

-- -------------------------------
DELIMITER //
DROP FUNCTION IF EXISTS obtenerNombreUs;
CREATE FUNCTION obtenerNombreUs(usuarioID INT)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE nomCom VARCHAR(255);
    SET nomCom = null;

    SELECT CONCAT_WS(' ', apellido_pat ,apellido_mat ,nombre  ) INTO nomCom
    FROM voluntario
    WHERE idvoluntario = usuarioID;

    IF nomCom IS NULL THEN
        SELECT CONCAT_WS(' ', apellido_pat,apellido_mat,nombre  ) INTO nomCom
        FROM admin
        WHERE idadmin = usuarioID;
    END IF;

    IF nomCom IS NULL THEN
        SELECT CONCAT_WS(' ', apellido_pat,apellido_mat,nombre  ) INTO nomCom
        FROM persona
        WHERE idpersona = usuarioID;
    END IF;
    
	IF nomCom IS NULL THEN
        SELECT nombre INTO nomCom
        FROM organizacion
        WHERE idorg = usuarioID;
    END IF;

    RETURN COALESCE(nomCom, '');
END //

DELIMITER ;
 -- ---------------------------------------
 DROP FUNCTION IF EXISTS obtenerTipoUsuario;

DELIMITER //
CREATE FUNCTION obtenerTipoUsuario(usuarioID INT)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE tipo VARCHAR(255);
    SET tipo = null;

    SELECT 'Organización' INTO tipo
    FROM organizacion
    WHERE idorg = usuarioID;

    RETURN COALESCE(tipo, 'Usuario individual');
END //

DELIMITER ;


-- ------------------------------------------------------------------------
DROP FUNCTION IF EXISTS obtenerRolesPorIDFunc;

DELIMITER //

CREATE FUNCTION obtenerRolesPorIDFunc(usuarioID INT)
RETURNS VARCHAR(255)
DETERMINISTIC
BEGIN
    DECLARE roles VARCHAR(255);
    SET roles = '';

    IF EXISTS (SELECT 1 FROM admin WHERE idadmin = usuarioID) THEN
        SET roles = CONCAT(roles, 'administrador, ');
    END IF;

    IF EXISTS (SELECT 1 FROM voluntario WHERE idvoluntario = usuarioID) THEN
        SET roles = CONCAT(roles, 'voluntario, ');
    END IF;

    SET roles = CONCAT(roles, (
        SELECT COALESCE(GROUP_CONCAT(REPLACE(LOWER(rol), 'benefico', '') SEPARATOR ', '), '')
        FROM general WHERE idgeneral = usuarioID
    ));

    RETURN TRIM(TRAILING ', ' FROM roles); -- Eliminar la última coma si existe
END //


DELIMITER ;

-- -----------------------------------------------------------------------
DROP FUNCTION IF EXISTS obtenerVoluntarioXCantidad;

DELIMITER //
CREATE FUNCTION obtenerVoluntarioXCantidad(xidvoluntario INT, xestado VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE xnum INT;
    
    SELECT coalesce(COUNT(*), 0) INTO xnum
	FROM donacion
	WHERE idvoluntario = xidvoluntario
	AND estado like xestado;

    RETURN xnum;
END //

DELIMITER ;

-- ------------------------------------------------------------
DROP FUNCTION IF EXISTS cantidadDonadorxEstadox;

DELIMITER //
CREATE FUNCTION cantidadDonadorxEstadox(xidonador INT, xestado VARCHAR(100))
RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE xnum INT;
    SELECT coalesce(COUNT(*), 0) INTO xnum
	FROM donacion d
	INNER JOIN tiene_a ta ON d.iddonacion = ta.iddonacion
	INNER JOIN alimento a ON ta.idalimento = a.idalimento AND a.idgeneral = xidonador
	WHERE lower(d.estado) like lower(xestado);
    RETURN xnum;
END //

DELIMITER ;

-- -----------------------------------

DROP PROCEDURE IF EXISTS cantidadUsuariosOrgIndiv;
DELIMITER //
CREATE PROCEDURE cantidadUsuariosOrgIndiv()
BEGIN
    DECLARE nroOrg INT;
    DECLARE nrIndv INT;

    SELECT COALESCE(COUNT(*), 0) INTO nroOrg FROM organizacion;
    SELECT COALESCE(COUNT(*), 0) INTO nrIndv FROM usuario WHERE idusuario NOT IN(SELECT idorg FROM organizacion);
    
    SELECT nroOrg AS organizaciones, nrIndv AS 'Usuario Individual';
END //
DELIMITER ;


-- --------------------------------------------

DROP PROCEDURE IF EXISTS cantidadUsuariosAdminVolReceptDonador;
DELIMITER //
CREATE PROCEDURE cantidadUsuariosAdminVolReceptDonador()
BEGIN
    DECLARE nrAdmin INT;
    DECLARE nrVolun INT;
    DECLARE nrDona INT;
    DECLARE nrRec INT;
    SELECT COALESCE(COUNT(*), 0) INTO nrAdmin FROM admin;
    SELECT COALESCE(COUNT(*), 0) INTO nrVolun FROM voluntario;
    SELECT COALESCE(COUNT(*), 0) INTO nrDona FROM general WHERE rol LIKE '%donador%';
    SELECT COALESCE(COUNT(*), 0) INTO nrRec FROM general WHERE rol LIKE '%receptor%';
    SELECT nrAdmin AS Administradores, nrVolun AS Voluntarios, nrDona AS Donadores, nrRec AS Receptores;
END //
DELIMITER ;



CALL cantidadUsuariosAdminVolReceptDonador();


-- -----------------------------
DELIMITER //

DROP PROCEDURE IF EXISTS contarMiembrosDonacionesAlimentos;

CREATE PROCEDURE contarMiembrosDonacionesAlimentos()
BEGIN
    DECLARE nrMiem INT;
    DECLARE nrDon INT;
    DECLARE nrAlim INT;
    SELECT COUNT(*) INTO nrMiem FROM usuario WHERE idusuario NOT IN (SELECT idadmin FROM admin);
    SELECT COUNT(*) INTO nrDon FROM donacion WHERE estado LIKE 'Entregado';
    SELECT COUNT(*) INTO nrAlim FROM alimento WHERE estado LIKE 'Disponible';
    SELECT nrMiem, nrDon, nrAlim;
END //

DELIMITER ;


CALL contarMiembrosDonacionesAlimentos();

SELECT * FROM admin

