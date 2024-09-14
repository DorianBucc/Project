<?php
class FavorisMateriel {
    private $utilisateur;
    private $idMateriel;

    function __construct($utilisateur = "", $idMateriel = "") {
        $this->utilisateur = $utilisateur;
        $this->idMateriel = $idMateriel;
    }

    function getIdUtilisateur() {
        return $this->utilisateur;
    }
    function setIdUtilisateur(string $utilisateur) {
        $this->utilisateur = $utilisateur;
    }

    function getIdMateriel() {
        return $this->idMateriel;
    }
    function setIdMateriel(string $idMateriel) {
        $this->idMateriel = $idMateriel;
    }
}
?>  