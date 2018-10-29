import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeasonModel } from '../models/season.model';

@Injectable()
export class SeasonsService {

  constructor(
    private http: HttpClient
  ) { }

  private configUrl = './assets/json/seasons.json';

  public getSeasons(): Observable<SeasonModel[]> {
    return this.http.get<SeasonModel[]>(this.configUrl);
  }
}
