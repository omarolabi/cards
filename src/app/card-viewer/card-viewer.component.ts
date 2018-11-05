import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardsService } from '../services/cards.service';
import { CardModel } from '../models/card.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.scss']
})
export class CardViewerComponent implements OnInit {

  public cards$: Observable<CardModel>;
  public card: CardModel;
  public isWorking = true;

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getCard();
  }

  private getCard(): void {
    const number = +this.route.snapshot.paramMap.get('number');

    this.cardsService.getCards()
      .pipe(map(cards => cards.find(card => card.number === number)))
      .subscribe(
        data => {
          this.card = data;
          this.isWorking = false;
        }
      );
  }

  goBack(): void {
    this.location.back();
  }

}
