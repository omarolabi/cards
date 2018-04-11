import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { CollectionsService } from '../services/collections.service';
import { CardModel } from '../models/card.model';
import { CollectionModel } from '../models/collection.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})

export class CardSelectorComponent implements OnInit {

  public isWorking = true;
  public isCardsFiltered = false;
  public cardsListOriginal: CardModel[] = [];
  public cardsList: CardModel[] = [];
  public collectionList$: Observable<CollectionModel[]>;
  public selectedFiltervalue = 'all';

  constructor(
    private cardsService: CardsService,
    private collectionsService: CollectionsService
  ) { }

  ngOnInit() {
    this.getCardsList();
    this.getCollections();
    this.rememberFilter();
  }

  private getCardsList(): void {
    this.cardsService.getCards()
      .finally(() => {
        this.isWorking = false;
        this.rememberFilter();
      })
      .subscribe(data => {
        this.cardsListOriginal = data;
        this.cardsList = data;
      });
  }

  private getCollections(): void {
    this.collectionList$ = this.collectionsService.getCollections();
  }

  public rememberFilter() {
    if (localStorage.filterCollection) {
      this.selectedFiltervalue = localStorage.filterCollection;
      this.filterCollection(localStorage.filterCollection);
    }
  }

  public filterCollection(collection): void {
    if (collection === 'all') {
      this.cardsList = this.cardsListOriginal;
      this.isCardsFiltered = false;
    } else {
      this.cardsList = this.cardsListOriginal
        .filter(elem => elem.collectionCode === collection);
      this.isCardsFiltered = true;
    }
    localStorage.setItem('filterCollection', collection);
  }

}
