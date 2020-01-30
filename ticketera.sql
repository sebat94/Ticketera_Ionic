-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-03-2018 a las 17:49:21
-- Versión del servidor: 10.1.30-MariaDB
-- Versión de PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ticketera`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `fk_admin_user` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `authtoken`
--

CREATE TABLE `authtoken` (
  `id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `fk_authtoken_user` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `authtoken`
--

INSERT INTO `authtoken` (`id`, `date`, `token`, `fk_authtoken_user`) VALUES
(9, '2018-03-03 13:35:03', 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MjAwODA1MDMsInN1YiI6InVzZXJzL1R6TVVvY01GNHAiLCJleHAiOjE1MjAwODA1MDZ9.gp8udlklvcy7T7b5ZR-XsSl4XvG9d1IorHQZWx0IH38TyMs7WSNy58zKrgOHzOVy86ba__HNs8WCbZhBFvqCXA', 1),
(11, '2018-03-03 13:37:42', 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MjAwODA2NjIsInN1YiI6InVzZXJzL1R6TVVvY01GNHAiLCJleHAiOjE1MjAwODA2NjV9.b7p3yA6IkAf1Ii27-abJkryQ-nZly3faZLxau9gLQOq5jsK6wdY-1hsQKdepEq4KVrNhJytF-y20JB5BV1yX9w', 3),
(12, '2018-03-03 13:40:14', 'eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE1MjAwODA4MTQsInN1YiI6InVzZXJzL1R6TVVvY01GNHAiLCJleHAiOjE1MjAwODA4MTd9.q_lM-FanBcswn2xHat-ciF1AujyGpFpAWYFdfa5gfazLusrLkkB1IpzBeRXk_OAWqCFLc-ioL46NXrW0HuWTpw', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `building`
--

CREATE TABLE `building` (
  `id` bigint(20) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `address` varchar(255) DEFAULT NULL,
  `lat` float NOT NULL,
  `lon` float NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `fk_building_city` bigint(20) DEFAULT NULL,
  `fk_building_company` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `building`
--

INSERT INTO `building` (`id`, `active`, `address`, `lat`, `lon`, `name`, `type`, `fk_building_city`, `fk_building_company`) VALUES
(1, 0, 'cacad', 123, 213, 'building guapa', 0, 1, 1),
(2, 0, 'calle falsa 123', 123, 123, 'super building', 0, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`id`, `name`) VALUES
(1, 'alicante');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `company`
--

CREATE TABLE `company` (
  `id` bigint(20) NOT NULL,
  `cif` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '0',
  `name` varchar(255) DEFAULT NULL,
  `fk_company_promotor` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `company`
--

INSERT INTO `company` (`id`, `cif`, `active`, `name`, `fk_company_promotor`) VALUES
(1, '416451', 1, 'DISCO', 1),
(2, '12313A', 0, 'Super disco', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `event`
--

CREATE TABLE `event` (
  `id` bigint(20) NOT NULL,
  `date` datetime DEFAULT NULL,
  `date_to_string` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `fk_event_building` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `event`
--

INSERT INTO `event` (`id`, `date`, `date_to_string`, `name`, `fk_event_building`) VALUES
(1, '2018-03-13 04:17:00', '2018-03-13 04:17:00', 'Evento guapo', 1),
(2, '2018-03-17 01:01:00', '2018-03-17 01:01', 'evento nuevo', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `promotor`
--

CREATE TABLE `promotor` (
  `id` bigint(20) NOT NULL,
  `fk_promotor_user` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `promotor`
--

INSERT INTO `promotor` (`id`, `fk_promotor_user`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rrpp`
--

CREATE TABLE `rrpp` (
  `id` bigint(20) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `fk_rrpp_user` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rrpp`
--

INSERT INTO `rrpp` (`id`, `active`, `fk_rrpp_user`) VALUES
(1, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rrppjefe`
--

CREATE TABLE `rrppjefe` (
  `id` bigint(20) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `fk_rrppjefe_employee` bigint(20) DEFAULT NULL,
  `fk_rrppjefe_master` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rrpp_building`
--

CREATE TABLE `rrpp_building` (
  `id` bigint(20) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `comission` float NOT NULL,
  `fk_rrppbuilding_building` bigint(20) DEFAULT NULL,
  `fk_rrppbuilding_rrpp` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rrpp_building`
--

INSERT INTO `rrpp_building` (`id`, `active`, `comission`, `fk_rrppbuilding_building`, `fk_rrppbuilding_rrpp`) VALUES
(1, 1, 4, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `id` bigint(20) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `fk_ticket_rrpp_seller` bigint(20) DEFAULT NULL,
  `fk_ticket_typeticket` bigint(20) DEFAULT NULL,
  `fk_ticket_user` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `ticket`
--

INSERT INTO `ticket` (`id`, `active`, `fk_ticket_rrpp_seller`, `fk_ticket_typeticket`, `fk_ticket_user`) VALUES
(1, 1, NULL, 2, 2),
(2, 1, NULL, 1, 2),
(3, 1, 1, 2, 2),
(4, 1, 1, 1, 2),
(5, 1, NULL, 3, 2),
(6, 0, 1, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `typeticket`
--

CREATE TABLE `typeticket` (
  `id` bigint(20) NOT NULL,
  `amount_sold` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `total_amount` int(11) NOT NULL,
  `fk_typeticket_event` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `typeticket`
--

INSERT INTO `typeticket` (`id`, `amount_sold`, `name`, `price`, `total_amount`, `fk_typeticket_event`) VALUES
(1, 2, 'normal', 50, 1500, 1),
(2, 3, 'VIP', 350, 500, 1),
(3, 1, 'normal', 50, 500, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL,
  `active` tinyint(1) DEFAULT '0',
  `birthdate` bigint(20) DEFAULT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` int(11) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `active`, `birthdate`, `dni`, `email`, `gender`, `lastname`, `name`, `password`) VALUES
(1, 0, 0, '', 'p@g.com', 2, '', '', '$2a$12$GIVPf9plIAVCvY4l.93pCefAyDygsQNp37DUcudR1CDSSBQJwPrJ6'),
(2, 0, 0, '', 'u@g.com', 2, '', '', '$2a$12$8pUhNK2B12ywUskctOnVeeghEd4BEU2pTLMGkZgQFmMi9ZYSxBFTe'),
(3, 0, 0, '', 'r@g.com', 2, '', '', '$2a$12$rHbBPmy0vniyussvKWJtiue.LEIgQyUqBAHMFKgF6jOz4ZJwtxBH.'),
(4, 0, 0, '', 'pcl23ua@gmail.com', 2, '', '', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6148p8db6dvf5f893vlnq8j6j` (`fk_admin_user`);

--
-- Indices de la tabla `authtoken`
--
ALTER TABLE `authtoken`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKo9tv1gbgd00xas1a3p4jyl0i7` (`fk_authtoken_user`);

--
-- Indices de la tabla `building`
--
ALTER TABLE `building`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKpv4rxsv48j4xg12425htl62eu` (`fk_building_city`),
  ADD KEY `FKqu72da3jr6fgwndjflxt56c98` (`fk_building_company`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlnt5fa3d0iq8w5n40ypod2xx8` (`fk_company_promotor`);

--
-- Indices de la tabla `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKbqhi6pta4mjmacr4k5ohpu7tm` (`fk_event_building`);

--
-- Indices de la tabla `promotor`
--
ALTER TABLE `promotor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK144ithpu2jk119emjd7pjbr9a` (`fk_promotor_user`);

--
-- Indices de la tabla `rrpp`
--
ALTER TABLE `rrpp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKil7nbk9jax3qa4c76bgodejqc` (`fk_rrpp_user`);

--
-- Indices de la tabla `rrppjefe`
--
ALTER TABLE `rrppjefe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKopkjv7n1mvuh67l6buiybt8lq` (`fk_rrppjefe_employee`),
  ADD KEY `FKjcq1jdnbdt2fam7qlffm39fy` (`fk_rrppjefe_master`);

--
-- Indices de la tabla `rrpp_building`
--
ALTER TABLE `rrpp_building`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK37j3qbtm8s1kxhdvhqj2uyw50` (`fk_rrppbuilding_building`),
  ADD KEY `FK3wdvv2749xm52c8ur04tds92n` (`fk_rrppbuilding_rrpp`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7vscms4envpbtkx34scbq5ko0` (`fk_ticket_rrpp_seller`),
  ADD KEY `FK41ouk61o74kuh6y46651uyn88` (`fk_ticket_typeticket`),
  ADD KEY `FKcl226ig2h2ujmmakvvhhsqil6` (`fk_ticket_user`);

--
-- Indices de la tabla `typeticket`
--
ALTER TABLE `typeticket`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKa3o43m9ng6e9bfj466k2sf6oc` (`fk_typeticket_event`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `authtoken`
--
ALTER TABLE `authtoken`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `building`
--
ALTER TABLE `building`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `company`
--
ALTER TABLE `company`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `event`
--
ALTER TABLE `event`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `promotor`
--
ALTER TABLE `promotor`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rrpp`
--
ALTER TABLE `rrpp`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `rrppjefe`
--
ALTER TABLE `rrppjefe`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rrpp_building`
--
ALTER TABLE `rrpp_building`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `typeticket`
--
ALTER TABLE `typeticket`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `FK6148p8db6dvf5f893vlnq8j6j` FOREIGN KEY (`fk_admin_user`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `authtoken`
--
ALTER TABLE `authtoken`
  ADD CONSTRAINT `FKo9tv1gbgd00xas1a3p4jyl0i7` FOREIGN KEY (`fk_authtoken_user`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `building`
--
ALTER TABLE `building`
  ADD CONSTRAINT `FKpv4rxsv48j4xg12425htl62eu` FOREIGN KEY (`fk_building_city`) REFERENCES `city` (`id`),
  ADD CONSTRAINT `FKqu72da3jr6fgwndjflxt56c98` FOREIGN KEY (`fk_building_company`) REFERENCES `company` (`id`);

--
-- Filtros para la tabla `company`
--
ALTER TABLE `company`
  ADD CONSTRAINT `FKlnt5fa3d0iq8w5n40ypod2xx8` FOREIGN KEY (`fk_company_promotor`) REFERENCES `promotor` (`id`);

--
-- Filtros para la tabla `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `FKbqhi6pta4mjmacr4k5ohpu7tm` FOREIGN KEY (`fk_event_building`) REFERENCES `building` (`id`);

--
-- Filtros para la tabla `promotor`
--
ALTER TABLE `promotor`
  ADD CONSTRAINT `FK144ithpu2jk119emjd7pjbr9a` FOREIGN KEY (`fk_promotor_user`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `rrpp`
--
ALTER TABLE `rrpp`
  ADD CONSTRAINT `FKil7nbk9jax3qa4c76bgodejqc` FOREIGN KEY (`fk_rrpp_user`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `rrppjefe`
--
ALTER TABLE `rrppjefe`
  ADD CONSTRAINT `FKjcq1jdnbdt2fam7qlffm39fy` FOREIGN KEY (`fk_rrppjefe_master`) REFERENCES `rrpp` (`id`),
  ADD CONSTRAINT `FKopkjv7n1mvuh67l6buiybt8lq` FOREIGN KEY (`fk_rrppjefe_employee`) REFERENCES `rrpp` (`id`);

--
-- Filtros para la tabla `rrpp_building`
--
ALTER TABLE `rrpp_building`
  ADD CONSTRAINT `FK37j3qbtm8s1kxhdvhqj2uyw50` FOREIGN KEY (`fk_rrppbuilding_building`) REFERENCES `building` (`id`),
  ADD CONSTRAINT `FK3wdvv2749xm52c8ur04tds92n` FOREIGN KEY (`fk_rrppbuilding_rrpp`) REFERENCES `rrpp` (`id`);

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `FK41ouk61o74kuh6y46651uyn88` FOREIGN KEY (`fk_ticket_typeticket`) REFERENCES `typeticket` (`id`),
  ADD CONSTRAINT `FK7vscms4envpbtkx34scbq5ko0` FOREIGN KEY (`fk_ticket_rrpp_seller`) REFERENCES `rrpp` (`id`),
  ADD CONSTRAINT `FKcl226ig2h2ujmmakvvhhsqil6` FOREIGN KEY (`fk_ticket_user`) REFERENCES `user` (`id`);

--
-- Filtros para la tabla `typeticket`
--
ALTER TABLE `typeticket`
  ADD CONSTRAINT `FKa3o43m9ng6e9bfj466k2sf6oc` FOREIGN KEY (`fk_typeticket_event`) REFERENCES `event` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
