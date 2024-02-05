import { Component, OnInit } from '@angular/core';
import Kanji from '../../assets/kanji.json';

@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.css'
})
export class KanjiComponent implements OnInit {
  kanji: {japaneseK:string, japaneseA:string, japaneseR:string, traduction:string}[] = [];
  
  valueWriteJ:string = "";

  valueDisplay:string = "";
  valueDisplayA:string = "";
  valueDisplayR:string = "";
  valueDisplayRep:string = "";
  valueDisplayTraduction:string = "";
  
  tab: number[] = [];

  time: number = 1000;

  count:number = 0;
  error:number = 0;
  constructor() {
    //this.content = SampleJson;
    this.initialisation();
    this.kanji = Kanji;
    this.getKanji();
  }
  
  getKanji(){
    this.valueWriteJ = "";
    let alea = 1;
    do{
      alea = Math.floor(Math.random() * this.kanji.length);
      
    }while(this.contain(this.tab,alea) == true);
    this.tab.push(alea);
    this.valueDisplay = this.kanji[alea].japaneseK;
    this.valueDisplayA = this.kanji[alea].japaneseA;
    this.valueDisplayR = this.kanji[alea].japaneseR;
    this.valueDisplayTraduction = this.kanji[alea].traduction;
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
  onKeyDownEvent(valueJapan:string){
    this.valueWriteJ = valueJapan; 
    
    if(this.verif()){
      setTimeout(() => this.resetDisplay(), this.time);
      this.time = 1000;  
    }
    
  }

  resetDisplay(){
    this.valueDisplayRep = "";
    this.getKanji();
  }

  verif() : boolean {
    if(this.tab.length == this.kanji.length){
      this.initialisation();
    }
    if(this.valueWriteJ.toLowerCase() == "help"){
      this.error++;
      this.valueDisplayRep = this.valueDisplayA;
      this.time = 5000;
      return true;
    }
    if(this.valueDisplayA == this.valueWriteJ || this.valueDisplayR == this.valueWriteJ){
      this.count++;
      this.valueDisplayRep = this.valueDisplayTraduction;
      return true;
    }
    this.error++;
    this.getKanji();
    return false;
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
