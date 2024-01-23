import { MPM } from "./mpm";
import { BellMan } from "./bellman"
import { createWriteStream } from "fs";
import { infoS } from "./infos";
import { InfoBell } from "./infobell";
import { InfoBellbis } from "./infobellbis";

export class AlgoMPM extends MPM{
    public bellman : BellMan;
    public MargeTotal : Array<infoS>
    public MargeLibre : Array<infoS>

    constructor(graph = ""){
        super(graph);
        this.bellman = new BellMan(this);
        this.MargeTotal = new Array<infoS>
        this.MargeLibre = new Array<infoS>
    }


    arborescence() : Array<InfoBell>{
        this.bellman.arborescence(1,"Début")
        // MaxTime
        for(let i = 0 ; i < this.TabInfo.length ; i++){
            if(this.maxTime < this.TabInfo[i].poid){
                this.maxTime = this.TabInfo[i].poid
            }
        }
        return this.TabInfo
    }

    antiarborescence(): InfoBellbis[] {
        this.bellman.antiarborescence(1,"Fin")
        for(let i = 0 ; i < this.TabInfobis.length ; i++){
            if(this.maxTime < this.TabInfobis[i].poid){
                this.maxTime = this.TabInfobis[i].poid
            }
        }
        return this.TabInfobis
    }

    tacheCritique() : string[]{
        this.arborescence()
        this.antiarborescence()        
        for(let i = 0 ; i < this.TabInfo.length ; i++)
        {
            let y = this.TabInfobis.length-(i+1)
            if(this.TabInfo[i].sommet === this.TabInfobis[y].sommet && this.TabInfo[i].poid === this.maxTime-this.TabInfobis[y].poid)
            {
                this.tachesCritique.push(this.TabInfo[i].sommet)
            }
            if(this.TabInfo[i].sommet === this.TabInfobis[y].sommet){
                this.MargeTotal.push(new infoS(this.TabInfo[i].sommet, (this.maxTime - this.TabInfobis[y].poid) - this.TabInfo[i].poid))
                let min = Infinity
                for(let b = 0 ; b < this.TabArc.length ; b++){
                    if( this.TabArc[b].origin === this.TabInfo[i].sommet)
                    {
                        for(let a = 0 ; a < this.TabInfo.length ; a++)
                        {
                            if(this.TabInfo[a].sommet === this.TabArc[b].but && this.TabInfo[a].poid < min){
                                min = this.TabInfo[a].poid
                                break                                
                            }
                        }
                    }
                }
                for(let a = 0 ; a < this.tabsommet.length ; a++){
                    if(this.TabInfo[i].sommet === this.tabsommet[a].sommet){
                        this.MargeLibre.push(new infoS(this.TabInfo[i].sommet, min - this.TabInfo[i].poid - this.tabsommet[a].poid))
                    }
                }
            }
        }
        this.MargeTotal
        this.MargeLibre
        return this.tachesCritique
    }

    saveArb(repertoire = "./"){
        this.tacheCritique()
        let output = createWriteStream(repertoire+"MPM_"+this.nbSommets.toString()+".txt", "utf8")
        let x = this.TabInfo
        output.write("\nArborescence :\nSommet | ")
        for (let i = 0; i < x.length ; i++) {
            output.write(x[i].sommet + " | ")
        }
        output.write("\nPere | ")
        for (let i = 0; i < x.length ; i++) {
            output.write(x[i].pere + " | ")
        }
        output.write("\nPoids | ")
        for (let i = 0; i < x.length ; i++) {
            if(x[i].poid !== Infinity){
            output.write(x[i].poid + " | ")
            }
            else
            {
                output.write("∞ | ")
                
            }
        }
        output.write("\n\nTâche Critique :\n"+this.tachesCritique.toString())
        output.write("\n\nMarge Libre :\nSommet | ")
        for(let i in this.MargeLibre)
        {
            output.write(this.MargeLibre[i].sommet + " | ")
        }
        output.write("\nPoid | ")
        for(let i in this.MargeLibre)
        {
            output.write(this.MargeLibre[i].poid + " | ")
        }
        output.write("\n\nMarge Total :\nSommet | ")
        for(let i in this.MargeTotal)
        {
            output.write(this.MargeTotal[i].sommet + " | ")
        }
        output.write("\nPoid | ")
        for(let i in this.MargeTotal)
        {
            output.write(this.MargeTotal[i].poid + " | ")
        }
        output.write("\n")
        output.end
    }


    saveAnt(repertoire = "./"){
        this.tacheCritique()
        let output = createWriteStream(repertoire+"MPM_"+this.nbSommets.toString()+".txt", "utf8")
        let y = this.TabInfobis
        output.write("\nAnti-Arborescence :\nSommet | ")
        for (let i = 0; i < y.length ; i++) {
            output.write(y[i].sommet + " | ")
        }
        output.write("\nFils | ")
        for (let i = 0; i < y.length ; i++) {
            output.write(y[i].fils + " | ")
        }
        output.write("\nPoids | ")
        for (let i = 0; i < y.length ; i++) {
            if(y[i].poid !== Infinity && y[i].poid !== -Infinity){
            output.write(y[i].poid + " | ")
            }
            else
            {
                output.write("∞ | ")
                
            }
        }
        output.write("\n\nTâche Critique :\n"+this.tachesCritique.toString())
        output.write("\n\nMarge Libre :\nSommet | ")
        for(let i in this.MargeLibre)
        {
            output.write(this.MargeLibre[i].sommet + " | ")
        }
        output.write("\nPoid | ")
        for(let i in this.MargeLibre)
        {
            output.write(this.MargeLibre[i].poid + " | ")
        }
        output.write("\n\nMarge Total :\nSommet | ")
        for(let i in this.MargeTotal)
        {
            output.write(this.MargeTotal[i].sommet + " | ")
        }
        output.write("\nPoid | ")
        for(let i in this.MargeTotal)
        {
            output.write(this.MargeTotal[i].poid + " | ")
        }
        output.write("\n")
        output.end
    }
}