<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once("../modele/connecte.php");
require_once("../modele/dao/utilisateurDAO.php");

function inscription() {
    if ($_POST['nom'] != "" && $_POST['prenom'] != "" && $_POST['adresse'] != "" && $_POST['telephone'] != "" && $_POST['rayon'] != "" && $_POST['email'] != "" && $_POST['password'] != "") {
        $utilisateurDAO = new UtilisateurDAO();              
        $result = $utilisateurDAO->inscription($_POST['email'], $_POST['password'], $_POST['nom'], $_POST['prenom'], $_POST['adresse'], $_POST['telephone'], $_POST['rayon']);
        
        if ($result === true) {
            return json_encode("../vue/index.html");
        }else {
            return json_encode("error");
        }
    } else {
        return json_encode("error");
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['nom']) && isset($_POST['prenom']) && isset($_POST['adresse']) && isset($_POST['telephone']) && isset($_POST['rayon']) && isset($_POST['email']) && isset($_POST['password'])) {
        echo inscription();
    }
    else{
        echo json_encode("error");
    }
}
?>
