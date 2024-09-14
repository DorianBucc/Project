<?php
    header("Access-Control-Allow-Origin: *"); // Autorise les requêtes depuis n'importe quelle origine
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autorise les méthodes GET, POST et OPTIONS
    header("Access-Control-Allow-Headers: Content-Type"); // Autorise les en-têtes Content-Type
    header("Content-Type: json");

    require_once("../modele/connecte.php");
    require_once("../modele/dao/utilisateurDAO.php");
    require_once("../modele/dao/materielDAO.php");
    require_once("../modele/dao/serviceDAO.php");
    require_once("../modele/dao/favoris_materielDAO.php");
    require_once("../modele/dao/panier_materielDAO.php");
    require_once("../modele/dao/panier_serviceDAO.php");
    function getAll(){
        $con = new Connection();
        $result = $con->requete("SELECT * FROM `transaction`");
        return $result;
    }
    function getSolde(){
        $user = new UtilisateurDAO();
        $result = $user->getUsersById($_GET['id'])->getNbJetons(); 
        return $result;
    }
    function setEmpreintMateriel($iduser, $idMat){
        $con = new Connection();
        $user = new UtilisateurDAO();
        $mat = new MaterielDAO();
        $materiel = $mat->getMaterielById($idMat);
        $tarif = $materiel->getNbJetons();
        $solde = $user->getUsersById($iduser)->getNbJetons();
        $soldeVendeur = $user->getUsersById($materiel->getIdUtilisateur())->getNbJetons();
        if($materiel->getStatus() == 0 && $iduser != $materiel->getIdUtilisateur()){
            $con->requete("UPDATE materiel SET status = 1 WHERE id = ".$idMat);
            $con->requete("UPDATE utilisateur SET nbJetons = ".($solde-$tarif)." WHERE id = ".$iduser);
            $con->requete("UPDATE utilisateur SET nbJetons = ".($soldeVendeur+$tarif)." WHERE id = ".$materiel->getIdUtilisateur());
            $con->requete("INSERT INTO `transaction` 
            (`idTransaction`, `idEmprunteur`, `idPrestataire`, `type`, `DateDebut`, `DateFin`) VALUES 
            (NULL, '".$iduser."', '".$idMat."', 'mat', '".date("Y-m-d")."', '0000-00-00');
            ");
            deletePanierMateriel($iduser,$idMat);
            return "Succes";
        }
        else{
            deletePanierMateriel($iduser,$idMat);
        }
        return "Echec";
    }
    function setEmpreintService($iduser, $idServ){
        $con = new Connection();
        $user = new UtilisateurDAO();
        $Serv = new ServiceDAO();
        $service = $Serv->getServiceById($idServ);
        $tarif = $service->getNbJetons();
        $solde = $user->getUsersById($iduser)->getNbJetons();
        $soldeVendeur = $user->getUsersById($service->getIdUtilisateur())->getNbJetons();
        if($service->getStatus() == 0 && $iduser != $service->getIdUtilisateur()){
            $con->requete("UPDATE service SET status = 1 WHERE id = ".$idServ);
            $con->requete("UPDATE utilisateur SET nbJetons = ".($solde-$tarif)." WHERE id = ".$iduser);
            $con->requete("UPDATE utilisateur SET nbJetons = ".($soldeVendeur+$tarif)." WHERE id = ".$service->getIdUtilisateur());
            $con->requete("INSERT INTO `transaction` 
                (`idTransaction`, `idEmprunteur`, `idPrestataire`, `type`, `DateDebut`, `DateFin`) VALUES 
                (NULL, '".$iduser."', '".$idServ."', 'ser', '".date("Y-m-d")."', '0000-00-00');
                ");
            deletePanierService($iduser, $idServ);
            return "Succes";
        }
        else{
            deletePanierService($iduser, $idServ);
        }
        return "Echec";

    }

    function deletePanierMateriel(string $iduser, string $idmat) {
        $panierMaterielsDAO = new PanierMaterielDAO();
        $panierMaterielsDAO->delete($iduser, $idmat);
        return "Succes";
    }

    function deletePanierService(string $iduser, string $idServ) {
        $panierServicesDAO = new PanierServiceDAO();
        $panierServicesDAO->delete($iduser, $idServ);
        return "Succes";
    }


    function confirmPanier(){
        $total = 0;
        $id = $_GET['idUser']."";
        $panierMat = new PanierMaterielDAO();
        $mat = new MaterielDAO();
        $matTab = $panierMat->getPanierMaterielByUtilisateur($id);
        foreach ($matTab as $value) {
            $total += $mat->getMaterielById($value->getIdMateriel())->getNbJetons();
        }
        $panierServ = new PanierServiceDAO();
        $serv = new ServiceDAO();
        $servTab = $panierServ->getPanierServiceByUtilisateur($id);
        foreach ($servTab as $value) {
            $total += $serv->getServiceById($value->getIdService())->getNbJetons();
        }
        $user = new UtilisateurDAO();
        if($total <= $user->getUsersById($id)->getNbJetons()){
            foreach ($matTab as $value) {
                setEmpreintMateriel($id, $value->getIdMateriel());
            }
            foreach ($servTab as $value) {
                setEmpreintService($id, $value->getIdService());
            }
            return "Success";
        }
        return "Pas assez";
    }

    function setRendu(){
        if($_GET['cat'] == 'mat'){
            $con = new Connection();

            $infos = $con->requete("SELECT * FROM transaction, materiel  WHERE transaction.idPrestataire = materiel.id AND materiel.nom = '".$_GET['nom']."' ORDER BY transaction.idTransaction DESC LIMIT 0, 1");
            foreach ($infos as $value) {
                $info = $value;
                break;
            }
            
            if($info["DateFin"] != '0000-00-00'){
                return "passé";
            }
            $con->requete("UPDATE materiel SET status = 0 WHERE id = ".$info['idPrestataire']);
            $con->requete("UPDATE transaction SET DateFin = '".date("Y-m-d")."' WHERE idTransaction = ".$info['idTransaction']);
            
            $con->requete("UPDATE utilisateur 
                SET nbJetons = 
                    (
                        SELECT (SELECT nbJetons WHERE id = ".$info['idEmprunteur'].") - DATEDIFF(DateFin, DateDebut) as result 
                        from transaction WHERE idTransaction = ".$info['idTransaction']."
                    )
                WHERE id = ".$info['idEmprunteur']
            );
            
            $con->requete("UPDATE utilisateur 
                SET nbJetons = 
                    (
                        SELECT (SELECT nbJetons WHERE id = ".$info['idUtilisateur'].") + DATEDIFF(DateFin, DateDebut) as result 
                        from transaction WHERE idTransaction = ".$info['idTransaction']."
                    )
                WHERE id = ".$info['idUtilisateur']
            );
            return "success";
        }
        else if($_GET['cat'] == 'ser'){
            $con = new Connection();

            $infos = $con->requete("SELECT * FROM transaction, service  WHERE transaction.idPrestataire = service.id AND service.nom = '".$_GET['nom']."' ORDER BY transaction.idTransaction DESC LIMIT 0, 1");
            foreach ($infos as $value) {
                $info = $value;
                break;
            }
            
            if($info["DateFin"] != '0000-00-00'){
                return "passé";
            }
            $con->requete("UPDATE service SET status = 0 WHERE id = ".$info['idPrestataire']);
            $con->requete("UPDATE transaction SET DateFin = '".date("Y-m-d")."' WHERE idTransaction = ".$info['idTransaction']);
            
            $con->requete("UPDATE utilisateur 
                SET nbJetons = 
                    (
                        SELECT (SELECT nbJetons WHERE id = ".$info['idEmprunteur'].") - DATEDIFF(DateFin, DateDebut) as result 
                        from transaction WHERE idTransaction = ".$info['idTransaction']."
                    )
                WHERE id = ".$info['idEmprunteur']
            );
            
            $con->requete("UPDATE utilisateur 
                SET nbJetons = 
                    (
                        SELECT (SELECT nbJetons WHERE id = ".$info['idUtilisateur'].") + DATEDIFF(DateFin, DateDebut) as result 
                        from transaction WHERE idTransaction = ".$info['idTransaction']."
                    )
                WHERE id = ".$info['idUtilisateur']
            );
            return "success";
        }
        return "echec";
    }

    function getAllMaterielEmprunt() {        
        $con = new Connection();
        $materiels = [];
        
        $materiel = $con->requete("SELECT idPrestataire, DateFin FROM transaction WHERE idEmprunteur = ".$_GET['id']." AND type = 'mat'");
        foreach ($materiel as $value) {
            foreach ($con->requete("SELECT materiel.* FROM materiel WHERE id = ".$value["idPrestataire"]) as $value2) {
                $infomat = $value2;
                break;
            } 
            $materiels[] = [ "materiel" => $infomat, "date" => $value["DateFin"]];
        }

        return $materiels;
    }

    function getAllServiceEmprunt() {        
        $con = new Connection();
        $services = [];
        
        $service = $con->requete("SELECT idPrestataire, DateFin FROM transaction WHERE idEmprunteur = ".$_GET['id']." AND type = 'ser'");
        foreach ($service as $value) {
            foreach ($con->requete("SELECT service.* FROM service WHERE id = ".$value["idPrestataire"]) as $value2) {
                $infoservice = $value2;
                break;
            } 
            $services[] = [ "service" => $infoservice, "date" => $value["DateFin"]];
        }

        return $services;
    }

    function getAllServicePret() {        
        $con = new Connection();
        $services = [];
        
        $service = $con->requete("SELECT v.id, transaction.idEmprunteur, transaction.DateFin FROM service v, transaction 
        WHERE transaction.idPrestataire = v.id
        AND v.idUtilisateur = ".$_GET['id']."
        AND type = 'ser';");
        foreach ($service as $value) {
            foreach ($con->requete("SELECT service.* FROM service WHERE id = ".$value["id"]) as $value2) {
                $infoservice = $value2;
                break;
            } 
            foreach ($con->requete("SELECT mail_utilisateur FROM utilisateur WHERE id = ".$value["idEmprunteur"]) as $value2) {
                $userservice = $value2["mail_utilisateur"];
                break;
            } 
            
            $services[] = [ "service" => $infoservice, "utilisateur" => $userservice, "date" => $value["DateFin"]];
        }

        return $services;
    }

    function getAllMaterielPret() {        
        $con = new Connection();
        $materiels = [];
        
        $materiel = $con->requete("SELECT v.id, transaction.idEmprunteur, transaction.DateFin FROM materiel v, transaction 
        WHERE transaction.idPrestataire = v.id
        AND v.idUtilisateur = ".$_GET['id']."
        AND type = 'mat';");
        foreach ($materiel as $value) {
            foreach ($con->requete("SELECT materiel.* FROM materiel WHERE id = ".$value["id"]) as $value2) {
                $infomateriel = $value2;
                break;
            } 
            foreach ($con->requete("SELECT mail_utilisateur FROM utilisateur WHERE id = ".$value["idEmprunteur"]) as $value2) {
                $usermateriel = $value2["mail_utilisateur"];
                break;
            } 
            
            $materiels[] = [ "materiel" => $infomateriel, "utilisateur" => $usermateriel, "date" => $value["DateFin"]];
        }

        return $materiels;
    }
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if(isset($_GET['type']) && isset($_GET['nom']) && isset($_GET['cat'])){
            if ($_GET['type'] == 'rendu') {
                echo json_encode(setRendu());
            }
        }
        else if(isset($_GET['type']) && isset($_GET['id'])){
            if ($_GET['type'] == 'solde') {
                echo json_encode(getSolde());
            }
            else if ($_GET['type'] == 'matE') {
                echo json_encode(getAllMaterielEmprunt());
            }
            else if ($_GET['type'] == 'serE') {
                echo json_encode(getAllServiceEmprunt());
            }
            else if ($_GET['type'] == 'matP') {
                echo json_encode(getAllMaterielPret());
            }
            else if ($_GET['type'] == 'serP') {
                echo json_encode(getAllServicePret());
            }
        }
        else if(isset($_GET['type']) && isset($_GET['idUser'])){
            if ($_GET['type'] == 'panier') {
                echo json_encode(confirmPanier());
            }
        }
        else if(isset($_GET['type'])) {
            if ($_GET['type'] == 'all') {
                echo json_encode(getAll());
            }
        }
    }