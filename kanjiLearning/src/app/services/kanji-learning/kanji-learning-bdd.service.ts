import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { DNS } from '../../environnement/const';
import { Kanji } from '../../environnement/kanji';
import { CoursDocument } from '../../environnement/coursdocument';

@Injectable({
  providedIn: 'root'
})
export class KanjiLearningBddService {
  constructor(private http: HttpClient) {}

  // public getHirigana(): Observable<any[]> {
  //   return this.http.get<any[]>('http://92.138.70.173:8050/?v=hirigana');
  // }
  // public getKatakana(): Observable<any[]> {
  //   return this.http.get<any[]>('http://92.138.70.173:8050/?v=katakana');
  // }
  // public connexion(user:string,password:string): Observable<any[]>{
  //   return this.http.get<any[]>(DNS+'?v=connecte&u='+user+'&p='+password);
  // }
  public getCours(): Observable<CoursDocument>{
    // return of(CoursJson);
    return this.http.get<CoursDocument>(DNS+'?v=cours');
  }
  public getKanji(): Observable<Kanji[]> {
    // return of(KanjiJson);
    return this.http.get<Kanji[]>(DNS+'?v=kanji');
  }
}