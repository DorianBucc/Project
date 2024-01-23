import {connexion, APIsql} from "../modele/connexion.js"
class UnVehicule {

private _no_immat: string;
private _date_immat: string;
private _modele : string;
private _marque : string;
public no_permis : string;

constructor(no_immat = "", date_immat ="" , modele = "", marque = "", no_permis = "" ) {
    this._no_immat = no_immat;
    this._date_immat = date_immat;
    this._modele = modele;
    this._marque = marque;
    this.no_permis = no_permis;
}

get no_immat(){
    return this._no_immat;}
get date_immat(){
    return this._date_immat;}
get modele(){
    return this._modele;}
get marque(){
    return this._marque;}


toArray():APIsql.TtabAsso {         // pour un affichage dans une ligne d’un tableau HTML
let tableau : APIsql.TtabAsso = {'no_immat':this.no_immat, 'date_immat':this.date_immat,
'modele':this.modele, 'marque':this.marque, 'no_permis':this.no_permis };
return tableau;
}
}
type TVehicule = {[key: string]: UnVehicule};

class LesVehicules {                    // définition de la classe gérant les données de la table
constructor () {}

private load(result : APIsql.TdataSet) : TVehicule {// à partir d’un TdataSet, conversion en tableau d’objets

    const Vehicule : TVehicule = {};
    for (let i=0; i<result.length; i++) {
        const item:APIsql.TtabAsso = result[i];
        const vehicule = new UnVehicule(
            item['no_immat'], 
            item['date_immat'], 
            item['modele'], 
            item['marque'], 
            item['no_permis']
        );
        Vehicule[vehicule.no_immat] = vehicule ; // clé d’un élément du tableau : code dépt
    }
    return Vehicule;
}

private prepare(where:string):string { // préparation de la requête avec ou sans restriction (WHERE)
    let sql : string;
    sql = "SELECT no_immat, date_immat, modele, marque, no_permis FROM vehicule ";
    if (where !== ""){
        sql += " WHERE " + where;
    }
    return sql;
}
all() : TVehicule {                     // renvoie le tableau d’objets
return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
}

}

export {connexion}
export {UnVehicule}
export {LesVehicules}
export {TVehicule}
    