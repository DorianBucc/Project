class Compte{
    String nom;
    double solde;

    Compte(this.nom, this.solde);

    @override
    String toString(){
        return "Le type de compte : $nom | Solde : $solde";
    }
}