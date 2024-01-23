export class Arc{
    public origin: string;
    public but: string;
    public poids: number;

    constructor(s : string = "?", d : string = "?", p : number = 0)
    {
        this.origin = s;
        this.but = d;
        this.poids = p;
    }
}