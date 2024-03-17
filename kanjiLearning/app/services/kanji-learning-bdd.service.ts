import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DNS } from '../environnement/const';

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
  public connexion(user:string,password:string): Observable<any[]>{
    return this.http.get<any[]>(DNS+'?v=connecte&u='+user+'&p='+password);
  }
  public getKanji(): Observable<any[]> {
    // return this.http.get<any[]>('http://92.138.70.173:8050/?v=kanji');
    return this.http.get<any[]>(DNS+'?v=kanji');
  }
}