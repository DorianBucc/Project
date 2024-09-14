<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    header("Access-Control-Allow-Origin: *"); // Autorise les requêtes depuis n'importe quelle origine
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autorise les méthodes GET, POST et OPTIONS
    header("Access-Control-Allow-Headers: Content-Type"); // Autorise les en-têtes Content-Type
    header("Content-Type: json");
    
    require_once("../modele/dao/utilisateurDAO.php");
    require_once("../modele/dao/serviceDAO.php");
    require_once("../modele/dao/categorieDAO.php");
    require_once("../modele/dao/favoris_servicesDAO.php");
    require_once("../modele/dao/panier_serviceDAO.php");
    require_once("../modele/dao/imageServiceDAO.php");
    require_once("../modele/connecte.php");


    function getJsonServices(array $services) {
        $utilisateurDAO = new UtilisateurDAO();
        $categorieDAO = new CategorieDAO();
        $imageServiceDAO = new ImageServiceDAO();
        $json = [];

        foreach ($services as $service){
            $images = [];
            $users = $utilisateurDAO->getUsersById($service->getIdUtilisateur());
            $categorie = $categorieDAO->getCategorieParId($service->getIdCategorie());
            $imageService = $imageServiceDAO->getImagesById($service->getId());

            foreach ($imageService as $image) {
                $images[] = $image->getNomImage();
            }

            if ($images == []) $images[0] = "defaut";
            
            $json[] = 
            [
                "id" => $service->getId(), 
                "utilisateur" => ["id" => $users->getId(), "mail" => $users->getMailUtilisateur(), "nom" => $users->getNom(), "prenom" => $users->getPrenom(), "rayon" => $users->getRayon()], 
                "nom" => $service->getNom(),
                "description" => $service->getDescription(), 
                "status" => $service->getStatus(),
                "latitude" => $service->getLatitude(),
                "longitude" => $service->getLongitude(),
                "categorie" => ["id" => $categorie->getId(), "nom" => $categorie->getNomCategorie()], 
                "jetons" => $service->getNbJetons(),
                "images" => $images
            ];
        }
        return json_encode($json);
    }

    function getAllService() {        
        $serviceDAO = new ServiceDAO();
        $services = $serviceDAO->getAllService();
        
        return getJsonServices($services);
    }

    function getServiceByUser(string $id) {        
        $serviceDAO = new ServiceDAO();
        $services = $serviceDAO->getServiceByUtilisateur($id);

        return getJsonServices($services);
    }

    function getUserFavoriteServices(string $id) {        
        $favorisServicesDAO = new FavorisServicesDAO();
        $serviceDAO = new ServiceDAO();
        $favorisServices = $favorisServicesDAO->getAllFavorisServicesById($id);
        $services = [];

        foreach ($favorisServices as $favorisService) {
            $services[] = $serviceDAO->getServiceById($favorisService->getIdService());
        }

        return getJsonServices($services);
    }


    function addFavorisService(string $jsonService, string $id) {
        $favorisServicesDAO = new FavorisServicesDAO();
        $service = json_decode($jsonService, true);
        $favorisServices = new FavorisServices($id, $service["id"]);

        $favorisServicesDAO->insert($favorisServices);

        return json_encode("added service ".$service["id"]." to favorite");
    }

    function deleteFavorisService(string $jsonService, string $id) {
        $favorisServicesDAO = new FavorisServicesDAO();
        $service = json_decode($jsonService, true);

        $favorisServicesDAO->delete($id, $service["id"]);
        
        return json_encode("deleted service ".$service["id"]." from favorite");
    }

    function getUserPanierService(string $id) {        
        $panierServicesDAO = new PanierServiceDAO();
        $serviceDAO = new ServiceDAO();
        $panierServices = $panierServicesDAO->getPanierServiceByUtilisateur($id);
        $services = [];

        foreach ($panierServices as $panierService) {
            $services[] = $serviceDAO->getServiceById($panierService->getIdService());
        }

        return getJsonServices($services);
    }

    function addPaniersService(string $jsonService, string $id) {
        $panierServicesDAO = new PanierServiceDAO();
        $service = json_decode($jsonService, true);
        $panierServices = new PanierServices($id, $service["id"]);

        $panierServicesDAO->insert($panierServices);

        return json_encode("added service ".$service["id"]." to panier");
    }

    function deletePanierService(string $jsonService, string $id) {
        $panierServicesDAO = new PanierServiceDAO();
        $service = json_decode($jsonService, true);

        $panierServicesDAO->delete($id, $service["id"]);
        
        return json_encode("deleted service ".$service["id"]." from panier");
    }

    function createServiceAd(string $id, string $nomService, string $descriptionService, string $latitude, string $longitude, string $idCategorie){
        $utilisateur = new ServiceDAO;
        $resultat = $utilisateur->createAdByUser($id, $nomService, $descriptionService, $latitude, $longitude, $idCategorie);

        return json_encode($resultat);
    }

    function getAllServicePendingsAds(){
        $serviceDAO = new ServiceDAO();
        $services = $serviceDAO->getAllServicePendingAds();
       
        return getJsonServices($services);
    }

    function deleteServiceAds($id){
        $materiel = new ServiceDAO;
        $resultat = $materiel->delete($id);

        return $resultat;
    }

    function confirmAdsById($id, $nbJetons){
        $service = new ServiceDAO;
        $service->updateAnnonceValidee($id, $nbJetons, 1);
    }

    function updateModifiedAds(string $id, string $nomService, string $descriptionService, string $idCategorie){
        $service = new ServiceDAO;
        $service->updateModifiedAdById($id, $nomService, $descriptionService, $idCategorie);
    }

    function getIdLastService(){
        $service = new ServiceDAO;
        $resultat = $service->getLastServiceCreated();

        return json_encode($resultat);
    }

    function postImagesService($jsonfiles, string $id) {
        $imageServiceDAO = new ImageServiceDAO();
        $imageDirectory = "image/";
        $files = json_decode($jsonfiles);

        foreach ($files as $file) {
            $file = str_replace("data:image/png;base64,", '', $file);
            $file = str_replace(' ', '+', $file);

            $image = base64_decode($file);

            $attr = ".png";
            $imageName = uniqid("service_");
            $imagePath = $imageDirectory.$imageName.$attr;

            if (file_put_contents($imagePath, $image)) {
                $imageService = new ImageService($id, $imageName);

                $imageServiceDAO->insert($imageService);
            } 
        }
        return json_encode("uploaded");
    }
    

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST["type"]) && isset($_POST["service"]) && isset($_POST["id"])) {
            if ($_POST["type"] === "add_favoris") {
                echo addFavorisService($_POST["service"], $_POST["id"]);
            }
            if ($_POST["type"] === "delete_favoris") {
                echo deleteFavorisService($_POST["service"], $_POST["id"]);
            }
            if ($_POST["type"] === "add_panier") {
                echo addPaniersService($_POST["service"], $_POST["id"]);
            }
            if ($_POST["type"] === "delete_panier") {
                echo deletePanierService($_POST["service"], $_POST["id"]);
            }
        }
        else if (isset($_POST["type"]) && isset($_POST["files"]) && isset($_POST["id"])) {
            if ($_POST["type"] === "postImages") {
                echo postImagesService($_POST["files"], $_POST["id"]);
            }
        }
        else if(isset($_POST["type"]) && isset($_POST["id"])){
            if($_POST["type"] === "creerAnnonceService"){
                echo createServiceAd($_POST["id"], $_POST["nomService"], $_POST["descriptionService"], $_POST["latitudeService"], $_POST["longitudeService"], $_POST["idCategorie"]);
            }
            if($_POST["type"] === "supprimerAnnonceService"){
                echo deleteServiceAds($_POST["id"]);
            }
            if($_POST['type'] ===  "validerAnnonce"){
                echo confirmAdsById($_POST["id"], $_POST["nbJetons"]);
            }
            if($_POST['type'] === "validerAnnonceModifiee"){
                echo updateModifiedAds($_POST["id"], $_POST["nomService"], $_POST["descriptionService"], $_POST["categorieService"]);
            }
            if($_POST['type'] === "recupererIdDernierService"){
                echo getIdLastService();
            }
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET["id"]) && isset($_GET["type"])) {
            if ($_GET["type"] === "all") {
                echo getAllService();
            }
            if ($_GET["type"] === "perso") {
                echo getServiceByUser($_GET["id"]);
            }
            if ($_GET["type"] === "favoris") {
                echo getUserFavoriteServices($_GET["id"]);
            }
            if ($_GET["type"] === "panier") {
                echo getUserPanierService($_GET["id"]);
            }
        }else if(isset($_GET["type"])){
            if($_GET["type"] === "afficherAnnoncesServiceAttente"){
                echo getAllServicePendingsAds();
            }
        }
    }
?>