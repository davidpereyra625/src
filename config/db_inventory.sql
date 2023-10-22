-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2023 a las 16:28:53
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_inventory`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ingresos`
--

CREATE TABLE `ingresos` (
  `id` int(11) NOT NULL,
  `id_materiales` int(11) DEFAULT NULL,
  `fecha_ingreso` datetime DEFAULT NULL,
  `movil` varchar(255) DEFAULT NULL,
  `cantidad_ingreso` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ingresos`
--

INSERT INTO `ingresos` (`id`, `id_materiales`, `fecha_ingreso`, `movil`, `cantidad_ingreso`, `createdAt`, `updatedAt`) VALUES
(3, 6, '2023-10-11 00:00:00', 'david4', 500, '2023-10-11 21:40:37', '2023-10-20 12:38:26'),
(4, 1, '2023-10-12 00:00:00', 'prueba2', 221, '2023-10-12 13:56:31', '2023-10-12 13:57:03');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `id` int(11) NOT NULL,
  `codigo_materiales` varchar(255) DEFAULT NULL,
  `nombre_materiales` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materiales`
--

INSERT INTO `materiales` (`id`, `codigo_materiales`, `nombre_materiales`, `createdAt`, `updatedAt`) VALUES
(1, '001', 'Cables', '2023-10-10 15:58:40', '2023-10-10 15:58:40'),
(2, '002', 'Tornillos', '2023-10-10 15:58:40', '2023-10-10 15:58:40'),
(3, '003', 'Antenas', '2023-10-11 13:37:46', '2023-10-11 13:37:46'),
(4, '004', 'Pilas', '2023-10-11 21:35:53', '2023-10-11 21:35:53'),
(5, '005', 'Cámaras ', '2023-10-11 21:41:15', '2023-10-11 21:41:15'),
(6, '007', 'Pinzas', '2023-10-12 13:56:48', '2023-10-12 13:56:48'),
(7, '008', 'Controles', '2023-10-19 14:42:12', '2023-10-19 14:42:12'),
(8, '009', 'alambre', '2023-10-20 12:39:42', '2023-10-20 12:39:42');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincias`
--

CREATE TABLE `provincias` (
  `id` int(11) NOT NULL,
  `descripcion_provincia` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `provincias`
--

INSERT INTO `provincias` (`id`, `descripcion_provincia`, `createdAt`, `updatedAt`) VALUES
(1, 'Formosa', '2023-10-12 00:38:49', '2023-10-12 00:38:49'),
(2, 'Chaco', '2023-10-12 00:38:49', '2023-10-12 00:38:49'),
(3, 'Corrientes', '2023-10-12 00:38:49', '2023-10-12 00:38:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salidas`
--

CREATE TABLE `salidas` (
  `id` int(11) NOT NULL,
  `id_materiales` int(11) DEFAULT NULL,
  `id_provincias` int(11) DEFAULT NULL,
  `movil` varchar(255) DEFAULT NULL,
  `fecha_salida` datetime DEFAULT NULL,
  `cantidad_salida` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `salidas`
--

INSERT INTO `salidas` (`id`, `id_materiales`, `id_provincias`, `movil`, `fecha_salida`, `cantidad_salida`, `createdAt`, `updatedAt`) VALUES
(3, 6, 1, 'jose', '2023-10-27 00:00:00', 150, '2023-10-17 11:38:05', '2023-10-20 12:40:31'),
(4, 1, 1, 'jose', '2023-10-22 00:00:00', 122, '2023-10-17 13:18:36', '2023-10-17 13:18:36'),
(5, 6, 1, 'mucho', '2023-10-19 00:00:00', 1, '2023-10-19 11:53:03', '2023-10-19 11:54:20'),
(6, 1, 3, 'el deivid', '2023-10-19 00:00:00', 12345, '2023-10-19 17:00:02', '2023-10-19 17:00:02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_materiales` (`id_materiales`);

--
-- Indices de la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `provincias`
--
ALTER TABLE `provincias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_materiales` (`id_materiales`),
  ADD KEY `id_provincias` (`id_provincias`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `provincias`
--
ALTER TABLE `provincias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD CONSTRAINT `ingresos_ibfk_1` FOREIGN KEY (`id_materiales`) REFERENCES `materiales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD CONSTRAINT `salidas_ibfk_1` FOREIGN KEY (`id_materiales`) REFERENCES `materiales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `salidas_ibfk_2` FOREIGN KEY (`id_provincias`) REFERENCES `provincias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
