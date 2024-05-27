import { Component, OnInit } from '@angular/core';
import { KanjiLearningBddService } from '../../services/kanji-learning/kanji-learning-bdd.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.css'
})
export class KanjiComponent implements OnInit {

  kanji: {japaneseK:string, japaneseA:string, japaneseR:string, traductionF:string, traductionE:string}[] = [];

  length = 50;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent!: PageEvent;  

  constructor(private KLBService: KanjiLearningBddService) {
    this.initialisation();
    this.KLBService.getKanji().subscribe(
      (response) => {
        this.kanji = response;
        this.getKanji();
        this.length = this.kanji.length;
      },
      (error) => {
        console.error('Erreur lors de la requête:', error);
      }
    );
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  ngOnInit() {}

//Quiz General

  valueWriteJ:string = "";

  valueDisplay:string = "";
  valueDisplayAlphabetJ:string = "";
  valueDisplayRoman:string = "";
  valueDisplayTraductionF:string = "";
  valueDisplayTraductionE:string = "";
  valueDisplayRep:string = "";


  tab: number[] = [];

  time: number = 1000;
  pause: boolean = false;

  mode:string = "P";

  count:number = 0;
  error:number = 0;

  getKanji(){
    this.valueWriteJ = "";
    let alea = 1;
    do{
      alea = Math.floor(Math.random() * this.kanji.length);
      
    }while(this.contain(this.tab,alea) == true);
    this.tab.push(alea);
    this.valueDisplay = this.kanji[alea].japaneseK;
    this.valueDisplayAlphabetJ = this.kanji[alea].japaneseA;
    this.valueDisplayRoman = this.kanji[alea].japaneseR;
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

  resetDisplay(){
    this.valueDisplayRep = "";
    this.getKanji();
  }

  initialisation(){
    while (this.tab.length > 0) {
      this.tab.pop();
    }
  }
  restart(){
    this.initialisation()
    this.count = 0;
    this.error = 0;
  }
  onKeyDownEvent(valueJapan:string){
    this.valueWriteJ = valueJapan; 
    if(this.pause == false){
      this.pause = true;
      if(this.mode == "P"){
        if(this.verifPrononciation()){
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
      else if(this.mode == "S"){
          if(this.verifSignification()){
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
  }

  verifPrononciation() : boolean {
    if(this.tab.length == this.kanji.length){
      this.initialisation();
    }
    if(this.valueWriteJ.toLowerCase() == "help" || this.valueWriteJ.toLowerCase() == ""){
      this.error++;
      this.valueDisplayRep = this.valueDisplayAlphabetJ.toString();
      this.time = 5000;
      return true;
    }

    if((this.valueDisplayAlphabetJ == this.valueWriteJ.toLowerCase()) || (this.valueDisplayRoman == this.valueWriteJ.toLowerCase())){
      this.count++;     
        this.valueDisplayRep = this.valueDisplayTraductionE
      return true;
    }
    this.error++;
    return false;
  }

  verifSignification() : boolean {
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
    return false;
  }
  
}
