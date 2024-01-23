import{GrapheOriente} from "./grapheoriente"
import { InfoBell } from "./infobell";
import { InfoBellbis } from "./infobellbis";

export class DAG extends GrapheOriente {
    public TabInfo : Array<InfoBell>
    public TabInfobis : Array<InfoBellbis>
    constructor(graph = ""){
        super(graph);
        this.TabInfo = new Array<InfoBell>;
        this.TabInfobis = new Array<InfoBellbis>;
    }

    triTopologique() : void {
        let ok : boolean;
        let ok1 : boolean;
        this.listeSommet = new Array<string>
        for(let i = 0; i < this.nbArcs ; i++)
        {
            ok = true;
            ok1 = true;
            for(let y = 0; y < this.listeSommet.length ; y++){
                if(this.TabArc[i].origin === this.listeSommet[y]){
                    ok = false;
                }
                if(this.TabArc[i].but === this.listeSommet[y]){
                    ok1 = false;
                }
                for(let a = i+1; a < this.nbArcs ; a++)
                {
                    if(this.TabArc[i].but === this.TabArc[a].but){
                        ok1 = false;
                    }
                }
            }
            if(ok === true){
                this.listeSommet.push(this.TabArc[i].origin)
            }
            if(ok1 === true){
                this.listeSommet.push(this.TabArc[i].but)
            }
        }
        this.nbSommets = this.listeSommet.length
    }
    
}
