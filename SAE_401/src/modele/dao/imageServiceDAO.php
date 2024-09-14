<?php
    require_once("../modele/connecte.php");
    require_once("../modele/classe/imageService.classe.php");

    class ImageServiceDAO {
        private $db;
        private $select;

        function __construct()
        {
            $this->db = new Connection();
            $this->select = "SELECT image_service.* FROM  image_service";
        }

        function loadObject($result)
        {   
            $objects = [];
            foreach ($result as $row) {
                $objects[] = new ImageService($row["id_service"], $row["nom_image"]);
            }
            return $objects;
        }

        function insert($object) {
            $this->db->requete(
                "INSERT INTO image_service (id_service, nom_image) VALUES (".$object->getIdService().", '".$object->getNomImage()."')"
            );
        }

        function update($object) {
            $this->db->requete(
                "UPDATE image_service SET nom_image = ".$object->getNomImage().
                " WHERE id_service = ".$object->getIdService()
            );
        } 

        function delete($idService, $nomImage) {
            $this->db->requete("DELETE FROM image_service WHERE id_service = ".$idService." AND nom_image = ".$nomImage);
        }

        function getImagesById($id) {
            return $this->loadObject($this->db->requete($this->select . " WHERE id_service = ".$id));
        }
    }
?>
