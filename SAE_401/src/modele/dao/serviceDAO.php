<?php
    require_once("../modele/connecte.php");
    require_once("../modele/classe/service.classe.php");
    require_once("../modele/interface/IDAO.php");

    class ServiceDAO implements IDAO {
        private $db;
        private $select;

        function __construct()
        {
            $this->db = new Connection();
            $this->select = "SELECT service.* FROM service";
        }
                
        function loadObject($result)
        {   
            $objects = [];
            foreach ($result as $row) {
                $objects[] = new Service($row["id"], $row["idUtilisateur"], $row["nom"], $row["description"], $row["annonceValidee"], $row["status"], $row["latitude"], $row["longitude"], $row["idCategorie"], $row["NbJetons"]); 
            }
            return $objects;
        }

        function update($object) {
            $this->db->requete(
                "UPDATE service SET idUtilisateur = ".$object->getIdUtilisateur().", nom = ".$object->getNom().
                ", description = ".$object->getDescription().", annonceValidee = ".$object->getAnnonceValidee().",status = ".$object->getStatus().", latitude = ".$object->getLatitude().
                ", longitude = ".$object->getLongitude().", idCategorie = ".$object->getIdCategorie().", NbJetons = ".$object->getNbJetons()." WHERE id = ".$object->getId()
            );
        }
        
        function delete($id) {
            return $this->db->requete("DELETE FROM service WHERE id = ".$id);
        }
        function getAllService() {
            return $this->loadObject($this->db->requete($this->select." WHERE annonceValidee = 1"));
        }

        function getServiceById($id) {
            $result = $this->loadObject($this->db->requete($this->select." WHERE id = ".$id." AND annonceValidee = 1")); 
            $service = new Service();

            if (count($result) > 0) {
                $service = $result[0];
            }

            return $service;
        }

        function updateAnnonceValidee($id, $nbJetons, $annonceValidee) {
            $this->db->requete("UPDATE service SET annonceValidee = ".$annonceValidee.", NbJetons = ".$nbJetons." WHERE id = ".$id);
        }

        function createAdByUser($id, $nomService, $descriptionService, $latitude, $longitude, $idCategorie){
            $requete = "INSERT INTO service (idUtilisateur, nom, description, annonceValidee, status, latitude, longitude, idCategorie, NbJetons) VALUES ('$id', '$nomService', '$descriptionService', 0, 0,'$latitude', '$longitude', '$idCategorie', 0)";
            $resultat = $this->db->requete($requete);
        
            return $resultat;
        }

        function getServiceByUtilisateur($utilisateur) {
            return $this->loadObject($this->db->requete($this->select." WHERE annonceValidee = 1 AND idUtilisateur = ".$utilisateur)); 
        }

        function getAllServicePendingAds(){
            return $this->loadObject($this->db->requete($this->select." WHERE annonceValidee = 0")); 
        }

        function updateModifiedAdById($id, $nomService, $descriptionService, $idCategorie){
            $this->db->requete("UPDATE service SET nom = '$nomService', description = '$descriptionService', idCategorie = '$idCategorie' WHERE id = '$id'");
        }

        function getLastServiceCreated(){
            $requete = "SELECT MAX(id) as id FROM service";
            $resultat = $this->db->requete($requete);
        
            return $resultat;
        }
    }