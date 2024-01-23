import { connexion, APIsql } from "./connexion.js";
import { date_valide, estPositif, id_valide, immat_valide, permis_valide } from "./Fonction";
class UneInfraction {
    constructor(no_inf = "", date_inf = "", no_immat = "", no_permis = "") {
        this.idInf = no_inf;
        this.dateInf = date_inf;
        this.noImmat = no_immat;
        this.noPermis = no_permis;
    }
    get idInf() {
        return this._idInf;
    }
    set idInf(x) {
        if (estPositif(parseInt(x)) && id_valide(x) || 1 === 1) {
            this._idInf = x;
        }
    }
    get dateInf() {
        return this._dateInf;
    }
    set dateInf(x) {
        console.log(x);
        if (date_valide(x) || 1 === 1) {
            this._dateInf = x;
        }
    }
    get noImmat() {
        return this._noImmat;
    }
    set noImmat(x) {
        if (immat_valide(x) || 1 === 1) {
            this._noImmat = x;
        }
    }
    get noPermis() {
        return this._noPermis;
    }
    set noPermis(x) {
        if (permis_valide(x) || 1 === 1) {
            this._noPermis = x;
        }
    }
    toArray() {
        const tableau = {
            idInf: this._idInf,
            dateInf: this._dateInf,
            noImmat: this.noImmat,
            noPermis: this._noPermis,
        };
        return tableau;
    }
    delete() {
        let sql;
        sql = "DELETE FROM infraction WHERE id_inf = ? ;";
        if (APIsql.sqlWeb.SQLexec(sql, [this._idInf]) === true) {
            sql = "DELETE FROM comprend WHERE id_inf = ?;";
            return APIsql.sqlWeb.SQLexec(sql, [this._idInf]);
        }
        else
            return false;
    }
    insert(infraction) {
        let sql;
        sql = "INSERT INTO infraction(id_inf, date_inf, no_immat, no_permis) VALUES (?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [
            infraction.idInf,
            infraction.dateInf,
            infraction.noImmat,
            infraction.noPermis,
        ]);
    }
    update() {
        let sql;
        sql = "UPDATE infraction SET no_permis = ?, no_immat = ?  WHERE infraction.id_inf = ?;";
        return APIsql.sqlWeb.SQLexec(sql, [
            this.noPermis,
            this.noImmat,
            this.idInf,
        ]);
    }
}
class LesInfractions {
    constructor() { }
    load(result) {
        let infractions = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const infraction = new UneInfraction(item["id_inf"], item["date_inf"], item["no_immat"], item["no_permis"]);
            infractions[infraction.idInf] = infraction;
        }
        return infractions;
    }
    prepare(where) {
        let sql;
        sql = "SELECT id_inf, date_inf, no_immat, no_permis ";
        sql += " FROM infraction";
        if (where !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    insert(infraction) {
        let sql;
        sql = "INSERT INTO infraction(id_inf, date_inf, no_immat, no_permis) VALUES (?, ?, ?, ?)";
        return APIsql.sqlWeb.SQLexec(sql, [
            infraction.idInf,
            infraction.dateInf,
            infraction.noImmat,
            infraction.noPermis,
        ]);
    }
    update(infraction) {
        let sql;
        sql = "UPDATE infraction SET id_inf = ?, no_immat = ?, no_permis = ? ";
        return APIsql.sqlWeb.SQLexec(sql, [
            infraction.idInf,
            infraction.noImmat,
            infraction.noPermis,
        ]);
    }
}
export class ErrorData extends Error {
    constructor(message) {
        super(message);
        this.name = "ErrorData";
    }
}
export { connexion };
export { UneInfraction };
export { LesInfractions };
//# sourceMappingURL=data_infraction.js.map