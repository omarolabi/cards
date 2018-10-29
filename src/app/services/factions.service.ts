import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FactionModel } from '../models/faction.model';

@Injectable()
export class FactionsService {

  constructor(
    private http: HttpClient
  ) { }

  private configUrl = './assets/json/factions.json';

  public getFactions(): Observable<FactionModel[]> {
    return this.http.get<FactionModel[]>(this.configUrl);
  }
}
