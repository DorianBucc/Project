import { Component, OnInit } from '@angular/core';
import Hirigana from '../../../assets/hirigana.json';

export interface hiriganaType {
  lettre:string
  conso: string;
  K: string;
  S: string;
  T: string;
  N: string;
  H: string;
  M: string;
  Y: string;
  R: string;
  W: string;
}

const DATA: hiriganaType[] = [
  {lettre:"a",conso:"あ",K:"か",S:"さ",T:"た",N:"な",H:"は",M:"ま",Y:"や",R:"ら",W:"わ"},
  {lettre:"i",conso:"い",K:"き",S:"し",T:"ち",N:"に",H:"ひ",M:"み",Y:"",R:"り",W:""},
  {lettre:"u",conso:"う",K:"く",S:"す",T:"つ",N:"ぬ",H:"ふ",M:"む",Y:"ゆ",R:"る",W:""},
  {lettre:"e",conso:"え",K:"け",S:"せ",T:"て",N:"ね",H:"へ",M:"め",Y:"",R:"れ",W:""},
  {lettre:"o",conso:"お",K:"こ",S:"そ",T:"と",N:"の",H:"ほ",M:"も",Y:"よ",R:"ろ",W:"を"},
  {lettre:"n",conso:"ん",K:"",S:"",T:"",N:"",H:"",M:"",Y:"",R:"",W:""},
];

@Component({
  selector: 'app-hirigana',
  templateUrl: './hirigana.component.html',
  styleUrl: './hirigana.component.css',
})
export class HiriganaComponent {
  displayedColumns: string[] = ["lettre","conso","K","S","T","N","H","M","Y","R","W"];
  dataSource = DATA;
  hirigana: {japanese:string, english:string}[] = [];
  
  valueWrite:string = "";
  valueDisplay:string = "";

  tab: number[] = [];

  count:number = 0;
  error:number = 0;
  constructor() {
    this.hirigana = Hirigana;
    this.getHiriganaAlea();
    this.initialisation();
  }
  
  getHiriganaAlea(){
    if(this.hirigana.length > 0){
      let alea = 1;
      do{
        alea = Math.floor(Math.random() * this.hirigana.length);
        
      }while(this.contain(this.tab,alea) == true);
      this.tab.push(alea);
      this.valueDisplay = this.hirigana[alea].japanese.toString();
      if(this.tab.length == this.hirigana.length){
        this.terminer();
      }
    }
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
      if(this.verif(val.toLowerCase())){
        this.getHiriganaAlea();
        this.valueWrite = "";
      }else if(val.length > 2){
        this.valueWrite = "";
      }
  }
  verif(val:string):boolean{
    let result = false;
    let i = 0;
    this.hirigana.forEach(element => {
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
    if(this.tab.length == this.hirigana.length){
      this.terminer();
    }
    return result;
  }

  terminer(){
    alert("Vous avez terminer avec " + this.error + " erreur.");
    this.initialisation();
  }


  initialisation(){
    while (this.tab.length > 0) {
      this.tab.pop();
    }
    this.count = 0;
    this.error = 0;
  }

}
