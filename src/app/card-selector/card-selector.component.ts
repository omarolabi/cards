import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { FactionsService } from '../services/factions.service';
import { SeasonsService } from '../services/seasons.service';
import { CardModel } from '../models/card.model';
import { FactionModel } from '../models/faction.model';
import { SeasonModel } from '../models/season.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})

export class CardSelectorComponent implements OnInit {

  public isWorking = true;
  public cardsListOriginal: CardModel[] = [];
  public cardsList: CardModel[] = [];
  public factionsList$: Observable<FactionModel[]>;
  public seasonsList$: Observable<SeasonModel[]>;

  private initialFilterValue = 'all';
  public seasonFiltervalue = this.initialFilterValue;
  public factionFiltervalue = this.initialFilterValue;

  constructor(
    private cardsService: CardsService,
    private seasonsService: SeasonsService,
    private factionsService: FactionsService
  ) { }

  ngOnInit() {
    this.getSeasons();
    this.getFactions();
    this.getCardsList();
  }

  private getSeasons(): void {
    this.seasonsList$ = this.seasonsService.getSeasons();
  }

  private getFactions(): void {
    this.factionsList$ = this.factionsService.getFactions();
  }

  private getCardsList(): void {
    this.cardsService.getCards()
      .finally(() => {
        this.isWorking = false;
        this.setFiltersData();
      })
      .subscribe(data => {
        this.cardsListOriginal = data;
        this.cardsList = data;
      });
  }

  public setFiltersData() {

    if (localStorage.seasonFiltervalue) {
      this.seasonFiltervalue = localStorage.seasonFiltervalue;
    } else {
      localStorage.setItem('seasonFiltervalue', this.initialFilterValue);
    }

    if (localStorage.factionFiltervalue) {
      this.factionFiltervalue = localStorage.factionFiltervalue;
    } else {
      localStorage.setItem('factionFiltervalue', this.initialFilterValue);
    }

    this.filterSeason();
    this.filterFaction();
  }

  public filterSeason() {
    localStorage.setItem('seasonFiltervalue', this.seasonFiltervalue);
    localStorage.setItem('factionFiltervalue', this.initialFilterValue);
    this.factionFiltervalue = this.initialFilterValue;
  }

  public filterFaction(): void {
    // if (this.factionFiltervalue === 'all' && this.seasonFiltervalue === 'all') {
    //   this.cardsList = this.cardsListOriginal;
    // } else {

    //   if (this.factionFiltervalue === 'all') {
    //     this.cardsList = this.cardsListOriginal
    //       .filter(elem => elem.faction === this.seasonFiltervalue);
    //   }

    //   this.cardsList = this.cardsListOriginal
    //     .filter(elem => elem.faction === filterValue);
    // }
    localStorage.setItem('factionFiltervalue', this.factionFiltervalue);
    localStorage.setItem('seasonFiltervalue', this.initialFilterValue);
    this.seasonFiltervalue = this.initialFilterValue;
  }

}
