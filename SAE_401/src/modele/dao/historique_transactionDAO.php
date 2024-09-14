<?php
require_once("../modele/connecte.php");
require_once("../modele/classe/historique_transaction.classe.php");
require_once("../modele/interface/IDAO.php");

class HistoriqueTransactionDAO {
    private $db;
    private $select;

    function __construct()
    {
        $this->db = new Connection();
        $this->select = "SELECT historiquetransaction.* FROM historiquetransaction";
    }

    function loadObject($result)
    {   
        $objects = [];
        foreach ($result as $row) {
            $objects[] = new HistoriqueTransaction($row["idHistorique"], $row["idTransaction"], $row["Commentaire"], $row["NoteEmprunteur"], $row["NotePrestataire"]);
        }
        return $objects;
    }

    function insert($object) {
        $this->db->requete(
            "INSERT INTO historiquetransaction (idTransaction, Commentaire, NoteEmprunteur, NotePrestataire) VALUES (" . $object->getIdTransaction() . ", " . $object->getCommentaire() . ", " . $object->getNoteEmprunteur() . ", " . $object->getNotePrestataire() . ")"
        );
    }
    
    function update($object) {
        $this->db->requete(
            "UPDATE historiquetransaction SET idTransaction = " . $object->getIdTransaction() . " Commentaire = " . $object->getCommentaire() . "NoteEmprunteur = " . $object->getNoteEmprunteur() . "NotePrestataire = " . $object->getNotePrestataire() . " WHERE idHistorique = " . $object->getIdHistorique()
        );
    }

    function delete($idHistorique) {
        $this->db->requete("DELETE FROM historiquetransaction WHERE idHistorique = " . $idHistorique);
    }
    
    function getAllHistoriqueTransaction() {
        return $this->loadObject($this->db->requete($this->select));
    }
    
    function getHistoriqueTransactionByUtilisateur($utilisateur) {
        return $this->loadObject($this->db->requete($this->select . " WHERE idUtilisateur = " . $utilisateur));
    }
    
    
}
?>
