<?php
require_once("../modele/connecte.php");
require_once("../modele/classe/panier_service.classe.php");
require_once("../modele/interface/IDAO.php");

class PanierServiceDAO {
    private $db;
    private $select;

    function __construct()
    {
        $this->db = new Connection();
        $this->select = "SELECT panierservices.* FROM panierservices";
    }

    function loadObject($result)
    {   
        $objects = [];
        foreach ($result as $row) {
            $objects[] = new PanierServices($row["idUtilisateur"], $row["idService"]);
        }
        return $objects;
    }

    function insert($object) {
        $this->db->requete(
            "INSERT INTO panierservices (idUtilisateur, idService) VALUES (".$object->getIdUtilisateur().", ".$object->getIdService().")"
        );
    }

    function update($object) {
        $this->db->requete(
            "UPDATE panierservices SET idService = ".$object->getIdService().
            " WHERE idUtilisateur = ".$object->getIdUtilisateur()
        );
    } 
  
    function delete($idUtilisateur, $idService) {
        $this->db->requete("DELETE FROM panierservices WHERE idUtilisateur = ".$idUtilisateur." AND idService = ".$idService);
    }

    function getAllPanierService() {
        return $this->loadObject($this->db->requete($this->select));
    }

    function getPanierServiceByUtilisateur($utilisateur) {
        return $this->loadObject($this->db->requete($this->select . " WHERE idUtilisateur = ".$utilisateur));
    }
}
?>
