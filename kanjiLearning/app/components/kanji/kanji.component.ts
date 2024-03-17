import { Component, OnInit } from '@angular/core';
import { KanjiLearningBddService } from '../../services/kanji-learning-bdd.service';
@Component({
  selector: 'app-kanji',
  templateUrl: './kanji.component.html',
  styleUrl: './kanji.component.css'
})
export class KanjiComponent implements OnInit {
  kanji: {japaneseK:string, japaneseA:string, japaneseR:string, traductionF:string, traductionE:string}[] = [];
  
  valueD:string[] = [];
  curseur:number = 0;
  multi:number = 5;
  
  constructor(private KLBService: KanjiLearningBddService) {
    // this.kanji = Kanji;
    this.KLBService.getKanji().subscribe(
      (response) => {
        this.kanji = response;
        this.displayKanji();
      },
      (error) => {
        console.error('Erreur lors de la requête:', error);
      }
    );
  }

  displayKanji(){
    if(this.curseur*this.multi < this.kanji.length){
      for (let i = 0; i < this.multi*3; i++) {
        if(this.curseur*this.multi+i < this.kanji.length){
          this.valueD[i*3] = this.kanji[this.curseur*this.multi+i].japaneseK; 
          this.valueD[i*3+1] = this.kanji[this.curseur*this.multi+i].japaneseA;
          this.valueD[i*3+2] = this.kanji[this.curseur*this.multi+i].traductionE;
        }
        else{
          this.valueD[i*3] = "";
          this.valueD[i*3+1] = "";
          this.valueD[i*3+2] = "";
        }
      }
    }
    
  }

  onBack(){
    if(this.curseur != 0)
      this.curseur--;
    this.displayKanji();
  }
  onNext(){
    if((this.curseur+1)*this.multi < this.kanji.length)
      this.curseur++;
    this.displayKanji();
  }

  ngOnInit() {}


}
