import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { CollectionsService } from '../services/collections.service';
import { CardModel } from '../models/card.model';
import { CollectionModel } from '../models/collection.model';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})

export class CardSelectorComponent implements OnInit {

  public cardsList: CardModel[];
  public collectionList: CollectionModel[];

  constructor(
    private cardsService: CardsService,
    private collectionsService: CollectionsService
  ) { }

  ngOnInit() {
    this.getCardsList();
    this.getCollections();
  }

  private getCardsList(): void {
    this.cardsService.getCards().subscribe(data => {
      this.cardsList = data;
    });
  }

  private filterList(collection): void {
    if (collection === 'all') {
      this.getCardsList();
      console.log(JSON.stringify(this.cardsList));
    } else {
      this.cardsService.getCards().subscribe(data => {
        this.cardsList = data.filter(elem => {
          return elem.collectionCode === collection;
        });
      });
    }
  }

  private getCollections(): void {
    this.collectionsService.getCollections().subscribe(data => {
      this.collectionList = data;
    });
  }

  public filterCollection(collection) {
    this.filterList(collection);
  }

}
