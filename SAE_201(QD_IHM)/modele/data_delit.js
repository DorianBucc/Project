import { connexion, APIsql } from "./connexion.js";
class UnDelit {
    constructor(id_Delit = "", nature = "", tarif = "") {
        this._idDelit = id_Delit;
        this._nature = nature;
        this._tarif = tarif;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get idDelit() { return this._idDelit; }
    ;
    get nature() { return this._nature; }
    ;
    get tarif() { return this._tarif; }
    ;
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = { 'id_delit': this._idDelit, 'nature': this._nature, 'tarif': this._tarif };
        return tableau;
    }
    insert(number) {
        let sql;
        // requête de manipulation : utiliser SQLexec
        sql = "INSERT INTO comprend(id_inf, id_delit) VALUES (?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [
            number,
            this._idDelit,
        ]);
    }
}
class LesDelits {
    constructor() { }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnDelit
        let delits = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const delit = new UnDelit(item['id_delit'], item['nature'], item['tarif']);
            delits[delit.idDelit] = delit; // clé d’un élément du tableau : id equipt
        }
        return delits;
    }
    prepare(where) {
        let sql;
        sql = "SELECT id_delit, nature, tarif";
        sql += " FROM delit";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        //sql += " ORDER BY lib_equipt ASC ";
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byIdDelit(id_delit) {
        let delit = new UnDelit;
        const delits = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_delit = ?"), [id_delit]));
        const lesCles = Object.keys(delits);
        // affecte les clés du tableau associatif « typEquipts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            delit = delits[lesCles[0]]; // récupérer le 1er élément du tableau associatif « typEquipts »
        }
        return delit;
    }
}
class UnDelitByInf {
    constructor(unDelit = null) {
        this._unDelit = unDelit;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get unDelit() { return this._unDelit; }
    set unDelit(unDelit) { this._unDelit = unDelit; }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesDelitsByInf {
    constructor() { }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnDelitByInf
        const DelitByInf = {};
        const lesdelits = new LesDelits();
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const unDelit = lesdelits.byIdDelit(item['id_delit']);
            const delitByInf = new UnDelitByInf(unDelit);
            DelitByInf[delitByInf.unDelit.idDelit] = delitByInf;
        }
        return DelitByInf;
    }
    prepare(where) {
        let sql;
        sql = "SELECT id_delit";
        sql += " FROM comprend";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    byNumInf(num_Inf) {
        // renvoie le tableau d’objets contenant tous les équipements de la salle num salle
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_inf = ?"), [num_Inf]));
    }
    deleteByInf(inf) {
        let sql;
        sql = "DELETE FROM comprend WHERE id_inf = ?;";
        APIsql.sqlWeb.SQLexec(sql, [inf]);
    }
}
export { connexion };
export { UnDelit };
export { LesDelits };
export { UnDelitByInf };
export { LesDelitsByInf };
//# sourceMappingURL=data_delit.js.map