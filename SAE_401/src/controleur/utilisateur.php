<?php
    header("Access-Control-Allow-Origin: *"); // Autorise les requêtes depuis n'importe quelle origine
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autorise les méthodes GET, POST et OPTIONS
    header("Access-Control-Allow-Headers: Content-Type"); // Autorise les en-têtes Content-Type
    header("Content-Type: json");

    require_once("../modele/connecte.php");
    require_once("../modele/dao/utilisateurDAO.php");

    
    function getAvatar(string $id)
    {   
        $utilisateurDAO = new UtilisateurDAO();
        
        return $utilisateurDAO->avatar($id);
    }

    function infoUser(string $id, string $SID) {
        $info = [];
 
        $utilisateurDAO = new UtilisateurDAO();              
        $utilisateur = $utilisateurDAO->getUsersById($id);

        $info["connected"] = ($utilisateur->getId() == $id && $utilisateur->getSession() == $SID);
        $info["admin"] = ($utilisateur->getRole() == "1");
        
        return $info;
    }

    function getUsersWithConfirmationZero() {
        $utilisateurDAO = new UtilisateurDAO();
        $utilisateurs = $utilisateurDAO->getAllUsersByConfirmation();

        return json_encode($utilisateurs);
    }

    function confirmUsers() {
        $utilisateur = new UtilisateurDAO;
        $utilisateur->updateConfirmation($_GET['id'], 1);
    }

    function declineUsers() {
        $utilisateur = new UtilisateurDAO;
        $utilisateur->delete($_GET['id']);
    }

    function banUsers(){
        $utilisateur = new UtilisateurDAO;
        $utilisateur->updateConfirmation($_GET['id'], 2);
    }

    function usersList(){
        $utilisateur = new UtilisateurDAO;
        $users_list = $utilisateur->getAllConfirmedUsers();

        return json_encode($users_list);
    }

    function byMailUser($mail){
        // echo 1;
        $utilisateurDAO = new UtilisateurDAO();
        $utilisateurs = $utilisateurDAO->getAllUsers();

        foreach ($utilisateurs as $utilisateur) {   
            $userObj = [
                // "id" => $utilisateur->getId(),
                "mail" => $utilisateur->getMailUtilisateur(),
                "nom" => $utilisateur->getNom(),
                "prenom" => $utilisateur->getPrenom(),
                "adresse" => $utilisateur->getAdresse(),
                "tel" => $utilisateur->getTel(),
                "rayon" => $utilisateur->getRayon(),
            ];
            if($userObj["mail"] == $mail){
                return $userObj;
            }
        }
        return "";
    }

    function getTransactionTotal(){
        $transaction = new UtilisateurDAO;
        $resultat = $transaction->getTotalTransaction();

        return json_encode($resultat);
    }


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        echo json_encode(getAvatar($_POST["id"]));
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        if (isset($_GET['type']) && isset($_GET['SID']) && isset($_GET['id'])) {
            if ($_GET['type'] == 'info') {
                echo json_encode(infoUser($_GET['id'], $_GET['SID']));
            }
            else if ($_GET['type'] == 'confirmation') {
                echo getUsersWithConfirmationZero();
            }else if($_GET['type'] == 'listeVoisins'){
                echo usersList();
            }else if($_GET['type'] == 'validerUtilisateur'){
                echo confirmUsers();
            }
            else if($_GET['type'] == "refuserUtilisateur"){
                echo declineUsers();
            }else if($_GET['type'] == "bannirUtilisateur"){
                echo banUsers();
            }
        }
        else if(isset($_GET['type']) && isset($_GET['mail'])){
            if($_GET['type'] == 'bymail'){
                echo json_encode(byMailUser($_GET['mail']));
            }
        }else if(isset($_GET['type'])){
            if($_GET['type'] == 'nbVoisins'){
                echo usersList();
            }else if($_GET['type'] == 'nbTransactions'){
                echo getTransactionTotal();
            }
        }
    }
?>