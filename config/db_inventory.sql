-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-10-2023 a las 14:14:44
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
(1, 2, '2023-10-29 00:00:00', 'nino', 50, '2023-10-22 05:18:01', '2023-10-23 16:50:26'),
(2, 2, '2023-10-22 00:00:00', 'nino', 100, '2023-10-22 05:43:46', '2023-10-22 05:43:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventariotransacciones`
--

CREATE TABLE `inventariotransacciones` (
  `id` int(11) NOT NULL,
  `id_materiales` int(11) DEFAULT NULL,
  `tipo_transaccion` enum('entrada','salida') DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha_transaccion` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventariotransacciones`
--

INSERT INTO `inventariotransacciones` (`id`, `id_materiales`, `tipo_transaccion`, `cantidad`, `fecha_transaccion`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'entrada', 100, '2023-10-22 05:18:01', '2023-10-22 05:18:01', '2023-10-22 05:18:01'),
(2, 1, 'salida', 10, '2023-10-22 05:55:27', '2023-10-22 05:18:23', '2023-10-22 05:55:27'),
(3, 2, 'entrada', 100, '2023-10-22 05:43:46', '2023-10-22 05:43:46', '2023-10-22 05:43:46'),
(4, 2, 'salida', 20, '2023-10-22 14:10:56', '2023-10-22 14:10:56', '2023-10-22 14:10:56');

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
(1, '001', 'Cable', '2023-10-22 05:17:46', '2023-10-22 05:17:46'),
(2, '002', 'antena', '2023-10-22 05:43:33', '2023-10-22 05:43:33'),
(3, '005', 'ssss', '2023-10-24 00:25:42', '2023-10-24 00:25:42');

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
(1, 'Formosa', '2023-10-22 07:17:04', '2023-10-22 07:17:04'),
(2, 'Chaco', '2023-10-22 07:17:04', '2023-10-22 07:17:04'),
(3, 'Corrientes', '2023-10-22 07:17:04', '2023-10-22 07:17:04'),
(4, 'Santa Fé', '2023-10-22 07:17:04', '2023-10-22 07:17:04');

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
(2, 2, 2, 'jose', '2023-10-22 00:00:00', 20, '2023-10-22 14:10:56', '2023-10-22 14:10:56');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocks`
--

CREATE TABLE `stocks` (
  `id` int(11) NOT NULL,
  `id_materiales` int(11) DEFAULT NULL,
  `cantidad_stock` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stocks`
--

INSERT INTO `stocks` (`id`, `id_materiales`, `cantidad_stock`, `createdAt`, `updatedAt`) VALUES
(1, 1, 90, '2023-10-22 05:18:01', '2023-10-22 05:55:27'),
(2, 2, 80, '2023-10-22 05:43:47', '2023-10-22 14:10:56');

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
-- Indices de la tabla `inventariotransacciones`
--
ALTER TABLE `inventariotransacciones`
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
-- Indices de la tabla `stocks`
--
ALTER TABLE `stocks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_materiales` (`id_materiales`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ingresos`
--
ALTER TABLE `ingresos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `inventariotransacciones`
--
ALTER TABLE `inventariotransacciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `materiales`
--
ALTER TABLE `materiales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `provincias`
--
ALTER TABLE `provincias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `salidas`
--
ALTER TABLE `salidas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `stocks`
--
ALTER TABLE `stocks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ingresos`
--
ALTER TABLE `ingresos`
  ADD CONSTRAINT `ingresos_ibfk_1` FOREIGN KEY (`id_materiales`) REFERENCES `materiales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventariotransacciones`
--
ALTER TABLE `inventariotransacciones`
  ADD CONSTRAINT `inventariotransacciones_ibfk_1` FOREIGN KEY (`id_materiales`) REFERENCES `materiales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `salidas`
--
ALTER TABLE `salidas`
  ADD CONSTRAINT `salidas_ibfk_1` FOREIGN KEY (`id_materiales`) REFERENCES `materiales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `salidas_ibfk_2` FOREIGN KEY (`id_provincias`) REFERENCES `provincias` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `stocks`
--
ALTER TABLE `stocks`
  ADD CONSTRAINT `stocks_ibfk_1` FOREIGN KEY (`id_materiales`) REFERENCES `materiales` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
