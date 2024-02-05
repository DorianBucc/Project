import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { Content1Component } from './content1/content1.component';
import { appRoutingModule } from './app.routing';
import { HiriganaComponent } from './hirigana/hirigana.component';
import { KatakanaComponent } from './katakana/katakana.component';
import { KanjiComponent } from './kanji/kanji.component';
import { Content2Component } from './content2/content2.component';
import { Content3Component } from './content3/content3.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    HeaderComponent,
    Content1Component,
    HiriganaComponent,
    KatakanaComponent,
    KanjiComponent,
    Content2Component,
    Content3Component
  ],
  imports: [
    FormsModule,
    BrowserModule,
    //AppRoutingModule,
    appRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
