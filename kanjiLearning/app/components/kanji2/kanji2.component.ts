import { Component, OnInit } from '@angular/core';
import Kanji from '../../../assets/kanji2.json';
import { KanjiLearningBddService } from '../../services/kanji-learning-bdd.service';

@Component({
  selector: 'app-kanji2',
  templateUrl: './kanji2.component.html',
  styleUrl: './kanji2.component.css'
})
export class KanjiComponent2 implements OnInit {
  kanji: {japaneseK:string, japaneseA:string, japaneseR:string, traductionF:string, traductionE:string}[] = [];
  
  valueWriteJ:string = "";

  valueDisplay:string = "";
  valueDisplayA:string = "";
  valueDisplayR:string = "";
  valueDisplayRep:string = "";
  valueDisplayTraductionE:string = "";
  
  tab: number[] = [];

  time: number = 1000;
  pause: boolean = false;

  count:number = 0;
  error:number = 0;
  constructor(private KLBService: KanjiLearningBddService) {
    this.initialisation();
    this.KLBService.getKanji().subscribe(
      (response) => {
        this.kanji = response;
        this.getKanji();
      },
      (error) => {
        console.error('Erreur lors de la requête:', error);
      }
    );
    
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
    this.valueDisplayTraductionE = this.kanji[alea].traductionE;
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
    if(this.pause == false){
      this.pause = true;
      if(this.verif()){
        setTimeout(() => {
          this.resetDisplay();
          this.pause = false;
        }, this.time);
      }
      else{
        setTimeout(() => {
          this.resetDisplay();
          this.pause = false;
        }, 500);
      }
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
    if(this.valueWriteJ.toLowerCase() == "help" || this.valueWriteJ.toLowerCase() == ""){
      this.error++;
      this.valueDisplayRep = this.valueDisplayA.toString();
      this.time = 5000;
      return true;
    }

    if((this.valueDisplayA == this.valueWriteJ.toLowerCase()) || (this.valueDisplayR == this.valueWriteJ.toLowerCase())){
      this.count++;     
        this.valueDisplayRep = this.valueDisplayTraductionE
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
  }

}


// let valueJ;
// let valueR;
// if((valueJ = this.valueDisplayA.indexOf(this.valueWriteJ.toLowerCase())) != -1 || (valueR = this.valueDisplayR.indexOf(this.valueWriteJ.toLowerCase())) != -1){
//   this.count++;
//   if(valueR != -1)        
//     this.valueDisplayRep = this.valueDisplayTraductionE[valueR!]
//   else
//     this.valueDisplayRep = this.valueDisplayTraductionE[valueJ]
//   return true;
// }