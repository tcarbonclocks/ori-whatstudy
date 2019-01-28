-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Gegenereerd op: 27 jan 2019 om 12:05
-- Serverversie: 5.6.37
-- PHP-versie: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `whatstudy`
--

--
-- Gegevens worden geëxporteerd voor tabel `user_types`
--

INSERT INTO `user_types` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Student', NULL, NULL),
(2, 'Teacher', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Gegenereerd op: 27 jan 2019 om 12:05
-- Serverversie: 5.6.37
-- PHP-versie: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `whatstudy`
--

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `name`, `user_type_id`, `created_at`, `updated_at`) VALUES
('jr0103374', 'name_of_jr0103374', 2, NULL, NULL),
('p370952', 'name_of_p370952', 2, NULL, NULL),
('s1063790', 'name_of_s1063790', 1, NULL, NULL),
('s1068761', 'name_of_s1068761', 1, NULL, NULL),
('s1088757', 'name_of_s1088757', 1, NULL, NULL),
('s1088954', 'name_of_s1088954', 1, NULL, NULL),
('s1089448', 'name_of_s1089448', 1, NULL, NULL),
('s1092973', 'name_of_s1092973', 1, NULL, NULL),
('s1093000', 'name_of_s1093000', 1, NULL, NULL),
('s1093949', 'name_of_s1093949', 1, NULL, NULL),
('s1094520', 'name_of_s1094520', 1, NULL, NULL),
('s1095112', 'name_of_s1095112', 1, NULL, NULL),
('s1095540', 'name_of_s1095540', 1, NULL, NULL),
('s1097767', 'name_of_s1097767', 1, NULL, NULL),
('s1103359', 'name_of_s1103359', 1, NULL, NULL),
('s1103648', 'name_of_s1103648', 1, NULL, NULL),
('s1103667', 'name_of_s1103667', 1, NULL, NULL),
('s1113909', 'name_of_s1113909', 1, NULL, NULL),
('s1114211', 'name_of_s1114211', 1, NULL, NULL),
('s1114330', 'name_of_s1114330', 1, NULL, NULL),
('s1114352', 'name_of_s1114352', 1, NULL, NULL),
('s1115982', 'name_of_s1115982', 1, NULL, NULL),
('s1115989', 'name_of_s1115989', 1, NULL, NULL),
('s1116397', 'name_of_s1116397', 1, NULL, NULL),
('s1117376', 'name_of_s1117376', 1, NULL, NULL),
('s1117474', 'name_of_s1117474', 1, NULL, NULL),
('s1117485', 'name_of_s1117485', 1, NULL, NULL),
('s1117499', 'name_of_s1117499', 1, NULL, NULL),
('s1118428', 'name_of_s1118428', 1, NULL, NULL),
('s1118514', 'name_of_s1118514', 1, NULL, NULL),
('s1119207', 'name_of_s1119207', 1, NULL, NULL),
('s1119426', 'name_of_s1119426', 1, NULL, NULL),
('s1120509', 'name_of_s1120509', 1, NULL, NULL),
('s1120818', 'name_of_s1120818', 1, NULL, NULL),
('s1121054', 'name_of_s1121054', 1, NULL, NULL),
('s1122550', 'name_of_s1122550', 1, NULL, NULL),
('s1125862', 'name_of_s1125862', 1, NULL, NULL),
('s1126032', 'name_of_s1126032', 1, NULL, NULL),
('s1126192', 'name_of_s1126192', 1, NULL, NULL),
('s1126446', 'name_of_s1126446', 1, NULL, NULL),
('s1126600', 'name_of_s1126600', 1, NULL, NULL),
('s1126725', 'name_of_s1126725', 1, NULL, NULL),
('s1126797', 'name_of_s1126797', 1, NULL, NULL),
('s1127069', 'name_of_s1127069', 1, NULL, NULL),
('s1127183', 'name_of_s1127183', 1, NULL, NULL),
('s1127189', 'name_of_s1127189', 1, NULL, NULL),
('s1127311', 'name_of_s1127311', 1, NULL, NULL),
('s1127339', 'name_of_s1127339', 1, NULL, NULL),
('s1127571', 'name_of_s1127571', 1, NULL, NULL),
('s1127598', 'name_of_s1127598', 1, NULL, NULL),
('s1127627', 'name_of_s1127627', 1, NULL, NULL),
('s1127631', 'name_of_s1127631', 1, NULL, NULL),
('s1127636', 'name_of_s1127636', 1, NULL, NULL),
('s1127806', 'name_of_s1127806', 1, NULL, NULL),
('s1127994', 'name_of_s1127994', 1, NULL, NULL),
('s1128026', 'name_of_s1128026', 1, NULL, NULL),
('s1128095', 'name_of_s1128095', 1, NULL, NULL),
('s1128106', 'name_of_s1128106', 1, NULL, NULL),
('s1128141', 'name_of_s1128141', 1, NULL, NULL),
('s1128170', 'name_of_s1128170', 1, NULL, NULL),
('s1128173', 'name_of_s1128173', 1, NULL, NULL),
('s1128198', 'name_of_s1128198', 1, NULL, NULL),
('s1128201', 'name_of_s1128201', 1, NULL, NULL),
('s1128245', 'name_of_s1128245', 1, NULL, NULL),
('s1128300', 'name_of_s1128300', 1, NULL, NULL),
('s1128421', 'name_of_s1128421', 1, NULL, NULL),
('s1128503', 'name_of_s1128503', 1, NULL, NULL),
('s1128546', 'name_of_s1128546', 1, NULL, NULL),
('s1128627', 'name_of_s1128627', 1, NULL, NULL),
('s1128689', 'name_of_s1128689', 1, NULL, NULL),
('s1128757', 'name_of_s1128757', 1, NULL, NULL),
('s1128800', 'name_of_s1128800', 1, NULL, NULL),
('s1128814', 'name_of_s1128814', 1, NULL, NULL),
('s1128818', 'name_of_s1128818', 1, NULL, NULL),
('s1129092', 'name_of_s1129092', 1, NULL, NULL),
('s1129128', 'name_of_s1129128', 1, NULL, NULL),
('s1129186', 'name_of_s1129186', 1, NULL, NULL),
('s1129188', 'name_of_s1129188', 1, NULL, NULL),
('s1129195', 'name_of_s1129195', 1, NULL, NULL),
('s1129197', 'name_of_s1129197', 1, NULL, NULL),
('s1129292', 'name_of_s1129292', 1, NULL, NULL),
('s1129351', 'name_of_s1129351', 1, NULL, NULL),
('s1129397', 'name_of_s1129397', 1, NULL, NULL),
('s1129415', 'name_of_s1129415', 1, NULL, NULL),
('s1129434', 'name_of_s1129434', 1, NULL, NULL),
('s1129514', 'name_of_s1129514', 1, NULL, NULL),
('s1129548', 'name_of_s1129548', 1, NULL, NULL),
('s1129629', 'name_of_s1129629', 1, NULL, NULL),
('s1129648', 'name_of_s1129648', 1, NULL, NULL),
('s1129708', 'name_of_s1129708', 1, NULL, NULL),
('s1129787', 'name_of_s1129787', 1, NULL, NULL),
('s1129936', 'name_of_s1129936', 1, NULL, NULL),
('s1130119', 'name_of_s1130119', 1, NULL, NULL),
('s1130318', 'name_of_s1130318', 1, NULL, NULL),
('s1130379', 'name_of_s1130379', 1, NULL, NULL),
('s1130450', 'name_of_s1130450', 1, NULL, NULL),
('s1130604', 'name_of_s1130604', 1, NULL, NULL),
('s1130624', 'name_of_s1130624', 1, NULL, NULL),
('s1130662', 'name_of_s1130662', 1, NULL, NULL),
('s1130689', 'name_of_s1130689', 1, NULL, NULL),
('s1130765', 'name_of_s1130765', 1, NULL, NULL),
('s1130854', 'name_of_s1130854', 1, NULL, NULL),
('s1130868', 'name_of_s1130868', 1, NULL, NULL),
('s1130939', 'name_of_s1130939', 1, NULL, NULL),
('s1131087', 'name_of_s1131087', 1, NULL, NULL),
('s1131149', 'name_of_s1131149', 1, NULL, NULL),
('s1131242', 'name_of_s1131242', 1, NULL, NULL),
('s1131261', 'name_of_s1131261', 1, NULL, NULL),
('s1131269', 'name_of_s1131269', 1, NULL, NULL),
('s1131313', 'name_of_s1131313', 1, NULL, NULL),
('s1131547', 'name_of_s1131547', 1, NULL, NULL),
('s1131561', 'name_of_s1131561', 1, NULL, NULL),
('s1131609', 'name_of_s1131609', 1, NULL, NULL),
('s1131728', 'name_of_s1131728', 1, NULL, NULL),
('s1131886', 'name_of_s1131886', 1, NULL, NULL),
('s1131894', 'name_of_s1131894', 1, NULL, NULL),
('s1131941', 'name_of_s1131941', 1, NULL, NULL),
('s1131944', 'name_of_s1131944', 1, NULL, NULL),
('s1131949', 'name_of_s1131949', 1, NULL, NULL),
('s1132156', 'name_of_s1132156', 1, NULL, NULL),
('s1132321', 'name_of_s1132321', 1, NULL, NULL),
('s1132355', 'name_of_s1132355', 1, NULL, NULL),
('s1132378', 'name_of_s1132378', 1, NULL, NULL),
('s1132380', 'name_of_s1132380', 1, NULL, NULL),
('s1132511', 'name_of_s1132511', 1, NULL, NULL),
('s1132536', 'name_of_s1132536', 1, NULL, NULL),
('s1132616', 'name_of_s1132616', 1, NULL, NULL),
('s1132631', 'name_of_s1132631', 1, NULL, NULL),
('s1132653', 'name_of_s1132653', 1, NULL, NULL),
('s1132660', 'name_of_s1132660', 1, NULL, NULL),
('s1132793', 'name_of_s1132793', 1, NULL, NULL),
('s1132931', 'name_of_s1132931', 1, NULL, NULL),
('s1132936', 'name_of_s1132936', 1, NULL, NULL),
('s1133187', 'name_of_s1133187', 1, NULL, NULL),
('s1133202', 'name_of_s1133202', 1, NULL, NULL),
('s1133535', 'name_of_s1133535', 1, NULL, NULL),
('s1133672', 'name_of_s1133672', 1, NULL, NULL),
('s1133713', 'name_of_s1133713', 1, NULL, NULL),
('s1133773', 'name_of_s1133773', 1, NULL, NULL),
('s1133817', 'name_of_s1133817', 1, NULL, NULL),
('s1133824', 'name_of_s1133824', 1, NULL, NULL),
('s1133953', 'name_of_s1133953', 1, NULL, NULL),
('s1134223', 'name_of_s1134223', 1, NULL, NULL),
('s1134269', 'name_of_s1134269', 1, NULL, NULL),
('s1134823', 'name_of_s1134823', 1, NULL, NULL),
('s1134988', 'name_of_s1134988', 1, NULL, NULL),
('s1135042', 'name_of_s1135042', 1, NULL, NULL),
('s1135077', 'name_of_s1135077', 1, NULL, NULL),
('s1135273', 'name_of_s1135273', 1, NULL, NULL),
('s1135607', 'name_of_s1135607', 1, NULL, NULL),
('s1135684', 'name_of_s1135684', 1, NULL, NULL),
('s1135710', 'name_of_s1135710', 1, NULL, NULL),
('s1135801', 'name_of_s1135801', 1, NULL, NULL),
('s1135976', 'name_of_s1135976', 1, NULL, NULL),
('s1136485', 'name_of_s1136485', 1, NULL, NULL),
('s1136558', 'name_of_s1136558', 1, NULL, NULL),
('s1136662', 'name_of_s1136662', 1, NULL, NULL),
('s1136772', 'name_of_s1136772', 1, NULL, NULL),
('wl0103395', 'name_of_wl0103395', 2, NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Gegenereerd op: 27 jan 2019 om 15:13
-- Serverversie: 5.6.37
-- PHP-versie: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `whatstudy`
--

--
-- Gegevens worden geëxporteerd voor tabel `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Public', NULL, NULL),
(2, 'HTML/CSS', NULL, NULL),
(3, 'Javascript', NULL, NULL),
(4, 'Laravel/Lumen', NULL, NULL),
(5, 'Fitnesse', NULL, NULL),
(6, 'MySQL', NULL, NULL),
(7, 'Vue.js', NULL, NULL),
(8, 'Git', NULL, NULL),
(9, 'Installation', NULL, NULL),
(10, 'Bootstrap', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
