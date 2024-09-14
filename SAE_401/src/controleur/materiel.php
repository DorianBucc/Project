<?php
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    header("Access-Control-Allow-Origin: *"); // Autorise les requêtes depuis n'importe quelle origine
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autorise les méthodes GET, POST et OPTIONS
    header("Access-Control-Allow-Headers: Content-Type"); // Autorise les en-têtes Content-Type
    header("Content-Type: json");
    
    require_once("../modele/dao/utilisateurDAO.php");
    require_once("../modele/dao/materielDAO.php");
    require_once("../modele/dao/categorieDAO.php");
    require_once("../modele/dao/favoris_materielDAO.php");
    require_once("../modele/dao/panier_materielDAO.php");
    require_once("../modele/dao/imageMaterielDAO.php");
    require_once("../modele/connecte.php");

    
    function getJsonMateriels(array $materiels) {
        $utilisateurDAO = new UtilisateurDAO();  
        $categorieDAO = new CategorieDAO();
        $imageMaterielDAO = new ImageMaterielDAO();
        $json = [];

        foreach ($materiels as $materiel){
            $images = [];
            $users = $utilisateurDAO->getUsersById($materiel->getIdUtilisateur());
            $categorie = $categorieDAO->getCategorieParId($materiel->getIdCategorie());
            $imageMateriel = $imageMaterielDAO->getImagesById($materiel->getId());

            foreach ($imageMateriel as $image) {
                $images[] = $image->getNomImage();
            }

            if ($images == []) $images[0] = "defaut";

            $json[] = 
            [
                "id" => $materiel->getId(), 
                "utilisateur" => ["id" => $users->getId(), "mail" => $users->getMailUtilisateur(), "nom" => $users->getNom(), "prenom" => $users->getPrenom(), "rayon" => $users->getRayon()],
                "description" => $materiel->getDescription(), 
                "nom" => $materiel->getNom(), 
                "marque" => $materiel->getMarque(), 
                "modele" => $materiel->getModele(), 
                "taille" => $materiel->getTaille(), 
                "status" => $materiel->getStatus(), 
                "latitude" => $materiel->getLatitude(),
                "longitude" => $materiel->getLongitude(),
                "categorie" => ["id" => $categorie->getId(), "nom" => $categorie->getNomCategorie()],
                "jetons" => $materiel->getNbJetons(),
                "images" => $images
            ];
        }
        return json_encode($json);
    }

    function getAllMateriel() {        
        $materielDAO = new MaterielDAO();
        $materiels = $materielDAO->getAllMateriel();
        
        return getJsonMateriels($materiels);
    }

    function getMaterielByUser(string $id) {
        $materielDAO = new MaterielDAO();
        $materiels = $materielDAO->getMaterielByUtilisateur($id);
       
        return getJsonMateriels($materiels);
    }

    function getUserFavoriteMateriels(string $id) {        
        $favorisMaterielsDAO = new FavorisMaterielDAO();
        $materielDAO = new MaterielDAO();
        $favorisMateriels = $favorisMaterielsDAO->getFavorisMaterielByUtilisateur($id);
        $materiels = [];

        foreach ($favorisMateriels as $favorisMateriel) {
            $materiels[] = $materielDAO->getMaterielById($favorisMateriel->getIdMateriel());
        }

        return getJsonMateriels($materiels);
    }

    function addFavorisMateriel(string $jsonMateriel, string $id) {
        $favorisMaterielDAO = new FavorisMaterielDAO();
        $materiel = json_decode($jsonMateriel, true);
        $favorisMateriel = new FavorisMateriel($id, $materiel["id"]);

        $favorisMaterielDAO->insert($favorisMateriel);

        return json_encode("added materiel ".$materiel["id"]." to favorite");
    }

    function deleteFavorisMateriel(string $jsonMateriel, string $id) {
        $favorisMaterielDAO = new FavorisMaterielDAO();
        $materiel = json_decode($jsonMateriel, true);

        $favorisMaterielDAO->delete($id, $materiel["id"]);
        
        return json_encode("deleted materiel ".$materiel["id"]." from favorite");
    }

    function getUserPanierMateriel(string $id) {        
        $panierMaterielsDAO = new PanierMaterielDAO();
        $materielDAO = new MaterielDAO();
        $panierMateriels = $panierMaterielsDAO->getPanierMaterielByUtilisateur($id);
        $materiels = [];

        foreach ($panierMateriels as $panierMateriel) {
            $materiels[] = $materielDAO->getMaterielById($panierMateriel->getIdMateriel());
        }

        return getJsonMateriels($materiels);
    }
    
    function addPanierMateriel(string $jsonMateriel, string $id) {
        $panierMaterielsDAO = new PanierMaterielDAO();
        $materiel = json_decode($jsonMateriel, true);
        $panierMateriels = new PanierMateriels($id, $materiel["id"]);

        $panierMaterielsDAO->insert($panierMateriels);

        return json_encode("added materiel ".$materiel["id"]." to panier");
    }

    function deletePanierMateriel(string $jsonMateriel, string $id) {
        $panierMaterielsDAO = new PanierMaterielDAO();
        $materiel = json_decode($jsonMateriel, true);

        $panierMaterielsDAO->delete($id, $materiel["id"]);
        
        return json_encode("deleted materiel ".$materiel["id"]." from panier");
    }

    function createMaterielAd(string $id, string $nomMateriel, string $marqueMateriel, string $modeleMateriel, string $tailleMateriel, string $descriptionMateriel, string $latitude, string $longitude, string $idCategorie){
        $utilisateur = new MaterielDAO;
        $resultat = $utilisateur->createAdByUser($id, $nomMateriel, $marqueMateriel, $modeleMateriel, $tailleMateriel, $descriptionMateriel, $latitude, $longitude, $idCategorie);

        return json_encode($resultat);
    }

    function getMaterielPendingAds(){
        $materielDAO = new MaterielDAO();
        $materiels = $materielDAO->getAllMaterielPendingAds();
       
        return getJsonMateriels($materiels);
    }

    function deleteMaterielAds(string $id){
        $materiel = new MaterielDAO;
        $resultat = $materiel->delete($id);

        return $resultat;
    }

    function confirmAdsById(string $id, int $nbJetons){
        $materiel = new MaterielDAO;
        $materiel->updateAnnonceValidee($id, $nbJetons, 1);
    }

    function updateModifiedAds(string $id, string $nomMateriel, string $marqueMateriel, string $modeleMateriel, string $tailleMateriel, string $descriptionMateriel, string $idCategorie){
        $materiel = new MaterielDAO;
        $materiel->updateModifiedAdById($id, $nomMateriel, $marqueMateriel, $modeleMateriel, $tailleMateriel, $descriptionMateriel, $idCategorie);
    }

    function getIdLastMateriel(){
        $materiel = new MaterielDAO;
        $resultat = $materiel->getLastMaterielCreated();

        return json_encode($resultat);
    }

    function postImagesMateriel($jsonfiles, string $id) {
        $imageMaterielDAO = new ImageMaterielDAO();
        $imageDirectory = "image/";
        $files = json_decode($jsonfiles);

        foreach ($files as $file) {
            $file = str_replace("data:image/png;base64,", '', $file);
            $file = str_replace(' ', '+', $file);

            $image = base64_decode($file);

            $attr = ".png";
            $imageName = uniqid("materiel_");
            $imagePath = $imageDirectory.$imageName.$attr;

            if (file_put_contents($imagePath, $image)) {
                $imageMateriel = new ImageMateriel($id, $imageName);

                $imageMaterielDAO->insert($imageMateriel);
            } 
        }
        return json_encode("uploaded");
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST["type"]) && isset($_POST["materiel"]) && isset($_POST["id"])) {
            if ($_POST["type"] === "add_favoris") {
                echo addFavorisMateriel($_POST["materiel"], $_POST["id"]);
            }
            if ($_POST["type"] === "delete_favoris") {
                echo deleteFavorisMateriel($_POST["materiel"], $_POST["id"]);
            }
            if ($_POST["type"] === "add_panier") {
                echo addPanierMateriel($_POST["materiel"], $_POST["id"]);
            }
            if ($_POST["type"] === "delete_panier") {
                echo deletePanierMateriel($_POST["materiel"], $_POST["id"]);
            }
        }
        else if (isset($_POST["type"]) && isset($_POST["files"]) && isset($_POST["id"])) {
            if ($_POST["type"] === "postImages") {
                echo postImagesMateriel($_POST["files"], $_POST["id"]);
            }
        }
        else if(isset($_POST["type"]) && isset($_POST["id"])){
            if($_POST["type"] === "creerAnnonceMateriel"){
                echo createMaterielAd($_POST["id"], $_POST["nomMateriel"], $_POST["marqueMateriel"], $_POST["modeleMateriel"], $_POST["tailleMateriel"], $_POST["descriptionMateriel"], $_POST["latitudeMateriel"], $_POST["longitudeMateriel"], $_POST["idCategorie"]);
            }
            if($_POST["type"] === "supprimerAnnonceMateriel"){
                echo deleteMaterielAds($_POST["id"]);
            }
            if($_POST['type'] == "validerAnnonce"){
                echo confirmAdsById($_POST["id"], $_POST["nbJetons"]);
            }
            if($_POST['type'] === "validerAnnonceModifiee"){
                echo updateModifiedAds($_POST["id"], $_POST["nomMateriel"], $_POST["marqueMateriel"], $_POST["modeleMateriel"], $_POST["tailleMateriel"], $_POST["descriptionMateriel"], $_POST["categorieMateriel"]);
            }
            if($_POST['type'] === "recupererIdDernierMateriel"){
                echo getIdLastMateriel();
            }
        }
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET'){
        if (isset($_GET["id"]) && isset($_GET["type"])) {
            if ($_GET["type"] === "all") {
                echo getAllMateriel();
            }
            if ($_GET["type"] === "perso") {
                echo getMaterielByUser($_GET["id"]);
            }
            if ($_GET["type"] === "favoris") {
                echo getUserFavoriteMateriels($_GET["id"]);
            }
            if ($_GET["type"] === "panier") {
                echo getUserPanierMateriel($_GET["id"]);
            }
        }else if(isset($_GET["type"])){
            if($_GET["type"] === "afficherAnnoncesMaterielAttente"){
                echo getMaterielPendingAds();
            }
        }
    }
?>