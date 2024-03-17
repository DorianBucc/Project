import { Component, OnInit } from '@angular/core';
import { KanjiLearningBddService } from '../../services/kanji-learning-bdd.service';
import { ConnexionService } from '../../services/connexion.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.css'
})
export class ConnexionComponent implements OnInit{
  public user = "";
  public password = "";

  constructor(private KLBService: KanjiLearningBddService,private dataConnexion:ConnexionService) {}
  

  ngOnInit(){}

  onClickSend(){
    // console.log(this.user);
    let pass = this.password;
    this.KLBService.connexion(this.user,pass).subscribe(
      (response) => {
        console.log(response);
        if(response.toString() == "success"){
          this.dataConnexion.setConnection(1);
        }
      },
      (error) => {
        console.error('Erreur lors de la requête:', error);
      }
    );

  }
}
