<?php
class FavorisServices {
    private $utilisateur;
    private $idService;

    function __construct($utilisateur = "", $idService = "") {
        $this->utilisateur = $utilisateur;
        $this->idService = $idService;
    }

    function getIdUtilisateur() {
        return $this->utilisateur;
    }

    function setIdUtilisateur(string $utilisateur) {
        $this->utilisateur = $utilisateur;
    }

    function getIdService() {
        return $this->idService;
    }

    function setIdService(string $idService) {
        $this->idService = $idService;
    }
}
?>
