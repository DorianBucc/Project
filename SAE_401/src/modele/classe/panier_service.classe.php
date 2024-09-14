<?php
class PanierServices {
    private $idUtilisateur;
    private $idService;

    function __construct($idUtilisateur = "", $idService = "") {
        $this->idUtilisateur = $idUtilisateur;
        $this->idService = $idService;
    }

    function getIdUtilisateur() {
        return $this->idUtilisateur;
    }

    function setIdUtilisateur($idUtilisateur) {
        $this->idUtilisateur = $idUtilisateur;
    }

    function getIdService() {
        return $this->idService;
    }

    function setIdService($idService) {
        $this->idService = $idService;
    }
}
?>
