<?php
    class Service {
        private $id;
        private $idUtilisateur;
        private $nom;
        private $description;
        private $status;
        private $annonceValidee;
        private $latitude;
        private $longitude;
        private $idCategorie;
        private $nbJetons;

        function __construct($id = "", $idUtilisateur = "", $nom = "", $description = "", $annonceValidee = "", $status = "", $latitude = "", $longitude = "", $idCategorie = "", $nbJetons = "") {
            $this->id = $id;
            $this->idUtilisateur = $idUtilisateur;
            $this->nom = $nom;
            $this->description = $description;
            $this->annonceValidee = $annonceValidee;
            $this->status = $status;
            $this->latitude = $latitude;
            $this->longitude = $longitude;
            $this->idCategorie = $idCategorie;
            $this->nbJetons = $nbJetons;
        }

        public function getId() {
            return $this->id;
        }
        public function setId(string $id) {
            $this->id = $id;
        }

        public function getIdUtilisateur() {
            return $this->idUtilisateur;
        }
        public function setIdUtilisateur(string $idUtilisateur) {
            $this->idUtilisateur = $idUtilisateur;
        }

        function getNom() {
            return $this->nom;
        }
        function setNom($nom) {
            $this->nom = $nom;
        }

        public function getDescription() {
            return $this->description;
        }
        public function setDescription(string $description) {
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

        public function getIdCategorie() {
            return $this->idCategorie;
        }
        public function setIdCategorie(string $idCategorie) {
            $this->idCategorie = $idCategorie;
        }

        public function getNbJetons() {
            return $this->nbJetons;
        }
        public function setNbJetons(string $nbJetons) {
            $this->nbJetons = $nbJetons;
        }
    }
