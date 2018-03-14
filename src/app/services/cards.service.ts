import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CardModel } from '../models/card.model';
import 'rxjs/add/operator/map';

@Injectable()
export class CardsService {

  constructor(
    private http: HttpClient
  ) { }

  private configUrl = './assets/json/cards.json';

  public getCards(): Observable<CardModel[]> {
    return this.http.get<CardModel[]>(this.configUrl);
  }

  public getCard(number): Observable<CardModel> {
    return this.http.get<CardModel[]>(this.configUrl)
    .map(cards => cards.find(card => card.number === number));
  }
}
