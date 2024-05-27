import { Component } from '@angular/core';
import { KanjiLearningBddService } from '../../services/kanji-learning/kanji-learning-bdd.service';
import { Cours } from '../../environnement/cours';
import { CoursDocument } from '../../environnement/coursdocument';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent {
  coursJS : Cours[] = [];
  source : string[] = [];
  Annexe:string[]=[];
  tab:string = "";
  constructor(private KLBService: KanjiLearningBddService) {
    this.KLBService.getCours().subscribe(
      (response) => {
        this.coursJS = response.cours;
        this.source = response.source;
        this.coursJS.forEach((ele) => ele.annexe.forEach((el) => this.Annexe.push(el)));
      },
      (error) => {
        console.error('Erreur lors de la requête:', error);
      });
  }
  
  ngOnInit():void{}
}
