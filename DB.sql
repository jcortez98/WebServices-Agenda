CREATE DATABASE AgendaIn6avCortez;
USE AgendaIn6avCortez;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_categoria` (`in_idUsuario` INT, `in_nombreCategoria` VARCHAR(25))  BEGIN
	DECLARE in_idCategoria INT;
	INSERT INTO categoria (nombreCategoria) values (in_nombreCategoria);
	SET in_idCategoria = (SELECT MAX(idCategoria) from categoria);
	INSERT INTO detalleCategoria (idUsuario, idCategoria) VALUES (in_idUsuario,in_idCategoria);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_cita` (`in_fecha` DATE, `in_lugar` VARCHAR(25), `in_descripcion` VARCHAR(50), `in_idContacto` INT, `in_idUsuario` INT)  BEGIN
	insert into cita (fecha, lugar, descripcion, idUsuario,idContacto) values (in_fecha, in_lugar,in_descripcion, in_idUsuario,in_idContacto);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_contacto` (`in_nombre` VARCHAR(30), `in_apellido` VARCHAR(35), `in_direccion` VARCHAR(30), `in_telefono` VARCHAR(25), `in_correo` VARCHAR(30), `in_idCategoria` INT, `in_foto` TEXT)  BEGIN
	INSERT INTO contacto (nombre,apellido,direccion,telefono,correo,stringFoto,idCategoria) values (in_nombre,in_apellido, in_direccion, in_telefono,in_correo,in_foto,in_idCategoria);
	Select *from contacto order by idContacto desc limit 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_tarea` (`in_nombre` VARCHAR(30), `in_descripcion` VARCHAR(255), `in_fecha` DATE, `in_idUsuario` INT, `in_idPrioridad` INT, `in_idCategoria` INT)  BEGIN
	INSERT INTO tarea (nombre,descripcion,fecha,idUsuario,idPrioridad,idCategoria) values (in_nombre,in_descripcion, in_fecha,in_idUsuario ,in_idPrioridad,in_idCategoria);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `add_usuario` (`in_nick` VARCHAR(25), `in_contrasena` VARCHAR(25), `in_imagen` TEXT)  BEGIN
  INSERT INTO usuario (nick,contrasena, stringFoto) values(in_nick, in_contrasena, in_imagen);
  SELECT * FROM usuario order by idUsuario desc limit 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_categoria` (`in_idCategoria` INT)  BEGIN
  DELETE FROM contacto where idCategoria = in_idCategoria;
  DELETE FROM detalleCategoria WHERE idCategoria = in_idCategoria;
  DELETE FROM categoria WHERE idCategoria = in_idCategoria;
  
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_cita` (`in_idCita` INT)  BEGIN
  DELETE FROM cita where idCita = in_idCita;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_contacto` (`in_idContacto` INT)  BEGIN
  DELETE FROM contacto WHERE idContacto = in_idContacto;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_tarea` (`in_idTarea` INT)  BEGIN
  DELETE FROM tarea where idTarea = in_idTarea;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_usuario` (`in_idUsuario` INT)  BEGIN
  DELETE FROM usuario where idUsuario = in_idUsuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_cita` (`in_idCita` INT, `in_fecha` DATE, `in_lugar` VARCHAR(25), `in_descripcion` VARCHAR(50), `in_idContacto` INT)  BEGIN
  UPDATE cita SET fecha = in_fecha, lugar = in_lugar, descripcion = in_descripcion, idContacto = in_idContacto where idCita = in_idCita;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_contacto` (`in_idUsuario` INT, `in_idContacto` INT, `in_nombre` VARCHAR(30), `in_apellido` VARCHAR(35), `in_direccion` VARCHAR(30), `in_telefono` VARCHAR(25), `in_correo` VARCHAR(30), `in_foto` TEXT, `in_idCategoria` INT)  BEGIN
  UPDATE contacto SET nombre = in_nombre, apellido = in_apellido, direccion = in_direccion, telefono = in_telefono,
  correo = in_correo, stringFoto = in_foto,idCategoria = in_idCategoria
  where idContacto = in_idContacto;
  UPDATE detalleusuario SET idUsuario = in_idUsuario where idContacto = in_idContacto;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_tarea` (`in_idTarea` INT, `in_nombre` VARCHAR(30), `in_descripcion` VARCHAR(255), `in_fecha` DATE, `in_idPrioridad` INT, `in_idCategoria` INT)  BEGIN
  UPDATE tarea SET nombre = in_nombre, descripcion = in_descripcion, fecha = in_fecha, idPrioridad = in_idPrioridad,idCategoria = in_idCategoria
  where idTarea = in_idTarea;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `set_usuario` (`in_idUsuario` INT, `in_nick` VARCHAR(25), `in_contrasena` VARCHAR(25), `in_foto` TEXT)  BEGIN
  UPDATE usuario SET nick = in_nick, contrasena = in_contrasena, stringFoto = in_foto where idUsuario = in_idUsuario;
END$$

DELIMITER ;

CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL,
  `nombrecategoria` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idCategoria`, `nombrecategoria`) VALUES
(1, 'Trabajos'),
(2, 'Universidad'),
(3, 'Amigos'),
(4, 'Wifus'),
(5, 'Menu'),
(6, 'prueba'),
(7, 'prueba'),
(8, 'prueba'),
(9, '0'),
(10, 'prueba'),
(11, 'chamoky');

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `categoria_usuario`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `categoria_usuario` (
`nombreCategoria` varchar(20)
,`idCategoria` int(11)
,`idDetalleCategoria` int(11)
,`idUsuario` int(11)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `idCita` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `descripcion` varchar(50) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idContacto` int(11) NOT NULL,
  `lugar` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`idCita`, `fecha`, `descripcion`, `idUsuario`, `idContacto`, `lugar`) VALUES
(1, '2017-07-14', 'Prueba de editar', 1, 1, 'KINAL centro Educativo');

--
-- Disparadores `cita`
--
DELIMITER $$
CREATE TRIGGER `hystoryci` BEFORE INSERT ON `cita` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Agrego una cita",now(),NEW.idUsuario);	
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hystorydci` BEFORE DELETE ON `cita` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Elimino una cita",now(),old.idUsuario);	
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hystorysetci` BEFORE UPDATE ON `cita` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Edito una cita",now(),old.idUsuario);	
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `citas_user`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `citas_user` (
`idContacto` int(11)
,`idCategoria` int(11)
,`nombre` varchar(30)
,`apellido` varchar(30)
,`direccion` varchar(30)
,`telefono` varchar(12)
,`correo` varchar(30)
,`idCita` int(11)
,`fecha` date
,`lugar` varchar(50)
,`descripcion` varchar(50)
,`idUsuario` int(11)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `idContacto` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `direccion` varchar(30) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `correo` varchar(30) NOT NULL,
  `stringFoto` text,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`idContacto`, `nombre`, `apellido`, `direccion`, `telefono`, `correo`, `stringFoto`, `idCategoria`) VALUES
(1, 'josue', 'hernandez', 'kkdkdk', '52145332', 'jos@gmail.com', 'http://tecdistro.com/wp-content/uploads/2015/04/user.png?x80029', 1),
(2, 'oprue', 'd', 'd', '55555', 'dd', 'http://tecdistro.com/wp-content/uploads/2015/04/user.png?x80029', 2),
(3, 'xocoy', 'rosales', 'ddd', 'ddd', 'llls', 'http://tecdistro.com/wp-content/uploads/2015/04/user.png?x80029', 2),
(4, 'xocoy', 'rosales', 'ddd', 'ddd', 'llls', 'http://tecdistro.com/wp-content/uploads/2015/04/user.png?x80029', 2),
(7, '0', '0', '0', '0', '0', 'http://tecdistro.com/wp-content/uploads/2015/04/user.png?x80029', 1),
(8, '0', '0', '0', '0', '0', 'http://tecdistro.com/wp-content/uploads/2015/04/user.png?x80029', 1),
(9, '0', '0', '0', '0', '0', 'http://tecdistro.com/wp-content/uploads/2015/04/user.png?x80029', 1),
(11, 'PRUEBA', 'rosales', 'ddd', 'ddd', 'llls', 'http://tecdistro.com/wp-content/uploads/2015/04/user.png?x80029', 2);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `contacto_usuario`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `contacto_usuario` (
`idContacto` int(11)
,`stringFoto` text
,`idCategoria` int(11)
,`nombre` varchar(30)
,`apellido` varchar(30)
,`direccion` varchar(30)
,`telefono` varchar(12)
,`correo` varchar(30)
,`idUsuario` int(11)
,`idDetalleUsuario` int(11)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallecategoria`
--

CREATE TABLE `detallecategoria` (
  `idDetalleCategoria` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detallecategoria`
--

INSERT INTO `detallecategoria` (`idDetalleCategoria`, `idUsuario`, `idCategoria`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 10),
(4, 1, 11);

--
-- Disparadores `detallecategoria`
--
DELIMITER $$
CREATE TRIGGER `hystoryc` BEFORE INSERT ON `detallecategoria` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Agrego una categoria",now(),NEW.idUsuario);	
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hystorydc` BEFORE DELETE ON `detallecategoria` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Elimino una categoria",now(),old.idUsuario);	
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hystorysetc` BEFORE UPDATE ON `detallecategoria` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Edito una categoria",now(),old.idUsuario);	
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleusuario`
--

CREATE TABLE `detalleusuario` (
  `idDetalleUsuario` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idContacto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `detalleusuario`
--

INSERT INTO `detalleusuario` (`idDetalleUsuario`, `idUsuario`, `idContacto`) VALUES
(1, 1, 1),
(2, 1, 2),
(6, 1, 3),
(7, 1, 4),
(9, 1, 11);

--
-- Disparadores `detalleusuario`
--
DELIMITER $$
CREATE TRIGGER `hystory` BEFORE INSERT ON `detalleusuario` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Agrego un contacto",now(),NEW.idUsuario);	
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hystoryd` BEFORE DELETE ON `detalleusuario` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Elimino contacto",now(),old.idUsuario);	
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hystoryset` BEFORE UPDATE ON `detalleusuario` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Edito un contacto",now(),old.idUsuario);	
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `idHistorial` int(11) NOT NULL,
  `accion` varchar(30) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `idUsuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `historial`
--

INSERT INTO `historial` (`idHistorial`, `accion`, `fecha`, `idUsuario`) VALUES
(1, 'Agrego una categoria', '2017-06-15 22:53:42', 1),
(2, 'Agrego una categoria', '2017-06-16 07:53:45', 1),
(4, 'Agrego una tarea', '2017-06-16 07:59:14', 1),
(5, 'Agrego una tarea', '2017-06-16 07:59:25', 1),
(6, 'Agrego una tarea', '2017-06-16 08:01:53', 1),
(7, 'Edito una tarea', '2017-06-16 08:04:41', 1),
(8, 'Elimino una tarea', '2017-06-16 08:05:02', 1),
(9, 'Agrego una tarea', '2017-06-16 08:05:33', 1),
(10, 'Agrego una tarea', '2017-06-16 08:05:35', 1),
(11, 'Agrego una tarea', '2017-06-16 08:05:38', 1),
(12, 'Elimino una tarea', '2017-06-16 08:07:12', 1),
(13, 'Elimino una tarea', '2017-06-16 08:07:13', 1),
(14, 'Elimino una tarea', '2017-06-16 08:07:15', 1),
(15, 'Agrego una tarea', '2017-06-16 08:07:42', 1),
(17, 'Agrego un contacto', '2017-06-16 09:07:17', 1),
(20, 'Agrego una cita', '2017-06-16 17:35:09', 1),
(21, 'Agrego un contacto', '2017-06-17 01:57:44', 1),
(26, 'Agrego una categoria', '2017-07-14 20:18:54', 1),
(27, 'Agrego una categoria', '2017-07-14 20:32:17', 1),
(28, 'Agrego un contacto', '2017-07-14 22:28:29', 1),
(29, 'Agrego un contacto', '2017-07-14 22:28:39', 1),
(30, 'Agrego un contacto', '2017-07-19 05:43:32', 1),
(31, 'Agrego un contacto', '2017-07-19 05:44:04', 1),
(32, 'Agrego un contacto', '2017-07-19 15:34:21', 1),
(33, 'Agrego un contacto', '2017-07-19 15:42:21', 1),
(34, 'Agrego un contacto', '2017-07-19 15:44:39', 1),
(35, 'Edito un contacto', '2017-07-19 16:03:18', 1),
(36, 'Agrego una categoria', '2017-07-20 05:16:34', 1),
(37, 'Elimino una categoria', '2017-07-20 05:20:04', 1),
(38, 'Agrego una tarea', '2017-07-20 07:54:40', 1),
(39, 'Edito una tarea', '2017-07-20 07:57:42', 1),
(40, 'Edito una tarea', '2017-07-20 07:58:13', 1),
(41, 'Elimino una tarea', '2017-07-20 08:02:33', 1),
(42, 'Agrego una cita', '2017-07-20 17:05:21', 1),
(43, 'Elimino una cita', '2017-07-20 17:06:49', 1),
(45, 'Edito una cita', '2017-07-20 17:23:07', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prioridad`
--

CREATE TABLE `prioridad` (
  `idPrioridad` int(11) NOT NULL,
  `descripcion` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `prioridad`
--

INSERT INTO `prioridad` (`idPrioridad`, `descripcion`) VALUES
(1, 'Alta'),
(2, 'Intermedio'),
(3, 'Baja');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idPrioridad` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `nombre`, `descripcion`, `fecha`, `idUsuario`, `idPrioridad`, `idCategoria`) VALUES
(1, 'ss', 'ss', '2017-06-17', 1, 2, 2),
(2, 'ss', 'ss', '2017-06-17', 1, 2, 2),
(7, 'prueba', 'prueba todo lo que escribi en donde esta weby', '2017-07-08', 1, 3, 2);

--
-- Disparadores `tarea`
--
DELIMITER $$
CREATE TRIGGER `hystorydt` BEFORE DELETE ON `tarea` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Elimino una tarea",now(),old.idUsuario);	
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hystorysett` BEFORE UPDATE ON `tarea` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Edito una tarea",now(),old.idUsuario);	
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `hystoryt` BEFORE INSERT ON `tarea` FOR EACH ROW BEGIN
	INSERT INTO Historial(accion,fecha,idUsuario) values ("Agrego una tarea",now(),NEW.idUsuario);	
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `tareas_user`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `tareas_user` (
`nombreCategoria` varchar(20)
,`nombrePrioridad` varchar(30)
,`idTarea` int(11)
,`idUsuario` int(11)
,`idCategoria` int(11)
,`idPrioridad` int(11)
,`fecha` date
,`nombre` varchar(30)
,`descripcion` varchar(255)
);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nick` varchar(30) NOT NULL,
  `contrasena` varchar(30) NOT NULL,
  `stringFoto` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nick`, `contrasena`, `stringFoto`) VALUES
(1, 'jcortez', '111111', 'hola'),
(2, 'd', 'd', NULL),
(3, '22', '22', NULL),
(4, '1', '1', ''),
(5, 'como estan', '1', ''),
(6, 'comoesss', 'll', ''),
(7, '@rocma', '123456', NULL),
(8, 'holo', 'hol', 'hol'),
(9, '@rakno', '123456', NULL),
(10, 'holis', 'holis', 'images/f.png'),
(11, 'holis', 'holis', 'images/f.png'),
(12, 'holid', 'holid', 'images/f.png'),
(13, 'ff', 'ff', 'images/f.png'),
(14, 'ddd', 'dddd', 'images/f.png'),
(15, 'dd', 'dd', 'images/WIN_20170526_17_06_43_Pro.jpg'),
(16, 'dd', 'dd', 'images/WIN_20170526_17_06_43_Pro.jpg'),
(17, '111', '111', 'images/WIN_20170526_17_06_43_Pro.jpg'),
(18, 'holo', 'hol', 'hol'),
(19, 'prueba dos ', 'puta', 'images/WIN_20170526_17_06_43_Pro.jpg'),
(20, 'holis', 'holis', 'images/WIN_20170521_18_42_01_Pro.jpg'),
(21, 'dd', 'dd', 'images/WIN_20170521_18_41_59_Pro.jpg');

-- --------------------------------------------------------

--
-- Estructura para la vista `categoria_usuario`
--
DROP TABLE IF EXISTS `categoria_usuario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `categoria_usuario`  AS  select `c`.`nombrecategoria` AS `nombreCategoria`,`c`.`idCategoria` AS `idCategoria`,`dc`.`idDetalleCategoria` AS `idDetalleCategoria`,`dc`.`idUsuario` AS `idUsuario` from (`detallecategoria` `dc` join `categoria` `c` on((`c`.`idCategoria` = `dc`.`idCategoria`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `citas_user`
--
DROP TABLE IF EXISTS `citas_user`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `citas_user`  AS  select `c`.`idContacto` AS `idContacto`,`c`.`idCategoria` AS `idCategoria`,`c`.`nombre` AS `nombre`,`c`.`apellido` AS `apellido`,`c`.`direccion` AS `direccion`,`c`.`telefono` AS `telefono`,`c`.`correo` AS `correo`,`p`.`idCita` AS `idCita`,`p`.`fecha` AS `fecha`,`p`.`lugar` AS `lugar`,`p`.`descripcion` AS `descripcion`,`p`.`idUsuario` AS `idUsuario` from (`cita` `p` join `contacto` `c` on((`c`.`idContacto` = `p`.`idContacto`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `contacto_usuario`
--
DROP TABLE IF EXISTS `contacto_usuario`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `contacto_usuario`  AS  select `c`.`idContacto` AS `idContacto`,`c`.`stringFoto` AS `stringFoto`,`c`.`idCategoria` AS `idCategoria`,`c`.`nombre` AS `nombre`,`c`.`apellido` AS `apellido`,`c`.`direccion` AS `direccion`,`c`.`telefono` AS `telefono`,`c`.`correo` AS `correo`,`du`.`idUsuario` AS `idUsuario`,`du`.`idDetalleUsuario` AS `idDetalleUsuario` from (`detalleusuario` `du` join `contacto` `c` on((`c`.`idContacto` = `du`.`idContacto`))) ;

-- --------------------------------------------------------

--
-- Estructura para la vista `tareas_user`
--
DROP TABLE IF EXISTS `tareas_user`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `tareas_user`  AS  select `c`.`nombrecategoria` AS `nombreCategoria`,`p`.`descripcion` AS `nombrePrioridad`,`t`.`idTarea` AS `idTarea`,`t`.`idUsuario` AS `idUsuario`,`t`.`idCategoria` AS `idCategoria`,`t`.`idPrioridad` AS `idPrioridad`,`t`.`fecha` AS `fecha`,`t`.`nombre` AS `nombre`,`t`.`descripcion` AS `descripcion` from ((`tarea` `t` join `categoria` `c` on((`c`.`idCategoria` = `t`.`idCategoria`))) join `prioridad` `p` on((`p`.`idPrioridad` = `t`.`idPrioridad`))) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idContacto` (`idContacto`);

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`idContacto`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `detallecategoria`
--
ALTER TABLE `detallecategoria`
  ADD PRIMARY KEY (`idDetalleCategoria`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `detalleusuario`
--
ALTER TABLE `detalleusuario`
  ADD PRIMARY KEY (`idDetalleUsuario`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idContacto` (`idContacto`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD PRIMARY KEY (`idHistorial`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `prioridad`
--
ALTER TABLE `prioridad`
  ADD PRIMARY KEY (`idPrioridad`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `idUsuario` (`idUsuario`),
  ADD KEY `idPrioridad` (`idPrioridad`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `idCita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `idContacto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `detallecategoria`
--
ALTER TABLE `detallecategoria`
  MODIFY `idDetalleCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `detalleusuario`
--
ALTER TABLE `detalleusuario`
  MODIFY `idDetalleUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT de la tabla `historial`
--
ALTER TABLE `historial`
  MODIFY `idHistorial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT de la tabla `prioridad`
--
ALTER TABLE `prioridad`
  MODIFY `idPrioridad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `cita_ibfk_2` FOREIGN KEY (`idContacto`) REFERENCES `contacto` (`idContacto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `contacto_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detallecategoria`
--
ALTER TABLE `detallecategoria`
  ADD CONSTRAINT `detallecategoria_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `detallecategoria_ibfk_2` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `detalleusuario`
--
ALTER TABLE `detalleusuario`
  ADD CONSTRAINT `detalleusuario_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `detalleusuario_ibfk_2` FOREIGN KEY (`idContacto`) REFERENCES `contacto` (`idContacto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `tarea_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `tarea_ibfk_2` FOREIGN KEY (`idPrioridad`) REFERENCES `prioridad` (`idPrioridad`),
  ADD CONSTRAINT `tarea_ibfk_3` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE CASCADE ON UPDATE CASCADE;
