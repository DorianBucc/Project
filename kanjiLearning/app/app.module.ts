import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
// import { appRoutingModule } from './app.routing';
import { HiriganaComponent } from './components/hirigana/hirigana.component';
import { KatakanaComponent } from './components/katakana/katakana.component';
import { KanjiComponent } from './components/kanji/kanji.component';
import { KanjiComponent2 } from './components/kanji2/kanji2.component';
import { KanjiComponent3 } from './components/kanji3/kanji3.component';
import { CoursComponent } from './components/cours/cours.component';
import { AppRoutingModule } from './app-routing.module';
import { ConnexionComponent } from './components/connexion/connexion.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    HiriganaComponent,
    KatakanaComponent,
    KanjiComponent,
    KanjiComponent2,
    KanjiComponent3,
    CoursComponent,
    ConnexionComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
