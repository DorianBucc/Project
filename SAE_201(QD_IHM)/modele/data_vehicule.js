import { connexion, APIsql } from "../modele/connexion.js";
class UnVehicule {
    constructor(no_immat = "", date_immat = "", modele = "", marque = "", no_permis = "") {
        this._no_immat = no_immat;
        this._date_immat = date_immat;
        this._modele = modele;
        this._marque = marque;
        this.no_permis = no_permis;
    }
    get no_immat() {
        return this._no_immat;
    }
    get date_immat() {
        return this._date_immat;
    }
    get modele() {
        return this._modele;
    }
    get marque() {
        return this._marque;
    }
    toArray() {
        let tableau = { 'no_immat': this.no_immat, 'date_immat': this.date_immat,
            'modele': this.modele, 'marque': this.marque, 'no_permis': this.no_permis };
        return tableau;
    }
}
class LesVehicules {
    constructor() { }
    load(result) {
        const Vehicule = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const vehicule = new UnVehicule(item['no_immat'], item['date_immat'], item['modele'], item['marque'], item['no_permis']);
            Vehicule[vehicule.no_immat] = vehicule; // clé d’un élément du tableau : code dépt
        }
        return Vehicule;
    }
    prepare(where) {
        let sql;
        sql = "SELECT no_immat, date_immat, modele, marque, no_permis FROM vehicule ";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
}
export { connexion };
export { UnVehicule };
export { LesVehicules };
//# sourceMappingURL=data_vehicule.js.map