<?php
    class Connection {
        private $connexion;
        private $serveur = ""; 
        private $utilisateur = ""; 
        private $motDePasse = "";
        private $baseDeDonnees = "";
        
        public function __construct() { // Connection à la base de données
            $this->connexion = new mysqli($this->serveur, $this->utilisateur, $this->motDePasse, $this->baseDeDonnees);

            if ($this->connexion->connect_error) {
                die("Échec de la connexion : ".$this->connexion->connect_error);
            }
            $this->connexion->query('SET NAMES utf8');
        }

        public function requete(string $req, array $options = array()): array | bool {
            $requete = $this->connexion->query($req);

            if (!is_bool($requete))
            {      
                $resultat = [];
                foreach ($requete->fetch_all(MYSQLI_ASSOC) as $row)
                {    
                    $resultat[] = $row;
                }
                return $resultat;
            }
            else
            {
                return $requete;
            }
        }

        public function updatePhpSessionId(String $id, String $sessionId) {
            $this->connexion->query("UPDATE utilisateur SET session = '".$sessionId."' WHERE id = ".$id);
        }
    }