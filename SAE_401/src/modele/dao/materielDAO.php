<?php
    require_once("../modele/connecte.php");
    require_once("../modele/classe/materiel.classe.php");
    require_once("../modele/interface/IDAO.php");

    class MaterielDAO implements IDAO {
        private $db;
        private $select;

        function __construct()
        {
            $this->db = new Connection();
            $this->select = "SELECT materiel.* FROM materiel";
        }

        function loadObject($result)
        {   
            $objects = [];
            foreach ($result as $row) {
                $objects[] = new Materiel($row["id"], $row["idUtilisateur"], $row["nom"], $row["marque"], $row["modele"], $row["taille"], $row["description"], $row["annonceValidee"], $row["status"], $row["latitude"], $row["longitude"], $row["idCategorie"], $row["NbJetons"]);
            }
            return $objects;
        }

        function update($object) {
            $this->db->requete(
                "UPDATE materiel SET idUtilisateur = ".$object->getIdUtilisateur().", nom = ".$object->getNom().
                ", marque = ".$object->getMarque().", modele = ".$object->getModele().", taille = ".$object->getTaille().", description = ".$object->getDescription().", annonceValidee = ".$object->getAnnonceValidee().",status = ".$object->getStatus().", latitude = ".$object->getLatitude().
                ", longitude = ".$object->getLongitude().", idCategorie = ".$object->getIdCategorie().", NbJetons = ".$object->getNbJetons()." WHERE id = ".$object->getId()
            );
        }
        
        function delete($id) {
            return $this->db->requete("DELETE FROM materiel WHERE id = ".$id);
        }

        function updateJetonsMaterielById($jetons, $id){
            $requete = "UPDATE materiel SET NbJetons = ".$jetons." WHERE id = ".$id;
            $resultat = $this->db->requete($requete);

            return $resultat;
        }
        
        function getAllMateriel() {
            return $this->loadObject($this->db->requete($this->select." WHERE annonceValidee = 1"));
        }

        function getMaterielById($id) {
            $result = $this->loadObject($this->db->requete($this->select." WHERE id = ".$id." AND annonceValidee = 1")); 
            $materiel = new Materiel();

            if (count($result) > 0) {
                $materiel = $result[0];
            }

            return $materiel;
        }

        function updateAnnonceValidee($id, $nbJetons, $annonceValidee) {
            $this->db->requete("UPDATE materiel SET annonceValidee = ".$annonceValidee.", NbJetons = ".$nbJetons." WHERE id = ".$id);
        }

        function createAdByUser($id, $nomMateriel, $marqueMateriel, $modeleMateriel, $tailleMateriel, $descriptionMateriel, $latitude, $longitude, $idCategorie){
            $requete = "INSERT INTO materiel (idUtilisateur, nom, marque, modele, taille, description, annonceValidee, status, latitude, longitude, idCategorie, NbJetons) VALUES ('$id', '$nomMateriel', '$marqueMateriel', '$modeleMateriel', '$tailleMateriel', '$descriptionMateriel', 0, 0,'$latitude', '$longitude', '$idCategorie', 0)";
            $resultat = $this->db->requete($requete);
        
            return $resultat;
        }
    
        function getMaterielByUtilisateur($utilisateur) {
            return $this->loadObject($this->db->requete($this->select." WHERE annonceValidee = 1 AND idUtilisateur = ".$utilisateur)); 
        }

        function getAllMaterielPendingAds(){
            return $this->loadObject($this->db->requete($this->select." WHERE annonceValidee = 0")); 
        }

        function updateModifiedAdById($id, $nomMateriel, $marqueMateriel, $modeleMateriel, $tailleMateriel, $descriptionMateriel, $idCategorie){
            $this->db->requete("UPDATE materiel SET nom = '$nomMateriel', marque = '$marqueMateriel', modele = '$modeleMateriel', taille = '$tailleMateriel', description = '$descriptionMateriel', idCategorie = '$idCategorie' WHERE id = '$id'");
        }

        function getLastMaterielCreated(){
            $requete = "SELECT MAX(id) as id FROM materiel";
            $resultat = $this->db->requete($requete);
        
            return $resultat;
        }
    }