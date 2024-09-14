<?php
    require_once("../modele/connecte.php");
    require_once("../modele/classe/utilisateur.classe.php");
    require_once("../modele/interface/IDAO.php");

    class UtilisateurDAO implements IDAO {
        private $db;
        private $select;

        function __construct()
        {
            $this->db = new Connection();
            $this->select = "SELECT utilisateur.* FROM utilisateur";
        }

        function loadObject($result)
        {   
            $objects = [];
            foreach ($result as $row) {
                $objects[] = new Utilisateur($row["id"], $row["mail_utilisateur"], $row["mdp_utilisateur"], $row["nom"], $row["prenom"], $row["adresse"], $row["tel"], $row["rayon"], $row["role"], $row["confirmation"],$row["session"],$row["nbJetons"]);
            }
            return $objects;
        }

        function update($object) {
            $this->db->requete(
                "UPDATE utilisateur SET mail_utilisateur = ".$object->getMailUtilisateur().", mdp_utilisateur = ".$object->getMdpUtilisateur().
                ", nom = ".$object->getNom().", prenom = ".$object->getPrenom().", adresse = ".$object->getAdresse().", tel = ".$object->getTel().
                ", rayon = ".$object->getRayon().", role = ".$object->getRole().", confirmation = ".$object->getConfirmation().", session = ".$object->getSession().", nbJetons = ".$object->getNbJetons()." WHERE id = ".$object->getId()
            );
        }

        function updateConfirmation($id, $confirmation) {
            $this->db->requete("UPDATE utilisateur SET confirmation = ".$confirmation." WHERE id = ".$id);
        }
        
        function delete($id) {
            $this->db->requete("DELETE FROM utilisateur WHERE id = ".$id);
        }

        function getAllUsers() {
            return $this->loadObject($this->db->requete($this->select));
        }

        function getAllUsersByConfirmation() {
            $requete = "SELECT id, mail_utilisateur, nom, prenom, adresse, tel, rayon FROM utilisateur WHERE confirmation = 0";
            $resultat = $this->db->requete($requete);
            
            return $resultat;
        }

        function getAllConfirmedUsers() {
            $requete = "SELECT id, mail_utilisateur, nom, prenom FROM utilisateur WHERE confirmation = 1 AND role = 0";
            $resultat = $this->db->requete($requete);
            
            return $resultat;
        }
        
        function inscription($email, $password, $nom, $prenom, $adresse, $telephone, $rayon) {
            $requete = "INSERT INTO utilisateur (mail_utilisateur, mdp_utilisateur, nom, prenom, adresse, tel, rayon, role, confirmation, session, nbJetons) VALUES ('$email', '" . password_hash($password, PASSWORD_DEFAULT) . "', '$nom', '$prenom', '$adresse', '$telephone', '$rayon', 0, 0, '', 20)";
            $resultat = $this->db->requete($requete);
            
            return $resultat;
        }
        
        function getUsersById($id) {
            $utilisateur = new Utilisateur();
            $requete = $this->loadObject($this->db->requete($this->select." WHERE id = ".$id));

            if (count($requete) > 0) {   
                $utilisateur = $requete[0];
            }
            return $utilisateur;
        }

        function getTotalTransaction(){
            $requete = "SELECT COUNT(*) from transaction";
            $resultat = $this->db->requete($requete);
            
            return $resultat;
        }
    
        function avatar($id)
        {   
            $resultat = "";
            $requete = $this->db->requete("SELECT UPPER(CONCAT(LEFT(nom, 1), LEFT(prenom, 1))) as avatar FROM utilisateur WHERE id = ".$id);

            if (count($requete) > 0)
            {   
                $resultat = $requete[0]["avatar"];
            }
            return $resultat;
        }
    }