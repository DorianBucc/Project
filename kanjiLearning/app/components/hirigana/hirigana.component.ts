import { Component, OnInit } from '@angular/core';
// import { KanjiLearningBddService } from '../../services/kanji-learning-bdd.service';
import Hirigana from '../../../assets/hirigana.json';

@Component({
  selector: 'app-hirigana',
  templateUrl: './hirigana.component.html',
  styleUrl: './hirigana.component.css'
})
export class HiriganaComponent {
  hirigana: {japanese:string, english:string}[] = [];
  
  valueWrite:string = "";
  valueDisplay:string = "";

  tab: number[] = [];

  count:number = 0;
  error:number = 0;
  constructor() { // private KLBService: KanjiLearningBddService
    // this.KLBService.getHirigana().subscribe(
    //   (response) => {
    //     this.hirigana = response;
    //     this.getHiriganaAlea();
    //     this.initialisation();
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la requête:', error);
    //   }
    // );
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
      // alert("Vous avez terminer avec " + this.error + " erreur.");
      // // setTimeout(() => {
      //   this.initialisation();
      // // },1000)
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
