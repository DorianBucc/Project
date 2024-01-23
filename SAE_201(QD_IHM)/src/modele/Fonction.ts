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
  for(let i = 0; i < chiffre.length ; i++){
    if(!(chiffre[i] === "0" || chiffre[i] === "1" || chiffre[i] === "2" || chiffre[i] === "3" || chiffre[i] === "4" || chiffre[i] === "5" || chiffre[i] === "6" || chiffre[i] === "7" || chiffre[i] === "8" || chiffre[i] === "9")){
      return false
    }
  }
  return true;
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
  else if(permis === ""){return true}
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
