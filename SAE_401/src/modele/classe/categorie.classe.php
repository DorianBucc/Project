<?php
    class Categorie {
        private $id;
        private $nomCategorie;

        function __construct($id = "", $nomCategorie = "") {
            $this->id = $id;
            $this->nomCategorie = $nomCategorie;
        }

        function getId() {
            return $this->id;
        }

        function setId(string $id) {
            $this->id = $id;
        }

        function getNomCategorie() {
            return $this->nomCategorie;
        }

        function setNomCategorie(string $nomCategorie) {
            $this->nomCategorie = $nomCategorie;
        }
    }
?>
