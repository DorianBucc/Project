<?php
    class ImageService {
        private $idService;
        private $nomImage;

        function __construct($idService = "", $nomImage = "") {
            $this->idService = $idService;
            $this->nomImage = $nomImage;
        }

        function getIdService() {
            return $this->idService;
        }
        function setIdService(string $idService) {
            $this->idService = $idService;
        }

        function getNomImage() {
            return $this->nomImage;
        }
        function setNomImage(string $nomImage) {
            $this->nomImage = $nomImage;
        }
    }
?>  