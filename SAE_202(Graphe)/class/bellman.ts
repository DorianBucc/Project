import { createWriteStream } from "fs";
import { DAG } from "./dag";
import { InfoBell } from "./infobell";
import { InfoBellbis } from "./infobellbis";


export class BellMan{
    public p : DAG
    constructor(dag: DAG){
        this.p = dag;
        
    }

    arborescence(config: number, source : string) : Array<InfoBell>{
        this.p.triTopologique();
        this.p.TabInfo = new Array<InfoBell>;
        let inverse: number;
        if(config === 1){
            inverse = -Infinity;
        }
        else {
            inverse = Infinity
        }
        for(let i = 0; i < this.p.nbSommets; i++){            
            if(this.p.listeSommet[0] === source){
                this.p.TabInfo.push(new InfoBell(source, "none", 0))
            }
            else{
                this.p.TabInfo.push(new InfoBell(this.p.listeSommet[0], this.p.listeSommet[0], inverse))
                for(let y = 0; y < this.p.TabArc.length ; y++){
                    for(let b = 0 ; b < this.p.TabInfo.length ; b++){
                        if(this.p.TabInfo[b].sommet === this.p.TabArc[y].origin){
                            if(
                                (this.p.TabArc[y].but === this.p.TabInfo[i].sommet && this.p.TabInfo[i].poid < (this.p.TabArc[y].poids + this.p.TabInfo[b].poid) && config === 1) ||
                                (this.p.TabArc[y].but === this.p.TabInfo[i].sommet && this.p.TabInfo[i].poid > (this.p.TabArc[y].poids + this.p.TabInfo[b].poid) && config !== 1)
                                )
                            {
                                this.p.TabInfo[i].poid = this.p.TabArc[y].poids + this.p.TabInfo[b].poid;
                                this.p.TabInfo[i].pere = this.p.TabInfo[b].sommet;
                                break
                            }
                        }
                    }
                }
            }

            this.p.listeSommet.splice(0,1)
        }
        
        return this.p.TabInfo
    }

    antiarborescence(config: number, source : string) : Array<InfoBellbis>{
        this.p.triTopologique();
        this.p.TabInfobis = new Array<InfoBellbis>;
        let inverse: number;
        if(config === 1){
            inverse = -Infinity;
        }
        else {
            inverse = Infinity
        }
        for(let i = 0; i < this.p.nbSommets; i++){            
            if(this.p.listeSommet[this.p.listeSommet.length-1] === source){
                this.p.TabInfobis.push(new InfoBellbis(source, "none", 0))

            }
            else{
                this.p.TabInfobis.push(new InfoBellbis(this.p.listeSommet[this.p.listeSommet.length-1], this.p.listeSommet[this.p.listeSommet.length-1], inverse))
                for(let y = 0; y < this.p.TabArc.length ; y++){
                    for(let b = 0 ; b < this.p.TabInfobis.length ; b++){
                        if(this.p.TabInfobis[b].sommet === this.p.TabArc[y].but){
                            if(
                                (this.p.TabArc[y].origin === this.p.TabInfobis[i].sommet && this.p.TabInfobis[i].poid < (this.p.TabArc[y].poids + this.p.TabInfobis[b].poid) && config === 1) ||
                                (this.p.TabArc[y].origin === this.p.TabInfobis[i].sommet && this.p.TabInfobis[i].poid > (this.p.TabArc[y].poids + this.p.TabInfobis[b].poid) && config !== 1)
                                )
                            {
                                this.p.TabInfobis[i].poid = this.p.TabArc[y].poids + this.p.TabInfobis[b].poid;
                                this.p.TabInfobis[i].fils = this.p.TabInfobis[b].sommet;
                                break
                            }
                        }
                    }
                }
            }
            this.p.listeSommet.splice(this.p.listeSommet.length-1,1)
        }

        
        return this.p.TabInfobis
    }
    saveArb(source : string , repertoire = "./",config = 0){
        let output = createWriteStream(repertoire+"DAG_"+this.p.nbSommets.toString()+".txt", "utf8")
        let x = this.arborescence(config, source)
        output.write("\nArborescence :\n\nSommet | ")
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
        output.write("\n")

        output.end
    }
    saveAnt(source : string , repertoire = "./",config = 0){
        let output = createWriteStream(repertoire+"DAG_"+this.p.nbSommets.toString()+".txt", "utf8")
        let y = this.antiarborescence(config, source)
        output.write("\nAnti-Arborescence :\n\nSommet | ")
        for (let i = 0; i < y.length ; i++) {
            output.write(y[i].sommet + " | ")
        }
        output.write("\nFils | ")
        for (let i = 0; i < y.length ; i++) {
            output.write(y[i].fils + " | ")
        }
        output.write("\nPoids | ")
        for (let i = 0; i < y.length ; i++) {
            if(y[i].poid !== Infinity){
            output.write(y[i].poid + " | ")
            }
            else
            {
                output.write("∞ | ")
                
            }
        }
        output.write("\n")

        output.end
    }
}