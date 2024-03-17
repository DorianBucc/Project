import { Component } from '@angular/core';
import { KanjiLearningBddService } from '../../services/kanji-learning-bdd.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent {
  tab:string = "";
  constructor(private KLBService: KanjiLearningBddService) {
  }
  
  ngOnInit():void{
    // this.KLBService.getHirigana().subscribe(
    //   (response) => {
    //     // Traitement des données en cas de succès
    //     console.log('Réponse de l\'API:', response);
    //     this.tab = response[0].japanese.toString();
    //   },
    //   (error) => {
    //     // Gestion des erreurs
    //     console.error('Erreur lors de la requête:', error);
    //   }
    // );
  }
}
