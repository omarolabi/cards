import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { CardModel } from '../models/card.model';
import { FactionModel } from '../models/faction.model';
import { SeasonModel } from '../models/season.model';
import { LocationModel } from '../models/location.model';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})

export class CardSelectorComponent implements OnInit {

  private cardsList: CardModel[];

  public initialFilterValue = 'all';
  public filteredList: CardModel[];
  public isWorking = true;
  public factionsList$: Observable<FactionModel[]>;
  public seasonsList$: Observable<SeasonModel[]>;
  public locationsList$: Observable<LocationModel[]>;

  public filterValues = {
    season: this.initialFilterValue,
    faction: this.initialFilterValue,
    location: this.initialFilterValue
  };

  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit() {
    this.getSeasons();
    this.getFactions();
    this.getLocations();
    this.getCardsList();
    this.initialFilterValues();
  }

  private getSeasons(): void {
    this.seasonsList$ = this.cardsService.getSeasons();
  }

  private getFactions(): void {
    this.factionsList$ = this.cardsService.getFactions();
  }

  private getLocations(): void {
    this.locationsList$ = this.cardsService.getLocations();
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
    for (const [key] of Object.entries(this.filterValues)) {
      if (localStorage[key]) {
        this.filterValues[key] = localStorage[key];
      } else {
        localStorage.setItem(key, this.initialFilterValue);
      }
    }
  }

  private filterCardsList() {
    let filter: string;
    for (const [key] of Object.entries(this.filterValues)) {
      if (this.filterValues[key] !== this.initialFilterValue) {
        filter = key;
      }
    }
    if (filter) {
      this.filteredList = this.cardsList
        .filter(elem => elem[filter] === this.filterValues[filter]);
    } else {
      this.filteredList = this.cardsList;
    }
  }

  public setFilterValues(filterValue, filterType) {
    for (const [key] of Object.entries(this.filterValues)) {
      localStorage.setItem(key, this.initialFilterValue);
    }
    localStorage.setItem(filterType, filterValue);
    for (const [key] of Object.entries(this.filterValues)) {
      this.filterValues[key] = localStorage[key];
    }
    this.filterCardsList();
  }
}
