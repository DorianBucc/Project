<?php
    header("Access-Control-Allow-Origin: *"); // Autorise les requêtes depuis n'importe quelle origine
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autorise les méthodes GET, POST et OPTIONS
    header("Access-Control-Allow-Headers: Content-Type"); // Autorise les en-têtes Content-Type
    header("Content-Type: json");

    require_once("../modele/dao/utilisateurDAO.php");
    require_once("../modele/dao/serviceDAO.php");
    require_once("../modele/dao/favoris_serviceDAO.php");

    function getAllFavorisServices() {        
        $servicesDAO = new ServicesDAO();
        $utilisateurDAO = new UtilisateurDAO();
        $favoris_serviceDAO = new FavorisServicesDAO();
        $favoris_services = $favoris_serviceDAO->getAllFavorisServices();
        $tab = [];
        foreach ($favoris_services as $favoris_service){
            $users = $utilisateurDAO->getUsersById($favoris_service->getUtilisateur());
            $categorie = $favoris_serviceDAO->getFavoris_serviceParId($favoris_service->getIdFavoris_services());
            $tab[] = 
            [
                "id"=> $favoris_service->getIdService(),
                "utilisateur" => ["id" => $users->getId(), "mail" => $users->getMailUtilisateur()], 
            ];
        }
        return $tab;
    }

?>