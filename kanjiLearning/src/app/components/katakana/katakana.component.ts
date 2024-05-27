import { Component, OnInit } from '@angular/core';
import Katakana from '../../../assets/katakana.json';

export interface katakanaType {
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

const DATA: katakanaType[] = [
  {lettre:"a",conso:"ア",K:"カ",S:"サ",T:"タ",N:"ナ",H:"ハ",M:"マ",Y:"ヤ",R:"ラ",W:"ワ"},
  {lettre:"i",conso:"イ",K:"キ",S:"シ",T:"チ",N:"ニ",H:"ヒ",M:"ミ",Y:"",R:"リ",W:""},
  {lettre:"u",conso:"ウ",K:"ク",S:"ス",T:"ツ",N:"ヌ",H:"フ",M:"ム",Y:"ユ",R:"ル",W:""},
  {lettre:"e",conso:"エ",K:"ケ",S:"セ",T:"テ",N:"ネ",H:"ヘ",M:"メ",Y:"",R:"レ",W:""},
  {lettre:"o",conso:"オ",K:"コ",S:"ソ",T:"ト",N:"ノ",H:"ホ",M:"モ",Y:"ヨ",R:"ロ",W:"ヲ"},
  {lettre:"n",conso:"ン",K:"",S:"",T:"",N:"",H:"",M:"",Y:"",R:"",W:""},
];

@Component({
  selector: 'app-katakana',
  templateUrl: './katakana.component.html',
  styleUrl: './katakana.component.css'
})
export class KatakanaComponent{
  displayedColumns: string[] = ["lettre","conso","K","S","T","N","H","M","Y","R","W"];
  dataSource = DATA;
  katakana: {japanese:string, english:string}[] = [];
  
  valueWrite:string = "";
  valueDisplay:string = "";

  tab: number[] = [];

  count:number = 0;
  error:number = 0;
  constructor() { // private KLBService: KanjiLearningBddService
    // this.KLBService.getKatakana().subscribe(
    //   (response) => {
    //     this.katakana = response;
    //     this.getkatakanaAlea();
    //     this.initialisation();
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la requête:', error);
    //   }
    // );
    this.katakana = Katakana;
    this.getkatakanaAlea();
    this.initialisation();
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
      if(this.verif(val.toLowerCase())){
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


  initialisation(){
    while (this.tab.length > 0) {
      this.tab.pop();
    }
    this.count = 0;
    this.error = 0;
  }
}
