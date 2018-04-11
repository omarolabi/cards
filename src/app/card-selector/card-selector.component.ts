import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { FactionsService } from '../services/factions.service';
import { CardModel } from '../models/card.model';
import { FactionModel } from '../models/faction.model';
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
  public collectionList$: Observable<FactionModel[]>;
  public selectedFiltervalue = 'all';

  constructor(
    private cardsService: CardsService,
    private collectionsService: FactionsService
  ) { }

  ngOnInit() {
    this.getCardsList();
    this.getFactions();
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

  private getFactions(): void {
    this.collectionList$ = this.collectionsService.getFactions();
  }

  public rememberFilter() {
    if (localStorage.filterFaction) {
      this.selectedFiltervalue = localStorage.filterFaction;
      this.filterFaction(localStorage.filterFaction);
    }
  }

  public filterFaction(faction): void {
    if (faction === 'all') {
      this.cardsList = this.cardsListOriginal;
      this.isCardsFiltered = false;
    } else {
      this.cardsList = this.cardsListOriginal
        .filter(elem => elem.faction === faction);
      this.isCardsFiltered = true;
    }
    localStorage.setItem('filterFaction', faction);
  }

}
