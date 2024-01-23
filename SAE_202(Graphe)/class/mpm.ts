import{Arc} from "./arc"
import { infoS } from "./infos"
import { DAG } from "./dag"

export class MPM extends DAG {
    public maxTime : number
    public tabsommet : Array<infoS>
    public tachesCritique : Array<string>
    
    constructor(graph = ""){
        super(graph)
        this.maxTime = 0
        this.tabsommet = this.listeSommets();
        this.tachesCritique = new Array<string>
    }

    init(){
        let lineGraph = this.graph.split("\n");

        for (let i = 1; i < lineGraph.length-1 ; i++) {

            let tab = lineGraph[i].split(" ");
            
            if(tab[2] === undefined && tab[0] !== undefined){
                this.TabArc.push(new Arc("Début", tab[0], 0) );
                this.nbArcs++;
            }
        }

        let tabsommet = this.listeSommets()

        for (let i = 1; i < lineGraph.length-1; i++) {
            let tab = lineGraph[i].split(" ");
            for(let y = 2; y < tab.length; y++){

                for(let a = 0; a < tabsommet.length ; a++){
                    if(tab[y] === tabsommet[a].sommet){
                        this.TabArc.push(new Arc(tab[y], tab[0], tabsommet[a].poid) );
                        this.nbArcs++;
                    }
                }
            }
        }
        for (let i = 0; i < tabsommet.length ; i++) {
            let ok = true
            for(let y = 0; y < this.TabArc.length ; y++){
                if(this.TabArc[y].origin === tabsommet[i].sommet){
                    ok = false
                }
            }
            if(ok === true){
                this.TabArc.push(new Arc(tabsommet[i].sommet, "Fin", tabsommet[i].poid))
                this.nbArcs++
            }
        }
    }

    listeSommets(){
        let tab: Array<string>
        let tabsommet = new Array<infoS>;
        let lineGraph = this.graph.split("\n");
        this.nbSommets = parseInt(lineGraph[0]);
        tabsommet.push(new infoS("Début",0))
        for (let i = 1; i < lineGraph.length-1 ; i++) {

            tab = lineGraph[i].split(" ");
            tabsommet.push(new infoS(tab[0],parseInt(tab[1])))

        }
        return tabsommet
        
    }

}