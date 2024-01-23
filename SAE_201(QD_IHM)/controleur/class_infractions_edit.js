import { UneInfraction, LesInfractions, ErrorData } from "../modele/data_infraction";
import { UnDelit, LesDelits, LesDelitsByInf } from "../modele/data_delit";
import { LesVehicules } from "../modele/data_vehicule";
import { LesConducteurs } from "../modele/data_conducteur";
class VueInfractionsEdit {
    // private _erreur: {	// tableau contenant les messages d'erreur pour chaque type d'erreur pour chaque zone de saisie à vérifier
    // 	[key: string]: TErreur
    // }
    get form() {
        return this._form;
    }
    get params() { return this._params; }
    // get erreur(): { [key: string]: TErreur } { return this._erreur }
    init(form) {
        try {
            this.data0 = new LesInfractions().all();
            this.data1 = new LesConducteurs().all();
            this.data2 = new LesVehicules().all();
            this.data3 = new LesDelits().all();
            this._form = form;
            this.start = true;
            this.nbLineDelit = 0;
            this._params = location.search.substring(1).split('&');
            const affi = this.params[0] === 'affi';
            this.form.btnDelitAjouter.hidden = affi;
            this.form.btnDelitAnnuler.hidden = affi;
            this.form.btnInfractionsValider.hidden = affi;
            this.tableT = new Array;
            this.form.divDelitEdit.hidden = true;
            this.form.btnDelitAjouter.onclick = () => { vueInfractionsEdit.afficherDelits(); };
            this.form.btnDelitAnnuler.onclick = () => { vueInfractionsEdit.cacherDelits(); };
            this.form.btnInfractionsAnnuler.onclick = () => { vueInfractionsEdit.annulerInfraction(); };
            this.form.btnDelitValider.onclick = () => { vueInfractionsEdit.ajouterDelitClick(); };
            if (this.params[0] === "ajout") {
                this.form.btnInfractionsValider.onclick = () => { vueInfractionsEdit.ajouterInf(); };
                this.form.divInfractionsTitre.textContent = "Nouvelle Infraction";
            }
            if (this.params[0] === "modif") {
                this.form.btnInfractionsValider.onclick = () => { vueInfractionsEdit.modifierInf(); };
                this.form.divInfractionsTitre.textContent = "Modification d'une Infraction";
            }
            if (this.params[0] === "modif" || this.params[0] === "ajout") {
                this.form.edtImmatInf.onchange = () => { vueInfractionsEdit.actualiserInfo(); };
                this.form.edtPermisInf.onchange = () => { vueInfractionsEdit.actualiserInfo(); };
            }
            if (this.params[0] === "affi") {
                this.form.edtImmatInf.readOnly = true;
                this.form.edtPermisInf.readOnly = true;
                this.form.btnInfractionsAnnuler.value = "Retour";
                this.form.divInfractionsTitre.textContent = "Details d'une Infraction";
            }
            this.actualiserOption();
            this.affiTableDelits();
            this.afficher();
        }
        catch (e) {
            if (e instanceof ErrorData) {
                alert(e.message);
            }
        }
    }
    actualiserInfo() {
        for (let a in this.data2) {
            const UneClass1 = this.data2[a];
            if (this.form.edtImmatInf.value === UneClass1.no_immat) {
                this.form.edtVehiculeInf.value = UneClass1.marque + " : " + UneClass1.modele;
                this.form.edtDateImmatInf.value = UneClass1.date_immat;
                for (let b in this.data1) {
                    const UneClass2 = this.data1[b];
                    if (UneClass2.noPermis === UneClass1.no_permis) {
                        this.form.edtPropVeh.value = UneClass2.nom + " " + UneClass2.prenom;
                        this.form.edtDatePermisVeh.value = UneClass2.datePermis;
                    }
                }
            }
        }
        for (let c in this.data1) {
            const UneClass2 = this.data1[c];
            if (this.form.edtPermisInf.value === UneClass2.noPermis) {
                this.form.edtPropInf.value = UneClass2.nom + " " + UneClass2.prenom;
                this.form.edtDatePermisInf.value = UneClass2.datePermis;
            }
        }
    }
    afficher() {
        let Inf;
        for (let i in this.data0) {
            if (this.data0[i].idInf === this.params[1]) {
                Inf = this.data0[i];
            }
        }
        if (this.params[0] === "ajout") {
            let max = 0;
            for (let i in this.data0) {
                if (max < parseInt(this.data0[i].idInf)) {
                    max = parseInt(this.data0[i].idInf);
                }
            }
            max++;
            this.form.edtInf.value = max.toString();
            let dates = new Date(); // date infraction ajout
            let month;
            let day;
            if (parseInt(dates.getDay().toString()) < 10) {
                day = "0" + dates.getDay().toString();
            }
            else {
                day = dates.getDay().toString();
            }
            if (parseInt(dates.getMonth().toString()) < 10) {
                month = "0" + dates.getMonth().toString();
            }
            else {
                month = dates.getMonth().toString();
            }
            this.form.edtDateInf.value = dates.getFullYear().toString() + "-" + month + "-" + day;
        }
        else {
            this.form.edtInf.value = this.params[1];
        }
        if (this.params[1] !== undefined) {
            this.form.edtDateInf.value = Inf.dateInf;
            this.form.edtImmatInf.value = Inf.noImmat;
            let Veh;
            for (let i in this.data2) {
                if (Inf.noImmat === this.data2[i].no_immat) {
                    Veh = this.data2[i];
                }
            }
            this.form.edtDateImmatInf.value = Veh.date_immat;
            this.form.edtVehiculeInf.value = Veh.marque + " : " + Veh.modele;
            let PropVeh;
            for (let i in this.data1) {
                if (Veh.no_permis === this.data1[i].noPermis) {
                    PropVeh = this.data1[i];
                    this.form.edtPropVeh.value = PropVeh.nom + " " + PropVeh.prenom;
                    this.form.edtDatePermisVeh.value = PropVeh.datePermis;
                }
            }
            let PropInf;
            for (let i in this.data1) {
                if (Inf.noPermis === this.data1[i].noPermis) {
                    PropInf = this.data1[i];
                    this.form.edtDatePermisInf.value = PropInf.datePermis;
                    this.form.edtPropInf.value = PropInf.nom + " " + PropInf.prenom;
                }
            }
            this.form.edtPermisInf.value = Inf.noPermis;
        }
        if (this.form.edtPermisInf.value === "undefined") {
            this.form.edtPermisInf.value = "";
        }
    }
    actualiserOption() {
        let nbline = this._form.listeDelit.length;
        for (let y = 0; y < nbline; y++) {
            this._form.listeDelit.options.remove(0);
        }
        const lesDelits = new LesDelitsByInf();
        const allDelits = new LesDelits();
        let table = allDelits.all();
        let table2 = lesDelits.byNumInf(this.params[1]);
        let ok;
        if (this._params[0] === "affi" || this._params[0] === "modif") {
            for (let y in table) {
                ok = true;
                for (let i in table2) {
                    if (table[y].nature === table2[i].unDelit.nature) {
                        ok = false;
                    }
                    for (let ii in this.tableT) {
                        if (table[y].nature === this.tableT[ii]) {
                            ok = false;
                        }
                    }
                }
                if (ok === true) {
                    this._form.listeDelit.options.add(new Option(table[y].nature));
                }
            }
        }
        else {
            for (let y in table) {
                ok = true;
                for (let ii in this.tableT) {
                    if (table[y].nature === this.tableT[ii]) {
                        ok = false;
                    }
                }
                if (ok === true) {
                    this._form.listeDelit.options.add(new Option(table[y].nature));
                }
            }
        }
    }
    affiTableDelits() {
        const lesDelits = new LesDelitsByInf();
        this._table = lesDelits.byNumInf(this.params[1]);
        let line = this.nbLineDelit;
        for (let i = 0; i < line; i++) {
            this.form.tableDelits.deleteRow(1);
            this.nbLineDelit--;
        }
        if (this.start === true) {
            for (let id in this._table) {
                const UnDelitByInf = this._table[id];
                this.tableT.push(UnDelitByInf.unDelit.nature);
            }
            this.start = false;
        }
        let montant;
        for (let y in this.tableT) {
            const tr = this.form.tableDelits.insertRow();
            for (let i in this.data3) {
                let uneClass0 = this.data3[i];
                if (uneClass0.nature === this.tableT[y]) {
                    tr.insertCell().textContent = uneClass0.idDelit;
                }
            }
            for (let i in this.data3) {
                let uneClass0 = this.data3[i];
                if (uneClass0.nature === this.tableT[y]) {
                    montant = uneClass0.tarif;
                    tr.insertCell().textContent = montant.split(".")[0] + " €";
                }
            }
            tr.insertCell().textContent = this.tableT[y];
            if (this.params[0] === "modif" || this.params[0] === "ajout") {
                let balisea; // déclaration balise <a>
                balisea = document.createElement("a");
                balisea.classList.add('img_corbeille');
                balisea.onclick = () => { vueInfractionsEdit.supprimerDelitClick(this.tableT[y]); };
                tr.insertCell().appendChild(balisea);
            }
            else {
                tr.insertCell().textContent = "";
            }
            this.nbLineDelit++;
        }
        this.form.lblDelitsTotaux.textContent = this.nbLineDelit.toString();
        this.montantTotal();
    }
    supprimerDelitClick(delit) {
        this.tableT.splice(this.tableT.indexOf(delit), 1);
        this.affiTableDelits();
        console.log(1);
    }
    afficherDelits() {
        this.form.divDelitEdit.hidden = false;
        this.form.divInfractionsDetail.style.pointerEvents = 'auto';
        this.form.divDelitEdit.style.pointerEvents = 'auto';
        this.form.btnDelitAjouter.hidden = true;
        this.form.btnDelitAnnuler.hidden = false;
        this.form.btnDelitValider.hidden = false;
        this.affiTableDelits();
    }
    cacherDelits() {
        this.form.divDelitEdit.hidden = true;
        this.form.divInfractionsDetail.style.pointerEvents = 'auto';
        this.form.btnDelitAjouter.hidden = false;
        this.form.btnDelitAnnuler.hidden = true;
        this.form.btnDelitValider.hidden = true;
    }
    annulerInfraction() {
        for (let i in this.tableT) {
            let index = this.tableT.indexOf(i, 0);
            if (index > -1) {
                this.tableT.splice(index, 1);
            }
        }
        location.href = "infractions.html";
    }
    ajouterDelitClick() {
        const liste = this._form.listeDelit;
        const ligne = liste.selectedIndex;
        this.tableT.push(liste.options[ligne].value);
        this.afficherDelits();
        this.actualiserOption();
        this.cacherDelits();
    }
    ajouterInf() {
        try {
            if (this.form.edtImmatInf.value === undefined || this.form.edtImmatInf.value === "") {
                throw new ErrorData("L'immatriculation doit être renseignée");
            }
            if (this.vehiculeverif(this.form.edtImmatInf.value, this.data2) === false) {
                throw new ErrorData("Vehicule Inconnu");
            }
            if (this.permisverif(this.form.edtPermisInf.value, this.data1) === false && this.form.edtPermisInf.value !== "") {
                throw new ErrorData("Conducteur Inconnu");
            }
            if (this.form.edtDelitMontant.value === "0 €") {
                throw new ErrorData("L'infraction doit contenir au moins un délit");
            }
            let test = new UneInfraction(this.form.edtInf.value, this.form.edtDateInf.value, this.form.edtImmatInf.value, this.form.edtPermisInf.value);
            test.insert(test);
            for (let y in this.tableT) {
                for (let i in this.data3) {
                    let uneClass0 = this.data3[i];
                    if (uneClass0.nature === this.tableT[y]) {
                        let test2 = new UnDelit(uneClass0.idDelit, uneClass0.nature, uneClass0.tarif);
                        test2.insert(this.form.edtInf.value);
                    }
                }
            }
            this.annulerInfraction();
        }
        catch (e) {
            if (e instanceof ErrorData) {
                alert(e.message);
            }
        }
    }
    modifierInf() {
        try {
            if (this.form.edtImmatInf.value === "") {
                throw new ErrorData("L'immatriculation doit être renseignée");
            }
            if (this.vehiculeverif(this.form.edtImmatInf.value, this.data2) === false) {
                throw new ErrorData("Vehicule Inconnu");
            }
            if (this.permisverif(this.form.edtPermisInf.value, this.data1) === false && this.form.edtPermisInf.value !== "") {
                throw new ErrorData("Conducteur Inconnu");
            }
            if (this.form.edtDelitMontant.value === "0 €") {
                throw new ErrorData("L'infraction doit contenir au moins un délit");
            }
            let test = new UneInfraction(this._params[1], this.form.edtDateInf.value, this.form.edtImmatInf.value, this.form.edtPermisInf.value);
            test.update();
            let delAllD = new LesDelitsByInf;
            delAllD.deleteByInf(this._params[1]);
            for (let y in this.tableT) {
                for (let i in this.data3) {
                    let uneClass0 = this.data3[i];
                    if (uneClass0.nature === this.tableT[y]) {
                        let test2 = new UnDelit(uneClass0.idDelit, uneClass0.nature, uneClass0.tarif);
                        test2.insert(this.form.edtInf.value);
                    }
                }
            }
            this.annulerInfraction();
        }
        catch (e) {
            if (e instanceof ErrorData) {
                alert(e.message);
            }
        }
    }
    montantTotal() {
        let montant = 0;
        for (let y in this.tableT) {
            for (let i in this.data3) {
                let uneClass0 = this.data3[i];
                if (uneClass0.nature === this.tableT[y]) {
                    montant += parseInt(uneClass0.tarif);
                }
            }
        }
        this.form.edtDelitMontant.value = montant.toString() + " €";
    }
    vehiculeverif(v, T) {
        for (let i in T) {
            let uneClass0 = T[i];
            if (uneClass0.no_immat === v) {
                return true;
            }
        }
        return false;
    }
    permisverif(p, T) {
        for (let i in T) {
            let uneClass0 = T[i];
            if (uneClass0.noPermis === p) {
                return true;
            }
        }
        return false;
    }
}
let vueInfractionsEdit = new VueInfractionsEdit;
export { vueInfractionsEdit };
//# sourceMappingURL=class_infractions_edit.js.map