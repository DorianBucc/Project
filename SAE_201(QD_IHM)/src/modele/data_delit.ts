import {connexion, APIsql} from "./connexion.js"

class UnDelit {
    private _idDelit: string;
    private _nature : string;
    private _tarif: string;

constructor(id_Delit = "", nature ="" , tarif ="")
{ // initialisation à l’instanciation
this._idDelit= id_Delit;
this._nature = nature;
this._tarif= tarif;
}
// définition des « getters » et des « setters » pour les attributs privés de la classe

get idDelit(){ return this._idDelit};
get nature(){ return this._nature};
get tarif(){ return this._tarif};

toArray():APIsql.TtabAsso
{
// renvoie l’objet sous la forme d’un tableau associatif
// pour un affichage dans une ligne d’un tableau HTML

let tableau : APIsql.TtabAsso = {'id_delit':this._idDelit, 'nature':this._nature, 'tarif':this._tarif};
    return tableau;
}

insert(number: string){
    let sql: string;
    // requête de manipulation : utiliser SQLexec
    sql = "INSERT INTO comprend(id_inf, id_delit) VALUES (?, ?)";
    return APIsql.sqlWeb.SQLexec(sql, [
        number,
        this._idDelit,
    ]);
}

}

type TDelit = {[key: string]: UnDelit }; // tableau d’objets UnDelit // eslint-disable-next-line @typescript-eslint/no-unused-vars

class LesDelits { // définition de la classe gérant les données de la table TYPE_EQUIPT
constructor () {}
private load(result : APIsql.TdataSet) : TDelit {
// à partir d’un TdataSet, conversion en tableau d’objets UnDelit
    let delits : TDelit = {};
    for (let i=0; i<result.length; i++) {
        const item:APIsql.TtabAsso = result[i];
        const delit = new UnDelit(item['id_delit'], item['nature'], item['tarif']);
        delits[delit.idDelit] = delit;// clé d’un élément du tableau : id equipt
    }
return delits;
}
private prepare(where:string):string { // préparation de la requête avec ou sans restriction (WHERE)
    let sql : string;
    sql = "SELECT id_delit, nature, tarif";
    sql += " FROM delit"
    if (where.trim() !== "")
    {
        sql += " WHERE " +where;
    }
    //sql += " ORDER BY lib_equipt ASC ";
    return sql;
}
all() : TDelit { // renvoie le tableau d’objets contenant tous les équipements
return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""),[]));
}
byIdDelit(id_delit:string) : UnDelit { // renvoie l’objet correspondant à l’équipement id_equipt
let delit = new UnDelit;
const delits : TDelit = this.load(APIsql.sqlWeb.SQLloadData
(this.prepare("id_delit = ?"),[id_delit]));
const lesCles: string[] = Object.keys(delits);
// affecte les clés du tableau associatif « typEquipts » dans le tableau de chaines « lesCles »
if ( lesCles.length > 0) {
delit = delits[lesCles[0]]; // récupérer le 1er élément du tableau associatif « typEquipts »
}
return delit;
}
// toArray(delits : TDelit) : APIsql.TdataSet { // renvoie le tableau d’objets sous la forme
// // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
// let T:APIsql.TdataSet = [];
// for (let id in delits) {
// T.push(delits[id].toArray());
// }
// return T;
// }
}


class UnDelitByInf {

private _unDelit : UnDelit;
constructor(unDelit : UnDelit = null) { // attributs de TYPE_EQUIPT auxquelles on ajouter l’attribut « qte » de la relation « contient »
this._unDelit = unDelit;
}
// définition des « getters » et des « setters » pour les attributs privés de la classe
get unDelit():UnDelit { return this._unDelit; }
set unDelit(unDelit : UnDelit) { this._unDelit = unDelit; }

// toArray():APIsql.TtabAsso {
// // renvoie l’objet sous la forme d’un tableau associatif
// // pour un affichage dans une ligne d’un tableau HTML
// let tableau = this.unDelit.toArray(); // appel de la méthode « toArray » de « UnDelit »
// tableau['qte'] = this.qte;
// return tableau;
// }


}


type TDelitByInf = {[key: string]: UnDelitByInf };
// eslint-disable-next-line @typescript-eslint/no-unused-vars


class LesDelitsByInf {

constructor () {}

private load(result : APIsql.TdataSet) : TDelitByInf {
// à partir d’un TdataSet, conversion en tableau d’objets UnDelitByInf
const DelitByInf : TDelitByInf = {};
const lesdelits = new LesDelits();
for (let i=0; i<result.length; i++) {
    const item:APIsql.TtabAsso = result[i];
    const unDelit = lesdelits.byIdDelit(item['id_delit']);
    const delitByInf = new UnDelitByInf(unDelit);
    DelitByInf[delitByInf.unDelit.idDelit] = delitByInf;
}
return DelitByInf;
}
private prepare(where:string):string {
let sql : string;
sql = "SELECT id_delit";
sql += " FROM comprend";
if (where.trim() !== "")
{
sql += " WHERE " +where;
}
return sql;
}
byNumInf(num_Inf : string) : TDelitByInf {
// renvoie le tableau d’objets contenant tous les équipements de la salle num salle
return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?"),[num_Inf]));
}

deleteByInf(inf: string): void{
    let sql : string
    sql = "DELETE FROM comprend WHERE id_inf = ?;";
    APIsql.sqlWeb.SQLexec(sql, [inf]);
}
}
export {connexion}
export {UnDelit}
export {LesDelits}
export {TDelit}
export {UnDelitByInf}
export {LesDelitsByInf}
export {TDelitByInf}