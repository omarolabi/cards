import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { CardModel } from '../models/card.model';

@Component({
  selector: 'app-card-selector',
  templateUrl: './card-selector.component.html',
  styleUrls: ['./card-selector.component.scss']
})

export class CardSelectorComponent implements OnInit {

  public cardsList: CardModel[];

  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit() {
    this.getCardsList();
  }

  private getCardsList(): void {
    this.cardsService.getCards().subscribe(data => {
      this.cardsList = data;
    });
  }

}
