import { connexion, APIsql } from "./connexion.js";
import { date_valide, estPositif, id_valide, immat_valide, permis_valide } from "./Fonction"
class UneInfraction {
  private _idInf: string;
  private _dateInf: string;
  private _noImmat: string;
  private _noPermis: string;
  constructor(no_inf = "", date_inf = "", no_immat = "", no_permis = "") {
    this.idInf = no_inf;
    this.dateInf = date_inf;
    this.noImmat = no_immat;
    this.noPermis = no_permis;
  }

  get idInf(): string {
    return this._idInf;
  }
  set idInf(x:string) {
    if(estPositif(parseInt(x)) && id_valide(x) || 1 === 1){
      this._idInf = x
    }
  }

  get dateInf(): string {
    return this._dateInf;
  }
  set dateInf(x:string) {
    console.log(x)
    if(date_valide(x) || 1 === 1){
     this._dateInf = x
    }
  }

  get noImmat(): string {
    return this._noImmat;
  }
  set noImmat(x:string) {
    if(immat_valide(x) || 1 === 1){
      this._noImmat = x
    }
  }

  get noPermis(): string {
    return this._noPermis;
  }
  set noPermis(x:string) {
    if(permis_valide(x) || 1 === 1){
      this._noPermis = x
    }
  }

  toArray(): APIsql.TtabAsso {


    const tableau: APIsql.TtabAsso = {
      idInf: this._idInf,
      dateInf: this._dateInf,
      noImmat: this.noImmat,
      noPermis: this._noPermis,
    };
    return tableau;
  }
  delete(): boolean {

    let sql: string;
    sql = "DELETE FROM infraction WHERE id_inf = ? ;";
    if (APIsql.sqlWeb.SQLexec(sql, [this._idInf]) === true){
      sql = "DELETE FROM comprend WHERE id_inf = ?;";
      return APIsql.sqlWeb.SQLexec(sql, [this._idInf]);
    }
    else return false

  }
  insert(infraction: UneInfraction): boolean {

    let sql: string;

    sql = "INSERT INTO infraction(id_inf, date_inf, no_immat, no_permis) VALUES (?, ?, ?, ?)";
    return APIsql.sqlWeb.SQLexec(sql, [
      infraction.idInf,
      infraction.dateInf,
      infraction.noImmat,
      infraction.noPermis,
    ]);
  }
  update(): boolean {

    let sql: string;
    sql = "UPDATE infraction SET no_permis = ?, no_immat = ?  WHERE infraction.id_inf = ?;";

    return APIsql.sqlWeb.SQLexec(sql, [
      this.noPermis,
      this.noImmat,
      this.idInf,
  
    ]);
  }
}

type TInfraction = { [key: string]: UneInfraction }
class LesInfractions {
  constructor() {}
  private load(result: APIsql.TdataSet): TInfraction {

    let infractions: TInfraction = {};
    for (let i = 0; i < result.length; i++) {
      const item: APIsql.TtabAsso = result[i];
      const infraction = new UneInfraction(
        item["id_inf"],
        item["date_inf"],
        item["no_immat"],
        item["no_permis"]
      );
      infractions[infraction.idInf] = infraction
    }
    return infractions;
  }
  private prepare(where: string): string {

    let sql: string;
    sql = "SELECT id_inf, date_inf, no_immat, no_permis ";
    sql += " FROM infraction";
    if (where !== "") {
      sql += " WHERE " + where;
    }
    return sql;
  }
  all(): TInfraction {

    return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
  }

  insert(infraction: UneInfraction): boolean {

    let sql: string;

    sql = "INSERT INTO infraction(id_inf, date_inf, no_immat, no_permis) VALUES (?, ?, ?, ?)";
    return APIsql.sqlWeb.SQLexec(sql, [
      infraction.idInf,
      infraction.dateInf,
      infraction.noImmat,
      infraction.noPermis,
    ]);
  }
  update(infraction: UneInfraction): boolean {

    let sql: string;
    sql = "UPDATE infraction SET id_inf = ?, no_immat = ?, no_permis = ? ";


    return APIsql.sqlWeb.SQLexec(sql, [
      infraction.idInf,
      infraction.noImmat,
      infraction.noPermis,
  
    ]);
  }
}

export class ErrorData extends Error{
  public id : string;
  constructor(message:string) {
  super(message);
  this.name = "ErrorData";
  }
}

export { connexion };
export { UneInfraction };
export { LesInfractions };
export { TInfraction };
