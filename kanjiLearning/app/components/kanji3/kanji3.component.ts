import { Component, OnInit } from '@angular/core';
import Kanji from '../../../assets/kanji2.json';
import { KanjiLearningBddService } from '../../services/kanji-learning-bdd.service';

@Component({
  selector: 'app-kanji3',
  templateUrl: './kanji3.component.html',
  styleUrl: './kanji3.component.css'
})
export class KanjiComponent3 implements OnInit {
  kanji: {japaneseK:string, japaneseA:string, japaneseR:string, traductionF:string, traductionE:string}[] = [];
  
  valueWriteJ:string = "";

  valueDisplay:string = "";
  valueDisplayAlphabetJ:string = "";
  valueDisplayRep:string = "";
  valueDisplayTraductionF:string = "";
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
    this.valueDisplayAlphabetJ = this.kanji[alea].japaneseA;
    this.valueDisplayTraductionF = this.kanji[alea].traductionF;
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
      this.valueDisplayRep = this.valueDisplayAlphabetJ;
      this.time = 5000;
      return true;
    }
    if((this.valueDisplayTraductionF == this.valueWriteJ.toLowerCase()) || (this.valueDisplayTraductionE == this.valueWriteJ.toLowerCase())){
      this.count++;
      this.valueDisplayRep = this.valueDisplayAlphabetJ
      return true;
    }
    this.error++;
    //this.getKanji();
    return false;
  }

  ngOnInit() {}

  initialisation(){
    while (this.tab.length > 0) {
      this.tab.pop();
    }
  }

}

// if((valueF = this.valueDisplayTraductionF.indexOf(this.valueWriteJ.toLowerCase())) != -1 || (valueE = this.valueDisplayTraductionE.indexOf(this.valueWriteJ.toLowerCase())) != -1){
//   this.count++;
//   let value;
//   if(valueF != -1)
//     this.valueDisplayRep = [this.valueDisplayAlphabetJ[valueF]]
//   else
//     this.valueDisplayRep = [this.valueDisplayAlphabetJ[valueE!]]
//   return true;
// }