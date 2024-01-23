import { connexion, APIsql } from "../modele/connexion.js";
class UnConducteur {
    constructor(no_permis = "", date_permis = "", nom = "", prenom = "") {
        this._noPermis = no_permis;
        this._datePermis = date_permis;
        this._nom = nom;
        this._prenom = prenom;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get noPermis() {
        return this._noPermis;
    }
    get datePermis() {
        return this._datePermis;
    }
    get nom() {
        return this._nom;
    }
    get prenom() {
        return this._prenom;
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        const tableau = {
            noPermis: this._noPermis,
            datePermis: this._datePermis,
            nom: this.nom,
            prenom: this._prenom,
        };
        return tableau;
    }
}
// tableau d’objets UnConducteur
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesConducteurs {
    // définition de la classe gérant les données de la table conducteur
    constructor() { }
    // idExiste(no_permis: string): boolean {
    //   // renvoie le test d’existence d’une conducteur dans la table
    //   // sert pour l’ajout d’une nouvelle conducteur
    //   return (
    //     APIsql.sqlWeb.SQLloadData(
    //       "SELECT no_permis FROM conducteur WHERE no_permis=?",
    //       [no_permis]
    //     ).length > 0
    //   );
    // }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnConducteur
        let conducteurs = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const conducteur = new UnConducteur(item["no_permis"], item["date_permis"], item["nom"], item["prenom"]);
            conducteurs[conducteur.noPermis] = conducteur; // clé d’un élément du tableau : num conducteur
        }
        return conducteurs;
    }
    prepare(where) {
        // préparation de la requête avec ou sans restriction (WHERE)
        let sql;
        sql = "SELECT no_permis, date_permis, nom, prenom ";
        sql += " FROM conducteur";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        // renvoie le tableau d’objets contenant toutes les conducteurs
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    // bynoPermis(no_permis: string): UnConducteur {
    //   // renvoie l’objet correspondant au conducteur no_permis
    //   let conducteur = new UnConducteur();
    //   const conducteurs: TConducteur = this.load(
    //     APIsql.sqlWeb.SQLloadData(this.prepare("no_permis = ?"), [no_permis])
    //   );
    //   const lesCles: string[] = Object.keys(conducteurs);
    //   // affecte les clés du tableau associatif « conducteurs » dans le tableau de chaines « lesCles »
    //   if (lesCles.length > 0) {
    //     conducteur = conducteurs[lesCles[0]]; // récupérer le 1er élément du tableau associatif « conducteurs »
    //   }
    //   return conducteur;
    // }
    // toArray(conducteurs: TConducteur): APIsql.TdataSet {
    //   // renvoie le tableau d’objets sous la forme
    //   // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
    //   let T: APIsql.TdataSet = [];
    //   for (let id in conducteurs) {
    //     T.push(conducteurs[id].toArray());
    //   }
    //   return T;
    // }
    // delete(no_permis: string): boolean {
    //   // requête de suppression d’un conducteur dans la table
    //   let sql: string;
    //   sql = "DELETE FROM conducteur WHERE no_permis = ?";
    //   return APIsql.sqlWeb.SQLexec(sql, [no_permis]);
    //   // requête de manipulation : utiliser SQLexec
    // }
    // insert(conducteur: UnConducteur): boolean {
    //   // requête d’ajout d’un conducteur dans la table
    //   let sql: string;
    //   // requête de manipulation : utiliser SQLexec
    //   sql = "INSERT INTO conducteur(no_permis, date_permis, nom, prenom) VALUES (?, ?, ?, ?)";
    //   return APIsql.sqlWeb.SQLexec(sql, [
    //     conducteur.noPermis,
    //     conducteur.datePermis,
    //     conducteur.nom,
    //     conducteur.prenom,
    //   ]);
    // }
    update(conducteur) {
        // requête de modification d’un conducteur dans la table
        let sql;
        sql = "UPDATE conducteur SET date_permis = ?, nom = ?, prenom = ? ";
        sql += " WHERE no_permis = ?";
        // requête de manipulation : utiliser SQLexec
        return APIsql.sqlWeb.SQLexec(sql, [
            conducteur.datePermis,
            conducteur.nom,
            conducteur.prenom,
            conducteur.noPermis,
        ]);
    }
}
export { connexion };
export { UnConducteur };
export { LesConducteurs };
//# sourceMappingURL=data_conducteur.js.map