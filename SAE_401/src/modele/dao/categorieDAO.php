<?php
    require_once("../modele/connecte.php");
    require_once("../modele/classe/categorie.classe.php");
    require_once("../modele/interface/IDAO.php");

    class CategorieDAO implements IDAO {
        private $db;
        private $select;

        function __construct()
        {
            $this->db = new Connection();
            $this->select = "SELECT categories.* FROM categories";
        }

        function loadObject($result)
        {   
            $objects = [];
            foreach ($result as $row) {
                $objects[] = new Categorie($row["id"], $row["NomCategorie"]);
            }
            return $objects;
        }

        function update($object) {
            $this->db->requete(
                "UPDATE categories SET NomCategorie = ".$object->getNomCategorie()." WHERE id = ".$object->getId()
            );
        } 

        function delete($id) {
            $this->db->requete("DELETE FROM categories WHERE id = ".$id);
        }

        function getAllCategories() {
            return $this->loadObject($this->db->requete($this->select));
        }

        function getCategorieParId($id) {
            $resulat = $this->loadObject($this->db->requete($this->select." WHERE id = ".$id));
            $categorie = new Categorie();

            if (count($resulat) > 0) {
                $categorie = $resulat[0];
            }
            return $categorie;
        }
    }
?>
