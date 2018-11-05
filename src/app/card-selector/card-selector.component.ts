import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { CardModel } from '../models/card.model';
import { FactionModel } from '../models/faction.model';
import { SeasonModel } from '../models/season.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})

export class CardSelectorComponent implements OnInit {

  public isWorking = true;
  public cardsListOriginal: CardModel[] = [];
  public cardsList: CardModel[] = [];
  public cardsListOriginal$: Observable<CardModel[]>;
  public factionsList$: Observable<FactionModel[]>;
  public seasonsList$: Observable<SeasonModel[]>;

  private initialFilterValue = 'all';
  public seasonFilterValue = this.initialFilterValue;
  public factionFilterValue = this.initialFilterValue;


  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit() {
    this.getSeasons();
    this.getFactions();
    this.getCardsList();
    this.firstFilter();
  }

  private firstFilter() {
    this.cardsListOriginal$
    .subscribe(data => {
      this.cardsListOriginal = data;
      this.cardsList = data;
      this.isWorking = false;
      this.setFiltersData();
    });
  }

  private getSeasons(): void {
    this.seasonsList$ = this.cardsService.getSeasons();
  }

  private getFactions(): void {
    this.factionsList$ = this.cardsService.getFactions();
  }

  private getCardsList(): void {
    this.cardsListOriginal$ = this.cardsService.getCards();
  }

  public setFiltersData() {
    if (localStorage.seasonFilterValue) {
      this.seasonFilterValue = localStorage.seasonFilterValue;
      if (localStorage.seasonFilterValue !== this.initialFilterValue) {
        this.filterCards(this.seasonFilterValue, 'season');
      }
    } else {
      localStorage.setItem('seasonFilterValue', this.initialFilterValue);
    }

    if (localStorage.factionFilterValue) {
      this.factionFilterValue = localStorage.factionFilterValue;
      if (localStorage.factionFilterValue !== this.initialFilterValue) {
        this.filterCards(this.factionFilterValue, 'faction');
      }
    } else {
      localStorage.setItem('factionFilterValue', this.initialFilterValue);
    }
  }

  public filterCards(filterValue, filterType) {
    this.cardsList = this.cardsListOriginal;
    localStorage.setItem(filterType + 'FilterValue', filterValue);
    if (filterValue !== this.initialFilterValue) {
      switch (filterType) {
        case 'season':
          this.cardsList = this.cardsListOriginal
            .filter(elem => elem.season === filterValue);
          this.factionFilterValue = this.initialFilterValue;
          localStorage.setItem('factionFilterValue', this.initialFilterValue);
          break;
        case 'faction':
          this.cardsList = this.cardsListOriginal
            .filter(elem => elem.faction === filterValue);
          this.seasonFilterValue = this.initialFilterValue;
          localStorage.setItem('seasonFilterValue', this.initialFilterValue);
          break;
      }
    }
  }
}
