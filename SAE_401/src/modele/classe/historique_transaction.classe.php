<?php
require_once("../modele/connecte.php");

class HistoriqueTransaction {
    private $idHistorique;
    private $idTransaction;
    private $commentaire;
    private $noteEmprunteur;
    private $notePrestataire;

    function __construct($idHistorique = "", $idTransaction = "", $commentaire = "", $noteEmprunteur = "", $notePrestataire = "") {
        $this->idHistorique = $idHistorique;
        $this->idTransaction = $idTransaction;
        $this->commentaire = $commentaire;
        $this->noteEmprunteur = $noteEmprunteur;
        $this->notePrestataire = $notePrestataire;
    }

    function getIdHistorique() {
        return $this->idHistorique;
    }

    function setIdHistorique($idHistorique) {
        $this->idHistorique = $idHistorique;
    }

    function getIdTransaction() {
        return $this->idTransaction;
    }

    function setIdTransaction($idTransaction) {
        $this->idTransaction = $idTransaction;
    }

    function getCommentaire() {
        return $this->commentaire;
    }

    function setCommentaire($commentaire) {
        $this->commentaire = $commentaire;
    }

    function getNoteEmprunteur() {
        return $this->noteEmprunteur;
    }

    function setNoteEmprunteur($noteEmprunteur) {
        $this->noteEmprunteur = $noteEmprunteur;
    }

    function getNotePrestataire() {
        return $this->notePrestataire;
    }

    function setNotePrestataire($notePrestataire) {
        $this->notePrestataire = $notePrestataire;
    }
}
?>