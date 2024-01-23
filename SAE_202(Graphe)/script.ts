import { readFileSync, createWriteStream } from "fs";
import{DAG} from "./class/dag"
import { AlgoMPM } from "./class/algompm";
import { BellMan } from "./class/bellman";


let graph = readFileSync('./GR/dag_10_1.gr', "utf8");

let graph2 = readFileSync('./MPM/graphe_10_1.mpm', "utf8");

let p = new DAG(graph);
let b = new BellMan(p)
b.saveAnt("8")

let m = new AlgoMPM(graph2);
m.saveAnt();
