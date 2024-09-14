<?php
    class ImageMateriel {
        private $idMateriel;
        private $nomImage;

        function __construct($idMateriel = "", $nomImage = "") {
            $this->idMateriel = $idMateriel;
            $this->nomImage = $nomImage;
        }

        function getIdMateriel() {
            return $this->idMateriel;
        }
        function setIdMateriel(string $idSMateriel) {
            $this->idMateriel = $idMateriel;
        }

        function getNomImage() {
            return $this->nomImage;
        }
        function setNomImage(string $nomImage) {
            $this->nomImage = $nomImage;
        }
    }
?>  