<?php
require_once("../modele/connecte.php");
require_once("../modele/classe/panier_materiel.classe.php");
require_once("../modele/interface/IDAO.php");

class PanierMaterielDAO {
    private $db;
    private $select;

    function __construct()
    {
        $this->db = new Connection();
        $this->select = "SELECT paniermateriel.* FROM paniermateriel";
    }

    function loadObject($result)
    {   
        $objects = [];
        foreach ($result as $row) {
            $objects[] = new PanierMateriels($row["idUtilisateur"], $row["idMateriel"]);
        }
        return $objects;
    }

    function insert($object) {
        $this->db->requete(
            "INSERT INTO paniermateriel (idUtilisateur, idMateriel) VALUES (".$object->getIdUtilisateur().", ".$object->getIdMateriel().")"
        );
    }

    function update($object) {
        $this->db->requete(
            "UPDATE paniermateriel SET idMateriel = ".$object->getIdMateriel().
            " WHERE idUtilisateur = ".$object->getIdMateriel()
        );
    } 

    function delete($idUtilisateur, $idMateriel) {
        $this->db->requete("DELETE FROM paniermateriel WHERE idUtilisateur = ".$idUtilisateur." AND idMateriel = ".$idMateriel);
    }

    function getAllPanierMateriel() {
        return $this->loadObject($this->db->requete($this->select));
    }

    function getPanierMaterielByUtilisateur($utilisateur) {
        return $this->loadObject($this->db->requete($this->select . " WHERE idUtilisateur = ".$utilisateur));
    }
}
?>
