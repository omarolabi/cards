import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactionModel } from '../models/faction.model';
import { SeasonModel } from '../models/season.model';
import { CardModel } from '../models/card.model';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class CardsService {

  constructor(
    private db: AngularFirestore
  ) { }

  public getFactions(): Observable<FactionModel[]> {
    return this.db.collection<FactionModel>('factions').valueChanges();
  }

  public getSeasons(): Observable<SeasonModel[]> {
    return this.db.collection<SeasonModel>('seasons').valueChanges();
  }

  public getCards(): Observable<CardModel[]> {
    return this.db.collection<CardModel>('cards').valueChanges();
  }

}
