-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 04 avr. 2024 à 19:38
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `bdd_sae401`
--

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `NomCategorie` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `NomCategorie`) VALUES
(1, 'Peinture'),
(2, 'Jardinage'),
(3, 'Menuiserie'),
(4, 'Carrelage'),
(5, 'Plomberie'),
(6, 'Cours'),
(7, 'Administratif'),
(8, 'Garde d\'enfants'),
(9, 'Réparation Informatique'),
(10, 'Coaching Sportif');

-- --------------------------------------------------------

--
-- Structure de la table `favorismateriel`
--

DROP TABLE IF EXISTS `favorismateriel`;
CREATE TABLE IF NOT EXISTS `favorismateriel` (
  `idUtilisateur` int NOT NULL,
  `idMateriel` int NOT NULL,
  PRIMARY KEY (`idUtilisateur`,`idMateriel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- --------------------------------------------------------

--
-- Structure de la table `favorisservices`
--

DROP TABLE IF EXISTS `favorisservices`;
CREATE TABLE IF NOT EXISTS `favorisservices` (
  `idUtilisateur` int NOT NULL,
  `idService` int NOT NULL,
  PRIMARY KEY (`idUtilisateur`,`idService`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- --------------------------------------------------------

--
-- Structure de la table `historiquetransaction`
--

DROP TABLE IF EXISTS `historiquetransaction`;
CREATE TABLE IF NOT EXISTS `historiquetransaction` (
  `idHistorique` int NOT NULL AUTO_INCREMENT,
  `idTransaction` int NOT NULL,
  `Commentaire` text CHARACTER SET utf8mb3 COLLATE utf8mb3_bin,
  `NoteEmprunteur` int DEFAULT NULL,
  `NotePrestataire` int DEFAULT NULL,
  PRIMARY KEY (`idHistorique`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- --------------------------------------------------------

--
-- Structure de la table `image_materiel`
--

DROP TABLE IF EXISTS `image_materiel`;
CREATE TABLE IF NOT EXISTS `image_materiel` (
  `id_materiel` int NOT NULL,
  `nom_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Déchargement des données de la table `image_materiel`
--

INSERT INTO `image_materiel` (`id_materiel`, `nom_image`) VALUES
(1, 'tondeuse'),
(2, 'tracteur'),
(3, 'tronconneuse'),
(4, 'taille_haie'),
(5, 'perceuse'),
(6, 'scie_circulaire'),
(7, 'ponceuse'),
(8, 'scie_sauteuse'),
(9, 'etau'),
(10, 'marteau_perforateur');

-- --------------------------------------------------------

--
-- Structure de la table `image_service`
--

DROP TABLE IF EXISTS `image_service`;
CREATE TABLE IF NOT EXISTS `image_service` (
  `id_service` int NOT NULL,
  `nom_image` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Déchargement des données de la table `image_service`
--

INSERT INTO `image_service` (`id_service`, `nom_image`) VALUES
(1, 'jardinage'),
(2, 'peinture'),
(3, 'menuiserie'),
(4, 'carrelage'),
(5, 'plomberie'),
(6, 'cours'),
(7, 'administratif'),
(8, 'garde_enfant'),
(9, 'informatique'),
(10, 'coach');

-- --------------------------------------------------------

--
-- Structure de la table `materiel`
--

DROP TABLE IF EXISTS `materiel`;
CREATE TABLE IF NOT EXISTS `materiel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUtilisateur` int NOT NULL,
  `nom` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `marque` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `modele` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `taille` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `annonceValidee` int NOT NULL,
  `status` int NOT NULL,
  `latitude` decimal(8,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `idCategorie` int NOT NULL,
  `NbJetons` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Déchargement des données de la table `materiel`
--

INSERT INTO `materiel` (`id`, `idUtilisateur`, `nom`, `marque`, `modele`, `taille`, `description`, `annonceValidee`, `status`, `latitude`, `longitude`, `idCategorie`, `NbJetons`) VALUES
(1, 1, 'Tondeuse', 'husqvarna', 'R214TC', '1.70m', 'Tondeuse jamais utilisé, avec hélices bien coupantes.', 1, 0, '49.120392', '6.163650', 2, 10),
(2, 2, 'Tracteur', 'Manick', 'Simple', '2.10m', 'Tracteur destiné au transport et au labourage des terres.', 1, 0, '49.120392', '6.163650', 2, 10),
(3, 3, 'Tronçonneuse', 'Stihl', 'MS 170', '1m', 'Tronçonneuse légère et maniable pour les travaux d\'élagage et de coupe de bois.', 1, 0, '49.120392', '6.163650', 2, 10),
(4, 4, 'Taille-haie', 'Black+Decker', 'GT4245', '1.5m', 'Taille-haie électrique pour la taille précise des haies et des buissons.', 1, 0, '49.120392', '6.163650', 2, 10),
(5, 5, 'Perceuse', 'Bosch', 'PSB 500', '30cm x 10cm x 20cm', 'Perceuse électrique puissante pour divers travaux de perçage.', 1, 0, '49.120392', '6.163650', 3, 15),
(6, 6, 'Scie circulaire', 'DeWalt', 'DCS570B', '40cm x 20cm x 30cm', 'Scie circulaire sans fil pour une coupe précise et facile de divers matériaux.', 1, 0, '49.120392', '6.163650', 3, 15),
(7, 7, 'Ponceuse à bande', 'Makita', '9903', '50cm x 15cm x 10cm', 'Ponceuse à bande robuste et performante pour le ponçage de grandes surfaces.', 1, 0, '49.120392', '6.163650', 3, 15),
(8, 8, 'Scie sauteuse', 'Bosch', 'JS470E', '25cm x 10cm x 20cm', 'Scie sauteuse électrique pour des coupes précises dans divers matériaux.', 1, 0, '49.120392', '6.163650', 3, 15),
(9, 9, 'Étau', 'Irwin', '2026300', '20cm x 10cm x 15cm', 'Étau en acier pour maintenir fermement les pièces pendant le travail.', 1, 0, '49.120392', '6.163650', 3, 15),
(10, 10, 'Marteau perforateur', 'Makita', 'HR2641X1', '30cm x 15cm x 10cm', 'Marteau perforateur électrique pour percer et buriner dans le béton, la pierre, etc.', 1, 0, '49.120392', '6.163650', 3, 15);

-- --------------------------------------------------------

--
-- Structure de la table `paniermateriel`
--

DROP TABLE IF EXISTS `paniermateriel`;
CREATE TABLE IF NOT EXISTS `paniermateriel` (
  `idUtilisateur` int NOT NULL,
  `idMateriel` int NOT NULL,
  PRIMARY KEY (`idUtilisateur`,`idMateriel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- --------------------------------------------------------

--
-- Structure de la table `panierservices`
--

DROP TABLE IF EXISTS `panierservices`;
CREATE TABLE IF NOT EXISTS `panierservices` (
  `idUtilisateur` int NOT NULL,
  `idService` int NOT NULL,
  PRIMARY KEY (`idUtilisateur`,`idService`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUtilisateur` int NOT NULL,
  `nom` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `annonceValidee` int NOT NULL,
  `status` int NOT NULL,
  `latitude` decimal(8,6) NOT NULL,
  `longitude` decimal(9,6) NOT NULL,
  `idCategorie` int NOT NULL,
  `NbJetons` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `idUtilisateur`, `nom`, `description`, `annonceValidee`, `status`, `latitude`, `longitude`, `idCategorie`, `NbJetons`) VALUES
(1, 1, 'Service de Jardinage', 'Entretien de jardin, taille des arbres, plantation de fleurs, etc.', 1, 0, '49.120392', '6.163650', 2, 10),
(2, 2, 'Service de Peinture', 'Peinture intérieure et extérieure, rénovation des murs, etc.', 1, 0, '49.120392', '6.163650', 1, 10),
(3, 3, 'Service de Menuiserie', 'Fabrication de meubles sur mesure, installation de portes et fenêtres, etc.', 1, 0, '49.120392', '6.163650', 3, 10),
(4, 4, 'Service de Carrelage', 'Pose de carrelage pour sols et murs, rénovation de salles de bains, etc.', 1, 0, '49.120392', '6.163650', 4, 10),
(5, 5, 'Service de Plomberie', 'Réparation de fuites d eau, installation de nouveaux équipements sanitaires, etc.', 1, 0, '49.120392', '6.163650', 5, 10),
(6, 6, 'Service de Cours', 'Cours particuliers dans divers domaines (mathématiques, langues, musique, etc.)', 1, 0, '49.120392', '6.163650', 6, 10),
(7, 7, 'Service Administratif', 'Assistance administrative, rédaction de documents, gestion des courriers, etc.', 1, 0, '49.120392', '6.163650', 7, 10),
(8, 8, 'Service de Garde d\'enfants', 'Garde d enfants à domicile, aide aux devoirs, activités ludiques, etc.', 1, 0, '49.120392', '6.163650', 8, 10),
(9, 9, 'Réparation Informatique', 'Réparation d ordinateurs, installation de logiciels, configuration réseau, etc.', 1, 0, '49.120392', '6.163650', 9, 10),
(10, 10, 'Service de Coaching Sportif', 'Coaching sportif personnalisé, suivi de programmes d entraînement, conseils nutritionnels, etc.', 1, 0, '49.120392', '6.163650', 10, 10);

-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
  `idTransaction` int NOT NULL AUTO_INCREMENT,
  `idEmprunteur` int NOT NULL,
  `idPrestataire` int NOT NULL,
  `type` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `DateDebut` date NOT NULL,
  `DateFin` date NOT NULL,
  PRIMARY KEY (`idTransaction`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mail_utilisateur` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `mdp_utilisateur` varchar(80) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `nom` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `prenom` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `adresse` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `tel` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `rayon` int NOT NULL,
  `role` int NOT NULL,
  `confirmation` int NOT NULL,
  `session` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_bin NOT NULL,
  `nbJetons` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `mail_utilisateur`, `mdp_utilisateur`, `nom`, `prenom`, `adresse`, `tel`, `rayon`, `role`, `confirmation`, `session`, `nbJetons`) VALUES
(1, 'dotto.matis@gmail.com', '$2y$10$2Ptd9tgIQeFarLvilx277uM0Ep5kmaEUFR4awBWjJq4Hr0GMPCPH6', 'DOTTO', 'Matis', '123 Rue de la fleur', '0678589645', 0, 1, 1, '5448882116710798.5mljd', 100),
(2, 'manick.luc@gmail.com', '$2y$10$f/dD3iApZYqZ6Uho0FzxwePI6yXHyGVVvLIZlnp61PGdx9jzsKYA2', 'MANICK', 'Luc', '2 Rue de la campagne', '0789541265', 10, 0, 1, '', 20),
(3, 'bucchiotty.dorian@gmail.com', '$2y$10$dp.OOvytcAcsGP52IMLuBOd.daJcL5cvLQ/MvrcNMUXwp9eqqMn4G', 'BUCCHIOTTY', 'Dorian', '7 Rue de la tulipe', '0624158984', 15, 0, 1, '', 20),
(4, 'dagon.jonathan@gmail.com', '$2y$10$L4MNDzbIIx3X6qQtWnxBQO.ob5.Ct5bd/FrIC1TK9//5IMH.Phtne', 'DAGON', 'Jonathan', '101 Rue de metz', '0601458969', 20, 0, 1, '4128293614585485.5mljd', 20),
(5, 'dupont.antoine@gmail.com', '$2y$10$MKkfp3kBn6b/djxdpwKHDeiFhsNOKYOIiotUeQ3X/7cblo3JFxgx2', 'DUPONT', 'Antoine', '112 Rue de la riviere', '0741258963', 25, 0, 1, '', 20),
(6, 'leblanc.emilie@gmail.com', '$2y$10$0zZ/4cSHmAI68CJ1oiEEb.dQp2.xWa0pmmgpUg7yhPgvJ/j0uo0d2', 'LEBLANC', 'Émilie', '223 impasse des arbres', '0654789541', 30, 0, 1, '', 20),
(7, 'marchal.lucas@gmail.com', '$2y$10$v4zPH/8T6nITCrGxLTPna.Z1AS4dfLT5V6To/36jchn9n.fVjGCx6', 'MARCHAL', 'Lucas', '334 rue de la sapiniere', '0654784125', 25, 0, 1, '', 20),
(8, 'robert.camille@gmail.com', '$2y$10$DgZvEq0dXSmO6WSneemZ1eUnyebz2bFMMK7JNY8r5uWm9pQIpn61e', 'ROBERT', 'Camille', '3 Rue de maurice barres', '0645895478', 20, 0, 1, '', 20),
(9, 'richard.olivier@gmail.com', '$2y$10$aL1p8cWPqzF69Ke3Jq3uTe39855YGwtda6l/hRY4Gp9gQDY/DF7Me', 'RICHARD', 'Olivier', '15 rue simone veil', '0754893214', 15, 0, 1, '', 20),
(10, 'ducret.thomas@gmail.com', '$2y$10$73JgPzqJ6gvaYwgFSqHKmekbYZn3HtLTfA3G9./mA2bRurGlA/mRi', 'DUCRET', 'Thomas', '5 rue de victor hugo', '0654128975', 10, 0, 1, '', 20);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
