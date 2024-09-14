<?php
    class Materiel {
        private $id;
        private $idUtilisateur;
        private $nom;
        private $marque;
        private $modele;
        private $taille;
        private $description;
        private $annonceValidee;
        private $status;
        private $latitude;
        private $longitude;
        private $idCategorie;
        private $nbJetons;

        function __construct($id = "", $idUtilisateur = "", $nom = "", $marque = "", $modele = "", $taille = "", $description = "", $annonceValidee = "", $status = "", $latitude = "", $longitude = "", $idCategorie = "", $nbJetons = "") {
            $this->id = $id;
            $this->idUtilisateur = $idUtilisateur;
            $this->nom = $nom;
            $this->marque = $marque;
            $this->modele = $modele;
            $this->taille = $taille;
            $this->description = $description;
            $this->annonceValidee = $annonceValidee;
            $this->status = $status;
            $this->latitude = $latitude;
            $this->longitude = $longitude;
            $this->idCategorie = $idCategorie;
            $this->nbJetons = $nbJetons;
        }
        
        function getId() {
            return $this->id;
        }
        function setId($id) {
            $this->id = $id;
        }

        function getIdUtilisateur() {
            return $this->idUtilisateur;
        }
        function setIdUtilisateur($idUtilisateur) {
            $this->idUtilisateur = $idUtilisateur;
        }

        function getNom() {
            return $this->nom;
        }
        function setNom($nom) {
            $this->nom = $nom;
        }

        function getMarque() {
            return $this->marque;
        }
        function setMarque($marque) {
            $this->marque = $marque;
        }

        function getModele() {
            return $this->modele;
        }
        function setModele($modele) {
            $this->modele = $modele;
        }
        function getTaille() {
            return $this->taille;
        }
        function setTaille($taille) {
            $this->taille = $taille;
        }

        function getDescription() {
            return $this->description;
        }
        function setDescription($description) {
            $this->description = $description;
        }

        function getAnnonceValidee() {
            return $this->annonceValidee;
        }
        function setAnnonceValidee($annonceValidee) {
            $this->annonceValidee = $annonceValidee;
        }
        
        function getStatus() {
            return $this->status;
        }
        function setStatus($status) {
            $this->status = $status;
        }

        function getLatitude() {
            return $this->latitude;
        }
        function setLatitude($latitude) {
            $this->latitude = $latitude;
        }

        function getLongitude() {
            return $this->longitude;
        }
        function setLongitude($longitude) {
            $this->longitude = $longitude;
        }

        function getIdCategorie() {
            return $this->idCategorie;
        }
        function setIdCategorie($idCategorie) {
            $this->idCategorie = $idCategorie;
        } 

        function getNbJetons() {
            return $this->nbJetons;
        }
        function setNbJetons($nbJetons) {
            $this->nbJetons = $nbJetons;
        } 
    }
?>