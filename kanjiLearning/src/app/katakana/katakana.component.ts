import { Component, OnInit } from '@angular/core';
import Katakana from '../../assets/katakana.json';

@Component({
  selector: 'app-katakana',
  templateUrl: './katakana.component.html',
  styleUrl: './katakana.component.css'
})
export class KatakanaComponent implements OnInit{
  katakana: {japanese:string, english:string}[] = [];
  
  valueWrite:string = "";
  valueDisplay:string = "";

  tab: number[] = [];

  count:number = 0;
  error:number = 0;
  constructor() {
    //this.content = SampleJson;
    this.initialisation();
    this.katakana = Katakana;
    this.getkatakanaAlea();
  }

  getkatakanaAlea(){
    let alea = 1;
    do{
      alea = Math.floor(Math.random() * this.katakana.length);
      
    }while(this.contain(this.tab,alea) == true);
    this.tab.push(alea);
    this.valueDisplay = this.katakana[alea].japanese;
  }
  
  contain(tab:number[],val:number): boolean{
    for (let index = 0; index < tab.length; index++) {
      const element = tab[index];
      if(element == val){
        return true;
      }
    }
    return false;
  }

  onKeyPress(val : string){
      if(this.verif(val)){
        this.getkatakanaAlea();
        this.valueWrite = "";
      }else if(val.length > 2){
        this.valueWrite = "";
      }
  }
  verif(val:string):boolean{
    let result = false;
    let i = 0;
    this.katakana.forEach(element => {
      if(element.english == val && element.japanese == this.valueDisplay){
        result = true;
        this.count++;
      }
      else if(element.english == val && element.japanese != this.valueDisplay && val != "n"){
        result = true;
        this.error++;
      }
      i++;
    });
    if(this.tab.length == this.katakana.length){
      alert("Vous avez terminer avec " + this.error + " erreur.");
      this.initialisation();
    }
    return result;
  }
  ngOnInit() {}



  initialisation(){
    while (this.tab.length > 0) {
      this.tab.pop();
    }
    this.count = 0;
    this.error = 0;
  }
}
