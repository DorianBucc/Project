import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './components/content/content.component';
import { HiriganaComponent } from './components/hirigana/hirigana.component';
import { KatakanaComponent } from './components/katakana/katakana.component';
import { KanjiComponent } from './components/kanji/kanji.component';
import { KanjiComponent2 } from './components/kanji2/kanji2.component';
import { KanjiComponent3 } from './components/kanji3/kanji3.component';
import { CoursComponent } from './components/cours/cours.component';
import { ConnexionComponent } from './components/connexion/connexion.component';

const routes: Routes = [
    { path: '', component: ContentComponent },
    { path: 'hirigana', component: HiriganaComponent },
    { path: 'katakana', component: KatakanaComponent },
    { path: 'kanji', component: KanjiComponent },
    { path: 'kanji2', component: KanjiComponent2 },
    { path: 'kanji3', component: KanjiComponent3 },
    { path: 'cours', component: CoursComponent },
    { path: 'connexion', component: ConnexionComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }