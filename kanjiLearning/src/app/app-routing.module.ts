import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContentComponent } from './components/content/content.component';
import { HiriganaComponent } from './components/hirigana/hirigana.component';
import { KatakanaComponent } from './components/katakana/katakana.component';
import { KanjiComponent } from './components/kanji/kanji.component';
import { CoursComponent } from './components/cours/cours.component';

const routes: Routes = [
    { path: '', component: ContentComponent },
    { path: 'hirigana', component: HiriganaComponent },
    { path: 'katakana', component: KatakanaComponent },
    { path: 'kanji', component: KanjiComponent },
    { path: 'cours', component: CoursComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }