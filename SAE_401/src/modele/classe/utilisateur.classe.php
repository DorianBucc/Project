<?php
    class Utilisateur {
        private $id;
        private $mail_utilisateur;
        private $mdp_utilisateur;
        private $nom;
        private $prenom;
        private $adresse;
        private $tel;
        private $rayon;
        private $role;
        private $confirmation;
        private $session;
        private $nbjetons;

        function __construct($id = "", $mail_utilisateur = "", $mdp_utilisateur = "", $nom = "", $prenom = "", $adresse = "", $tel = "", $rayon = "", $role = "", $confirmation = "", $session = "", $nbjetons = "0") {
            $this->id = $id;
            $this->mail_utilisateur = $mail_utilisateur;
            $this->mdp_utilisateur = $mdp_utilisateur;
            $this->nom = $nom;
            $this->prenom = $prenom;
            $this->adresse = $adresse;
            $this->tel = $tel;
            $this->rayon = $rayon;
            $this->role = $role;
            $this->confirmation = $confirmation;
            $this->session = $session;
            $this->nbjetons = $nbjetons;
        }
    
        function getId() {
            return $this->id;
        }
        function setId(string $id)
        {
            $this ->id = $id;
        }

        function getMailUtilisateur() {
            return $this->mail_utilisateur;
        }
        function setMailUtilisateur(string $mail_utilisateur)
        {
            $this ->mail_utilisateur = $mail_utilisateur;
        }

        function getMdpUtilisateur() {
            return $this->mdp_utilisateur;
        }
        function setMdpUtilisateur(string $mdp_utilisateur)
        {
            $this->mdp_utilisateur = $mdp_utilisateur;
        }

        function getNom() {
            return $this->nom;
        }
        function setNom(string $nom)
        {
            $this->nom = $nom;
        }

        function getPrenom() {
            return $this->prenom;
        }
        function setPrenom(string $prenom)
        {
            $this->prenom = $prenom;
        }

        function getAdresse() {
            return $this->adresse;
        }
        function setAdresse(string $adresse)
        {
            $this->adresse = $adresse;
        }

        function getTel() {
            return $this->tel;
        }
        function setTel(string $tel)
        {
            $this->tel = $tel;
        }

        function getRayon() {
            return $this->rayon;
        }
        function setRayon(string $rayon)
        {
            $this->rayon = $rayon;
        }

        function getRole() {
            return $this->role;
        }
        function setRole(string $role)
        {
            $this->role = $role;
        }

        function getConfirmation() {
            return $this->confirmation;
        }
        function setConfirmation(string $confirmation)
        {
            $this->confirmation = $confirmation;
        }

        function getSession() {
            return $this->session;
        }
        function setSession(string $session)
        {
            $this->session = $session;
        }

        function getNbJetons(){
            return $this->nbjetons;
        }
        function setNbJetons(string $nbjetons){
            $this->nbjetons = $nbjetons;
        }
    }
?>
    
