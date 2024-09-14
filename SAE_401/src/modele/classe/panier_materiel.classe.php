<?php
class PanierMateriels {
    private $idUtilisateur;
    private $idMateriel;

    function __construct($idUtilisateur = "", $idMateriel = "") {
        $this->idUtilisateur = $idUtilisateur;
        $this->idMateriel = $idMateriel;
    }

    function getIdUtilisateur() {
        return $this->idUtilisateur;
    }

    function setIdUtilisateur($idUtilisateur) {
        $this->idUtilisateur = $idUtilisateur;
    }

    function getIdMateriel() {
        return $this->idMateriel;
    }

    function setIdMateriel($idMateriel) {
        $this->idMateriel = $idMateriel;
    }
}
?>
