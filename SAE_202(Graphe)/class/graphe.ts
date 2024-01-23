export class Graphe{
    public nbSommets: number;
    public nbArcs: number;
    public listeSommet: Array<string>;
    public graph : string;

    constructor(graph = ""){
        this.graph = graph;
        this.listeSommet = new Array<string>;
        this.nbSommets = 0;
        this.nbArcs = 0;
    }
}


