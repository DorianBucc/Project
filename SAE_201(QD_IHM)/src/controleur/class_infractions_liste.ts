import { UnConducteur, LesConducteurs} from "../modele/data_conducteur";
import { UneInfraction, LesInfractions} from "../modele/data_infraction";
import { UnVehicule, LesVehicules} from "../modele/data_vehicule";
import {UnDelitByInf, LesDelitsByInf} from "../modele/data_delit";
import { ErrorData } from "../modele/data_infraction";
// import { UneInfraction, LesInfractions, TInfraction} from "../modele/data_infraction.ts";

// déclaration de l’ensemble des zones de saisie et d’affichage nécessaires à la gestion du formulaire type
type VueInfractionsListeForm = {
  divTitre: HTMLElement;
  btnAjouter: HTMLInputElement;
  tableInfractions: HTMLTableElement;
};

class VueInfractionsListe {
  private _form: VueInfractionsListeForm;
  private _nbLine: number
  get form(): VueInfractionsListeForm { return this._form;}
  constructor(){
    this._nbLine=0;
  }
  init(form: VueInfractionsListeForm): void {
    try{
      this._form = form;

      this.form.divTitre.textContent = "Liste des infractions";
      const instance0 = new LesInfractions();
      const data0 = instance0.all();
      const instance1 = new LesVehicules();
      const data1 = instance1.all();
      const instance2 = new LesConducteurs();
      const data2 = instance2.all();

    let nbLine = this._nbLine;
    for( let i = 0 ; i < nbLine; i++){
      this.form.tableInfractions.deleteRow(1);
      this._nbLine--;
    }
      
    for (let num in data0) {
        const UneClass0: UneInfraction = data0[num];
        const tr = this.form.tableInfractions.insertRow();    // création nlle ligne dans tableau
        tr.insertCell().textContent = UneClass0.idInf;
        tr.insertCell().textContent = UneClass0.dateInf;
        for (let num1 in data1) {
          const UneClass1: UnVehicule = data1[num1];
          if (UneClass0.noImmat === UneClass1.no_immat) {
            tr.insertCell().textContent = UneClass1.no_immat;
            let bool = false;
            for (let num in data2) {
              const UneClass2: UnConducteur = data2[num];
              if(UneClass0.noPermis === UneClass2.noPermis){
                tr.insertCell().textContent = UneClass2.noPermis;
                tr.insertCell().textContent = UneClass2.nom + " " + UneClass2.prenom;
                this.calculMontant(UneClass0, tr)
                bool = true;
              }
            }
            if(bool === false){
              tr.insertCell().textContent = "";
              tr.insertCell().textContent = "";
              this.calculMontant(UneClass0, tr);
            }
          }
        }
        let td = tr.insertCell();
        // création balise <a> pour appel page visualisation du détail de la salle
        let balisea0 = document.createElement("a")
        balisea0.classList.add('img_visu') // définition class contenant l’image (voir css)
        balisea0.onclick = function():void { vueInfractionsListe.detailClick(UneClass0.idInf); }
        td.appendChild(balisea0)

        // création balise <a> pour appel page modification du détail de la salle
        let balisea1 = document.createElement("a")
        balisea1.classList.add('img_modification') // définition class contenant l’image (voir css)
        balisea1.onclick = function():void { vueInfractionsListe.modifierClick(UneClass0.idInf); }
        td.appendChild(balisea1)
        
        // création balise <a> pour appel page suppression d'une salle
        let balisea2 = document.createElement("a")
        balisea2.classList.add('img_corbeille') // définition class contenant l’image (voir css)
        balisea2.onclick = function():void { vueInfractionsListe.supprimerClick(UneClass0); }
        td.appendChild(balisea2)
        this._nbLine ++;
      }
      this._form.btnAjouter.onclick = () => {this.ajouterClick()}
    }
    catch(e){
      if(e instanceof ErrorData){
        alert(e.message);
      }
    }
  }
  calculMontant(UneClass0 : UneInfraction, tr : HTMLTableRowElement){
    let montant = 0;
    const instance3 = new LesDelitsByInf();
    const data3 = instance3.byNumInf(UneClass0.idInf);
    for(let num in data3){
      const UneClass: UnDelitByInf = data3[num];
      montant += parseInt(UneClass.unDelit.tarif);
    }
    tr.insertCell().textContent = montant.toString()+ " €";
    
  }

  detailClick(num : string):void {
  // redirection vers « infraction_edit.html »avec indication du statut « affi » et de l'id d'infraction
  location.href = "infractions_edit.html?affi&" +encodeURIComponent(num);
  }
  modifierClick(num : string):void {
  // redirection vers « infraction_edit.html »avec indication du statut « modif » et de l'id d'infraction
  location.href = "infractions_edit.html?modif&" +encodeURIComponent(num)
  }
  supprimerClick(obj : UneInfraction):void {
    // redirection vers « infraction_edit.html »avec indication du statut »suppr » et de l'id d'infraction
    // location.href = "infractions_edit.html?suppr&" +encodeURIComponent(num)
    if(confirm(`Voulez-vous vraiment supprimer l'infraction n°${obj.idInf} ?`)){
      obj.delete();
      vueInfractionsListe.init(this.form);
    }
  }
  ajouterClick():void {
  // redirection vers « infraction_edit.html »avec indication du statut « ajout »
  location.href = "infractions_edit.html?ajout"
  }
}
let vueInfractionsListe = new VueInfractionsListe();
export { vueInfractionsListe };
