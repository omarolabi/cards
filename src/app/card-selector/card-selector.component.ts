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

  private initialFilterValue = 'all';
  private cardsList: CardModel[];

  public filteredList: CardModel[];
  public isWorking = true;
  public factionsList$: Observable<FactionModel[]>;
  public seasonsList$: Observable<SeasonModel[]>;
  public seasonFilterValue = this.initialFilterValue;
  public factionFilterValue = this.initialFilterValue;


  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit() {
    this.getSeasons();
    this.getFactions();
    this.getCardsList();
    this.initialFilterValues();
  }

  private getSeasons(): void {
    this.seasonsList$ = this.cardsService.getSeasons();
  }

  private getFactions(): void {
    this.factionsList$ = this.cardsService.getFactions();
  }

  private getCardsList(): void {
    this.cardsService.getCards()
      .subscribe(data => {
        this.cardsList = data;
        this.isWorking = false;
        this.filterCardsList();
      });
  }

  private initialFilterValues() {
    if (localStorage.seasonFilterValue) {
      this.seasonFilterValue = localStorage.seasonFilterValue;
    } else {
      localStorage.setItem('seasonFilterValue', this.initialFilterValue);
    }
    if (localStorage.factionFilterValue) {
      this.factionFilterValue = localStorage.factionFilterValue;
    } else {
      localStorage.setItem('factionFilterValue', this.initialFilterValue);
    }
  }

  private filterCardsList() {
    if (this.seasonFilterValue !== this.initialFilterValue) {
      this.filteredList = this.cardsList
        .filter(elem => elem.season === this.seasonFilterValue);
    } else if (this.factionFilterValue !== this.initialFilterValue) {
      this.filteredList = this.cardsList
        .filter(elem => elem.faction === this.factionFilterValue);
    } else {
      this.filteredList = this.cardsList;
    }
  }

  public setFilterValues(filterValue, filterType) {
    localStorage.setItem(filterType + 'FilterValue', filterValue);

    switch (filterType) {
      case 'season':
        localStorage.setItem('factionFilterValue', this.initialFilterValue);
        this.factionFilterValue = this.initialFilterValue;
        break;
      case 'faction':
        localStorage.setItem('seasonFilterValue', this.initialFilterValue);
        this.seasonFilterValue = this.initialFilterValue;
        break;
    }

    this.filterCardsList();
  }
}
