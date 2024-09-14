<?php
require_once("../modele/connecte.php");
require_once("../modele/classe/favoris_materiel.classe.php");
require_once("../modele/interface/IDAO.php");

class FavorisMaterielDAO {
    private $db;
    private $select;

    function __construct()
    {
        $this->db = new Connection();
        $this->select = "SELECT favorismateriel.* FROM favorismateriel";
    }

    function loadObject($result)
    {   
        $objects = [];
        foreach ($result as $row) {
            $objects[] = new FavorisMateriel($row["idUtilisateur"], $row["idMateriel"]);
        }
        return $objects;
    }

    function insert($object) {
        $this->db->requete(
            "INSERT INTO favorismateriel (idUtilisateur, idMateriel) VALUES (".$object->getIdUtilisateur().", ".$object->getIdMateriel().")"
        );
    }

    function update($object) {
        $this->db->requete(
            "UPDATE favorismateriel SET idMateriel = ".$object->getIdMateriel().
            " WHERE idUtilisateur = ".$object->getIdMateriel()
        );
    } 

    function delete($idUtilisateur, $idMateriel) {
        $this->db->requete("DELETE FROM favorismateriel WHERE idUtilisateur = ".$idUtilisateur." AND idMateriel = ".$idMateriel);
    }

    function getAllFavorisMateriel() {
        return $this->loadObject($this->db->requete($this->select));
    }

    function getFavorisMaterielByUtilisateur($utilisateur) {
        return $this->loadObject($this->db->requete($this->select . " WHERE idUtilisateur = ".$utilisateur));
    }
}
?>
