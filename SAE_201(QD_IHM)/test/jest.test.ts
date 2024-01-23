export class ErrorData extends Error{
    public id : string;
    constructor(message:string) {
    super(message);
    this.name = "ErrorData";
    }
}

function estLettre(lettre: string): boolean {
    return (lettre >= "a" && lettre <= "z") || (lettre >= "A" && lettre <= "Z");
  }
  
  function estChiffre(chiffre: string): boolean {
    return chiffre >= "0" && chiffre <= "9";
  }
  
  function estEspace(lettre: string): boolean {
    return lettre === " ";
  }
  
  export function estPositif(nombre: number): boolean {
    return nombre > 0;
  }
  
  export function immat_valide(immat: string): boolean {
    if (immat.length !== 7) {
      throw new ErrorData("Immat invalide");
    }
  
    if(
      estLettre(immat[0]) &&
      estLettre(immat[1]) &&
      estChiffre(immat[2]) &&
      estChiffre(immat[3]) &&
      estChiffre(immat[4]) &&
      estLettre(immat[5]) &&
      estLettre(immat[6])
    ){
      return true
    }
    throw new ErrorData("Immat invalide");
    
  }
  
  export function date_valide(date_immat: string): boolean {
    let temp_date = date_immat.split("-");
    let jour = temp_date[2];
    let mois = temp_date[1];
    let annee = temp_date[0];
  
    if (parseInt(jour) > 0 && parseInt(jour) <= 31) {
      if ((parseInt(mois) > 0 && parseInt(mois) <= 12)) {
        if (
          annee.length === 4 &&
          estChiffre(annee[0]) &&
          estChiffre(annee[1]) &&
          estChiffre(annee[2]) &&
          estChiffre(annee[3])
        ) {
          return true;
        }
      }
    }
    throw new ErrorData("Date invalide");
  }
  
  export function marque_valide(marque: string): boolean {
    if (marque.length < 3) {
      throw new ErrorData("Marque invalide");
    }
  
    for (let i = 0; i < marque.length; i++) {
      if (!estLettre(marque[i]) && !estEspace(marque[i])) {
        throw new ErrorData("Marque invalide");
      }
    }
  
    return true;
  }
  
  export function modele_valide(modele: string): boolean {
    if (modele.length < 1) {
      throw new ErrorData("Modele invalide");
    }
  
    for (let i = 0; i < modele.length; i++) {
      if (!estChiffre(modele[i]) && !estLettre(modele[i]) && !estEspace(modele[i])) {
        throw new ErrorData("Modele invalide");
      }
    }
  
    return true;
  }
  
  export function permis_valide(permis: string): boolean {
    if (permis.length !== 4 && permis.length !== 0 ) {
      throw new ErrorData("Permis invalide");
    }
  
    if(estLettre(permis[0]) && estLettre(permis[1]) && estChiffre(permis[2]) && estChiffre(permis[3])){
      return true
    }
    else{
      throw new ErrorData("Permis invalide");
    }
  }
  
  export function id_valide(id: string): boolean {
    if(estChiffre(id) && estPositif(parseInt(id)))
    {
      return true
    }
    else{
      throw new ErrorData("Id invalide");
    }
  }
  
  export function nature_valide(nature: string): boolean {
    return nature.length >= 9;
  }
  
  // export function tarif_valide(tarif: string): boolean {
  //   if(estChiffre(tarif)){
  //     if(estPositif(parseInt(tarif)))
  //     {
  //       return true;
  //     }
  //     else{
  //       throw new ErrorData("Tarif invalide");
  //     }
  //   }
  //   else{
  //     throw new ErrorData("Tarif invalide");
  //   }
  // }
  
  export function nom_valide(nom: string): boolean {
    if (nom.length < 2) {
      throw new ErrorData("Nom invalide");
    }
  
    for (let i = 0; i < nom.length; i++) {
      if (!estLettre(nom[i]) && !estEspace(nom[i]) && nom[i] !== "-") {
        throw new ErrorData("Nom invalide");
      }
    }
  
    return true;
  }
  
  export function prenom_valide(prenom: string): boolean {
    if (prenom.length < 2) {
      throw new ErrorData("Prenom invalide");
    }
  
    for (let i = 0; i < prenom.length; i++) {
      if (!estLettre(prenom[i]) && !estEspace(prenom[i]) && prenom[i] !== "-") {
        throw new ErrorData("Prenom invalide");
      }
    }
  
    return true;
  }

//import {/*tarif_valide,*/ nom_valide, prenom_valide, modele_valide, marque_valide, date_valide, estPositif, id_valide, immat_valide, permis_valide } from "../src/modele/Fonction";

test("Date valide",() => expect(date_valide("2023-02-25")).toBe(true));
test("Date valide",() => expect(date_valide("2029-07-05")).toBe(true));
test("Date jour invalide",() => expect(() => date_valide("2023-02-60")).toThrow("Date invalide"));
test("Date mois invalide",() => expect(() => date_valide("2023-50-20")).toThrow("Date invalide"));
test("Date anné invalide",() => expect(() => date_valide("20245-02-20")).toThrow("Date invalide"));

test("Permis valide",() => expect(permis_valide("AZ99")).toBe(true));
test("Permis Chiffre invalide",() => expect(() => permis_valide("8693")).toThrow("Permis invalide"));
test("Permis Lettre invalide",() => expect(() => permis_valide("AZER")).toThrow("Permis invalide"));
test("Permis à l'envers invalide",() => expect(() => permis_valide("99ZA")).toThrow("Permis invalide"));

test("Immat valide",() => expect(immat_valide("AA987BB")).toBe(true));
test("Immat valide",() => expect(immat_valide("ZZ900AB")).toBe(true));
test("Immat Chiffre invalide",() => expect(() => immat_valide("8694537")).toThrow("Immat invalide"));
test("Immat Lettre invalide",() => expect(() => immat_valide("AZERRTR")).toThrow("Immat invalide"));
test("Immat à l'envers invalide",() => expect(() => immat_valide("99ZAT67")).toThrow("Immat invalide"));

test("Id valide",() => expect(id_valide("6")).toBe(true));
test("Id valide",() => expect(id_valide("87")).toBe(true));
test("Id valide",() => expect(id_valide("178")).toBe(true));
test("Id negatif invalide",() => expect(() => id_valide("-1")).toThrow("Id invalide"));
test("Id Lettre invalide",() => expect(() => id_valide("A")).toThrow("Id invalide"));
test("Id chiffre et lettre invalide",() => expect(() => id_valide("00P")).toThrow("Id invalide"));

test("modele valide",() => expect(modele_valide("107")).toBe(true));
test("modele valide",() => expect(modele_valide("Canyen")).toBe(true));
test("modele valide",() => expect(modele_valide("Clio5")).toBe(true));
test("modele non alpha invalide",() => expect(() => modele_valide("-")).toThrow("Modele invalide"));
test("modele vide invalide",() => expect(() => modele_valide("")).toThrow("Modele invalide"));
test("modele chiffre et lettre invalide",() => expect(() => modele_valide("0&0P")).toThrow("Modele invalide"));

test("Marque valide",() => expect(marque_valide("Peugeot")).toBe(true));
test("Marque valide",() => expect(marque_valide("peugeot")).toBe(true));
test("Marque vide invalide",() => expect(() => marque_valide("")).toThrow("Marque invalide"));
test("Marque Lettre invalide",() => expect(() => marque_valide("A")).toThrow("Marque invalide"));
test("Marque chiffre et lettre invalide",() => expect(() => marque_valide("000P")).toThrow("Marque invalide"));

test("Prenom valide",() => expect(prenom_valide("Jonathan")).toBe(true));
test("Prenom valide",() => expect(prenom_valide("Jona-than")).toBe(true));
test("Prenom valide",() => expect(prenom_valide("Jona than")).toBe(true));
test("Prenom une lettre invalide",() => expect(() => prenom_valide("A")).toThrow("Prenom invalide"));
test("Prenom Lettre et & invalide",() => expect(() => prenom_valide("A&")).toThrow("Prenom invalide"));
test("Prenom chiffre et lettre invalide",() => expect(() => prenom_valide("0A")).toThrow("Prenom invalide"));

test("Nom valide",() => expect(nom_valide("Dagon")).toBe(true));
test("Nom valide",() => expect(nom_valide("Da gon")).toBe(true));
test("Nom valide",() => expect(nom_valide("Da-gon")).toBe(true));
test("Nom une lettre invalide",() => expect(() => nom_valide("A")).toThrow("Nom invalide"));
test("Nom Lettre et & invalide",() => expect(() => nom_valide("A&")).toThrow("Nom invalide"));
test("Nom chiffre et lettre invalide",() => expect(() => nom_valide("0A")).toThrow("Nom invalide"));

// test("Tarif valide",() => expect(tarif_valide("200")).toBe(true));
// test("Tarif negatif invalide",() => expect(() => tarif_valide("-200")).toThrow("Tarif invalide"));
// test("Tarif Lettre invalide",() => expect(() => tarif_valide("AEZEZR")).toThrow("Tarif invalide"));
// test("Tarif chiffre et lettre invalide",() => expect(() => tarif_valide("2000A")).toThrow("Tarif invalide"));
