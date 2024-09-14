<?php
    header("Access-Control-Allow-Origin: *"); // Autorise les requêtes depuis n'importe quelle origine
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autorise les méthodes GET, POST et OPTIONS
    header("Access-Control-Allow-Headers: Content-Type"); // Autorise les en-têtes Content-Type
    header("Content-Type: json");
    
    require_once("../modele/dao/categorieDAO.php");
    require_once("../modele/connecte.php");
    

    function getAllCategories() {
        $categorieDAO = new CategorieDAO();
        $categories = $categorieDAO->getAllCategories();
        $tab = [];
        foreach ($categories as $categorie){
            $tab[] = ["nom" => $categorie->getNomCategorie()];
        }
        return $tab;
    }


    if ($_SERVER['REQUEST_METHOD'] === "GET")
        if (isset($_GET["type"])) {
            if ($_GET["type"] === "all") {
                echo json_encode(getAllCategories());
            }
        }
?>