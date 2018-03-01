import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CardsService } from '../services/cards.service';
import { CardModel } from '../models/card.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-card-viewer',
  templateUrl: './card-viewer.component.html',
  styleUrls: ['./card-viewer.component.scss']
})
export class CardViewerComponent implements OnInit {

  public card$: Observable<CardModel>;

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
    this.card$ = this.cardsService.getCard(number);
  }

  goBack(): void {
    this.location.back();
  }

}
