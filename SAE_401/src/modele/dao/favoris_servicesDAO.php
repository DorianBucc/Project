<?php
require_once("../modele/connecte.php");
require_once("../modele/classe/favoris_service.classe.php");
require_once("../modele/interface/IDAO.php");

class FavorisServicesDAO {
    private $db;
    private $select;

    function __construct()
    {
        $this->db = new Connection();
        $this->select = "SELECT favorisservices.* FROM favorisservices";
    }

    function loadObject($result)
    {   
        $objects = [];
        foreach ($result as $row) {
            $objects[] = new FavorisServices($row["idUtilisateur"], $row["idService"]);
        }
        return $objects;
    }

    function insert($object) {
        $this->db->requete(
            "INSERT INTO favorisservices (idUtilisateur, idService) VALUES (".$object->getIdUtilisateur().", ".$object->getIdService().")"
        );
    }

    function update($object) {
        $this->db->requete(
            "UPDATE favorisservices SET idService = ".$object->getIdService().
            "WHERE idUtilisateur = ".$object->getIdUtilisateur()
        );
    } 

    function delete($idUtilisateur, $idService) {
        $this->db->requete("DELETE FROM favorisservices WHERE idUtilisateur = ".$idUtilisateur." AND idService =".$idService);
    }

    function getAllFavorisServices() {
        return $this->loadObject($this->db->requete($this->select));
    }

    function getFavorisServicesByUtilisateur($utilisateur) {
        return $this->loadObject($this->db->requete($this->select." WHERE idUtilisateur = ".$utilisateur));
    }

    function addFavorisService($utilisateur, $id) {
        $this->db->requete("INSERT INTO favorisservices (idUtilisateur, idService) VALUES ('$utilisateur', '$id')");
    }

    function deleteFavorisService($utilisateur, $id) {
        $this->db->requete("DELETE FROM favorisservices WHERE idUtilisateur = '$utilisateur' AND id = '$id'");
    }

    function isServicesFavori($utilisateur, $id) {
        $result = $this->db->requete("SELECT COUNT(*) FROM favorisservices WHERE idUtilisateur = '$utilisateur' AND id = '$id'");
        $count = $result[0]["COUNT(*)"];
        return $count > 0;
    }

    function getAllFavorisServicesById($utilisateur){
        return $this->loadObject($this->db->requete($this->select." WHERE idUtilisateur = ".$utilisateur));
    }
}
?>
