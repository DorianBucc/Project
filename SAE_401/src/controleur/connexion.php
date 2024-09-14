<?php
    header("Access-Control-Allow-Origin: *"); // Autorise les requêtes depuis n'importe quelle origine
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Autorise les méthodes GET, POST et OPTIONS
    header("Access-Control-Allow-Headers: Content-Type"); // Autorise les en-têtes Content-Type

    require_once("../modele/connecte.php");
    require_once("../modele/dao/utilisateurDAO.php");

    function connexion() {
        if ($_POST['mail'] != "" && $_POST['pass'] != "" && $_POST['SID'] != "") {  
            $utilisateurDAO = new UtilisateurDAO();              
            $result = $utilisateurDAO->getAllUsers(); 

            foreach ($result as $user) { // echo password_hash($_POST['password'], PASSWORD_DEFAULT);
                if ($user->getMailUtilisateur() == $_POST['mail'] && password_verify($_POST['pass'], $user->getMdpUtilisateur()) == true) {
                    $connexion = new Connection();
                    $connexion->updatePhpSessionId($user->getId(), $_POST['SID']);
                    if ($user->getConfirmation() == 0) {
                        return "attente";
                    } else {
                        return "./index.html?id=".$user->getId();
                    }
                    break;
                }
            }
        }
        else {
            return "error";
        }
    }

    function isConnect(){
        if ($_POST['id'] != "" && $_POST['SID'] != "") {  
            $utilisateurDAO = new UtilisateurDAO();              
            $result = $utilisateurDAO->getAllUsers();
            foreach ($result as $user) {
                if ($_POST['id'] == $user->getId() && $_POST['SID'] == $user->getSession()){
                    return "connect";
                }
            }
            return "!connect";
        }
        else {
            return "error";
        }
    }

    function deconnexion() {
        if ($_POST['SID'] != "" && $_POST['id'] != "") {
            $utilisateurDAO = new UtilisateurDAO();          
            $result = $utilisateurDAO->getAllUsers();
            foreach ($result as $user) {
                if ($user->getSession() == $_POST['SID'] && $_POST['id'] == $user->getId()) {
                    $connexion = new Connection();
                    $connexion->updatePhpSessionId($user->getId(), "");
                    return "success";
                }
            }
        }
        return json_encode("error");
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['type']) && isset($_POST['SID']) && isset($_POST['id'])) {
            if ($_POST['type'] == "deconnexion")
                echo deconnexion();
            else if ($_POST['type'] == "isconnect")
                echo isConnect();
        }
        else if (isset($_POST['mail']) && isset($_POST['pass']) && isset($_POST['SID'])) {
            echo connexion();
        }
        else{
            echo json_encode("error");
        }
    }