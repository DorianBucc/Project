import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public nav =[
    {"titre":"Hirigana","route":"hirigana"},
    {"titre":"Katakana","route":"katakana"},
    {"titre":"Kanji","route":"kanji"},
    // {"titre":"Kanji2","route":"kanji2"},
    // {"titre":"Kanji3","route":"kanji3"},
    {"titre":"Cours","route":"cours"},
  ]
  public isConnect = 0;
  constructor(){}
}
