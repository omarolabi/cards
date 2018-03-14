import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CollectionModel } from '../models/collection.model';
import 'rxjs/add/operator/map';

@Injectable()
export class CollectionsService {

  constructor(
    private http: HttpClient
  ) { }

  private configUrl = './assets/json/collections.json';

  public getCollections(): Observable<CollectionModel[]> {
    return this.http.get<CollectionModel[]>(this.configUrl);
  }
}
