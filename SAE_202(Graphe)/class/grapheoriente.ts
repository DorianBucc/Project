import { Arc } from "./arc";
import { Graphe } from "./graphe";
import { createWriteStream } from "fs";

export class GrapheOriente extends Graphe {
    public TabArc : Array<Arc>;
    
    constructor(graph = ""){
        super(graph);        
        this.TabArc = new Array<Arc>;       
        
        this.init(); 
    }

    init(){
        let lineGraph = this.graph.split("\n");
        let tab = lineGraph[0].split(" ");
        this.nbSommets = parseInt(tab[0]);
        this.nbArcs = parseInt(tab[1]);

        for (let i = 1; i < lineGraph.length-1; i++) {
            tab = lineGraph[i].split(" ");
            this.TabArc.push(new Arc(tab[0], tab[1], parseInt(tab[2])) );           
        }
    }
    
    Affiche()
    {
        console.log(this.TabArc)
        console.log(this.nbSommets + " " + this.nbArcs);
        for (let i = 0; i < this.TabArc.length; i++) {
            console.log(this.TabArc[i].origin + " -> " + this.TabArc[i].but + " : " + this.TabArc[i].poids)
        }
    }
    save(repertoire = "./"){
        let output = createWriteStream(repertoire+"GrapheOriente_"+this.nbSommets.toString()+".gr", "utf8")
        
        output.write(this.nbSommets.toString() + " " + this.nbArcs.toString()+ "\n");
        for (let i = 0; i < this.TabArc.length; i++) {
            output.write(this.TabArc[i].origin + " -> " + this.TabArc[i].but + " : " + this.TabArc[i].poids.toString()+"\n")
        }

        output.end()
    }
}