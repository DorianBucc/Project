<?php
    require_once("../modele/connecte.php");
    require_once("../modele/classe/imageMateriel.classe.php");

    class ImageMaterielDAO {
        private $db;
        private $select;

        function __construct()
        {
            $this->db = new Connection();
            $this->select = "SELECT image_materiel.* FROM  image_materiel";
        }

        function loadObject($result)
        {   
            $objects = [];
            foreach ($result as $row) {
                $objects[] = new ImageMateriel($row["id_materiel"], $row["nom_image"]);
            }
            return $objects;
        }

        function insert($object) {
            $this->db->requete(
                "INSERT INTO image_materiel (id_materiel, nom_image) VALUES (".$object->getIdMateriel().", '".$object->getNomImage()."')"
            );
        }

        function update($object) {
            $this->db->requete(
                "UPDATE image_materiel SET nom_image = ".$object->getNomImage().
                " WHERE id_materiel = ".$object->getIdMateriel()
            );
        } 

        function delete($idMateriel, $nomImage) {
            $this->db->requete("DELETE FROM image_materiel WHERE id_materiel = ".$idMateriel." AND nom_image = ".$nomImage);
        }

        function getImagesById($id) {
            return $this->loadObject($this->db->requete($this->select . " WHERE id_materiel = ".$id));
        }
    }
?>
