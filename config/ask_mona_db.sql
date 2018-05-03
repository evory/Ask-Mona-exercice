CREATE DATABASE IF NOT EXISTS `askMonaDB`;
use `askMonaDB`;

CREATE TABLE IF NOT EXISTS `author` (
    `author_id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (`author_id`))
    ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
CREATE TABLE IF NOT EXISTS `artwork` (
    `artwork_id` int(11) NOT NULL AUTO_INCREMENT,
    `author_id` int(11),
    `name` varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY (`artwork_id`),
    FOREIGN KEY (`author_id`) 
    REFERENCES `author`(`author_id`)
    ON DELETE SET NULL)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;
    
CREATE TABLE IF NOT EXISTS `translations` (
    `translations_id` int(11) NOT NULL AUTO_INCREMENT,
    `artwork_id` int(11),
    `french` varchar(255) UNIQUE NOT NULL,
    `english` varchar(255) NOT NULL,
    PRIMARY KEY (`translations_id`),
    FOREIGN KEY (`artwork_id`) 
    REFERENCES `artwork` (`artwork_id`)
    ON DELETE SET NULL)
    ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `author` (`name`) VALUES 
('Pablo Picasso'), 
('Auguste Renoir'), 
('Claude Monet'), 
('Savador Dali');

INSERT INTO `artwork` (`author_id`, `name`) VALUES 
(1,"Les Demoiselles d'Avignon"), 
(1,"Le Vieux Guitariste aveugle"), 
(1,"La Femme qui pleure"), 
(2,"Les Parapluies"),
(2,"Les Deux Sœurs "),
(3,"Les Coquelicots"),
(4,"La Girafe en feu");

INSERT INTO `translations` (`artwork_id`, `french`, `english`) VALUES 
(1,"Les Demoiselles d'Avignon", "The Brothel of Avignon"), 
(2,"Le Vieux Guitariste aveugle", "The old blind guitarist"), 
(3,"La Femme qui pleure", "The woman who cries"), 
(4,"Les Parapluies", "The umbrellas"),
(5,"Les Deux Sœurs ", "The two sisters"),
(6,"Les Coquelicots", "The poppies"),
(7,"La Girafe en feu", "The Giraffe on fire");