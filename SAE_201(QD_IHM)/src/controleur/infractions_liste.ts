import {vueInfractionsListe} from "../controleur/class_infractions_liste"

vueInfractionsListe.init({ 
    divTitre: document.querySelector('[id=div_infractions_liste_titre]')
    ,btnAjouter: document.querySelector('[id=btn_infractions_ajouter]')
    ,tableInfractions: document.querySelector('[id=table_infractions]')
});