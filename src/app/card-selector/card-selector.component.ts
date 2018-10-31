import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { CardModel } from '../models/card.model';
import { FactionModel } from '../models/faction.model';
import { SeasonModel } from '../models/season.model';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


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


  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  collection = [
    {
      'number': 36,
      'title': 'Los muertos vengativos',
      'season': 'Nightvault',
      'faction': 'Espinas de la Reina Zarza',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      'mainText': 'Puntúa en un final de la fase si todos tus guerreros supervivientes (al menos tres) están Inspirados.'
    }, {
      'number': 38,
      'title': 'Avance vengativo',
      'season': 'Nightvault',
      'faction': 'Espinas de la Reina Zarza',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      'mainText': 'Puntúa en un final de la fase si todos tus guerreros supervivientes están en territorio de tu oponente.'
    }, {
      'number': 306,
      'title': 'Conquista',
      'season': 'Nightvault',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      'mainText': 'Puntúa en el tercer final de la fase si todos tus guerreros supervivientes están en territorio de tu oponente.'
    }, {
      'number': 0,
      'title': 'Targor',
      'season': 'Shadespire',
      'faction': 'Saqueadores de Garrek',
      'type': 'Carta de guerrero',
      'errataType': 'promoCard',
      // tslint:disable-next-line:max-line-length
      'mainText': 'Ciertas versiones de esta carta muestran un perfil de armas erróneo en la parte inspirada. La carta estándar de Targor muestra los valores correctos.'
    }, {
      'number': 14,
      'title': 'Golpe final',
      'season': 'Shadespire',
      'faction': 'Saqueadores de Garrek',
      'type': 'Ardid',
      'errataType': 'replaceText',
      // tslint:disable-next-line:max-line-length
      'mainText': 'Juégala después de que una acción de Ataque de un guerrero enemigo haya dejado fuera de combate a un guerrero amigo adyacente. Su atacante sufre 1 de daño.'
    }, {
      'number': 43,
      'title': 'Resistencia forjada por la tormenta',
      'season': 'Shadespire',
      'faction': 'Campeones de Steelheart',
      'type': 'Ardid',
      'errataType': 'replaceText',
      'mainText': 'Los guerreros amigos no pueden ser empujados por la primera acción de Ataque en la siguiente activación.'
    }, {
      'number': 44,
      'title': 'Tácticas forjadas por la tormenta',
      'season': 'Shadespire',
      'faction': 'Campeones de Steelheart',
      'type': 'Ardid',
      'errataType': 'replaceText',
      // tslint:disable-next-line:max-line-length
      'mainText': 'En la siguiente activación puedes realizar la siguiente Reacción. <b>Reacción.</b> Después de que una acción de Ataque de un guerrero enemigo fracase, elige hasta dos guerreros amigos y empújalos hasta un hexágono cada uno.'
    }, {
      'number': 431,
      'title': 'Ofensiva total',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Mejora',
      'errataType': 'replaceText',
      // tslint:disable-next-line:max-line-length
      'mainText': 'Puedes tirar dos dados de ataque adicionales cuando este guerrero efectúe una acción de Ataque, aunque no cuando este guerrero efectúe una acción de Carga. Si lo haces, este guerrero no puede volver a ser activado esta fase.'
    }, {
      'number': 75,
      'title': 'Evasión veloz',
      'season': 'Shadespire',
      'faction': 'Guardia Sepulcral',
      'type': 'Ardid',
      'errataType': 'replaceText',
      // tslint:disable-next-line:max-line-length
      'mainText': 'Elige un guerrero amigo y empújalo hasta dos hexágonos. Su nueva posición debe estar más lejos de todos los guerreros enemigos.'
    }, {
      'number': 299,
      'title': 'Empieza la cosecha',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      'mainText': 'Puntúa inmediatamente si un guerrero amigo realiza una acción de Ataque que dañe a tres o más guerreros enemigos.'
    }, {
      'number': 91,
      'title': 'Aztuzia letal',
      'season': 'Shadespire',
      'faction': 'Chikoz de Ironskull',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      // tslint:disable-next-line:max-line-length
      'mainText': 'Puntúa inmediatamente si un guerrero amigo tiene dos guerreros más apoyándole que su blanco cuando efectúe una acción de Ataque.'
    }, {
      'number': 95,
      'title': 'Puñetazo',
      'season': 'Shadespire',
      'faction': 'Chikoz de Ironskull',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      // tslint:disable-next-line:max-line-length
      'mainText': 'Puntúa en un final de la fase si todos tus guerreros supervivientes (al menos dos) han efectuado una acción de Ataque contra guerreros enemigos diferentes en la anterior fase de acción.'
    }, {
      'number': 103,
      'title': 'Liderando kon el ejemplo',
      'season': 'Shadespire',
      'faction': 'Chikoz de Ironskull',
      'type': 'Ardid',
      'errataType': 'replaceText',
      'mainText': '<b>Reacción.</b> Juégala después de que una acción de Ataque efectuada por tu líder deje fuera de combate a un guerrero enemigo. Otro guerrero amigo que no haya efectuado una acción de Movimiento o Carga puede efectuar una acción de Carga.'
    }, {
      'number': 315,
      'title': 'Robo a pleno día',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Ardid',
      'errataType': 'replaceText',
      'mainText': 'Tira un dado de Ataque. Si obtienes un (martillo) o (crítico) retira uno de los puntos de gloria no gastados de tu oponente y quédatelo.'
    }, {
      'number': 341,
      'title': 'Engaño',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Ardid',
      'errataType': 'replaceText',
      'mainText': '<b>Reacción.</b> Juégala cuando un guerrero amigo es elegido por un ardid. Elige otro guerrero amigo que podría ser elegido por ese ardid. Ese guerrero es elegido en su lugar.'
    }, {
      'number': 107,
      'title': 'Kabeza dura',
      'season': 'Shadespire',
      'faction': 'Chikoz de Ironskull',
      'type': 'Mejora',
      'errataType': 'replaceText',
      'mainText': 'Cuando este guerrero sufre daño, reduce el daño en 1 hasta un mínimo de 1.'
    }, {
      'number': 387,
      'title': 'Imagen parpadeante',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Mejora',
      'errataType': 'replaceText',
      'mainText': '<b>Reacción.</b> Tras una acción de Ataque efectuada por este guerrero que obtenga un impacto crítico, puedes empujarlo hasta dos hexágonos.'
    }, {
      'number': 126,
      'title': 'Furia berserker',
      'season': 'Shadespire',
      'faction': 'Los hachas escogidas',
      'type': 'Ardid',
      'errataType': 'replaceText',
      'mainText': 'La primera vez que un guerrero amigo sufra daño en la siguiente activación, tira un dado de defensa. Si el resultado es un (escudo) no sufre daños.'
    }, {
      'number': 141,
      'title': 'Bendito de Grimnir',
      'season': 'Shadespire',
      'faction': 'Los hachas escogidas',
      'type': 'Mejora',
      'errataType': 'replaceText',
      'mainText': '<b>Reacción.</b> Durante una acción de Ataque o ardid que dejaría a este guerrero fuera de combate, tira un dado de defensa. Si obtienes un (escudo) se ignora el daño sufrido por este guerrero.'
    }, {
      'number': 404,
      'title': 'Pies ligeros',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Mejora',
      'errataType': 'replaceText',
      'mainText': '<b>Reacción.</b> Durante una acción de Ataque en la que este guerrero podría verse empujado puedes, en su lugar, empujarlo un hexágono (aunque tu oponente optase por no hacerlo).'
    }, {
      'number': 280,
      'title': 'Planificación perfecta',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      'mainText': 'Anota esta carta en un final de la fase si ninguno de tus guerreros efectuó una acción de Movimiento en la fase de acción previa.'
    }, {
      'number': 284,
      'title': 'Uso preciso de la fuerza',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      'mainText': 'Puntúa de inmediato esta carta si un guerrero amigo efectúa con éxito una acción de Ataque que inflige exactamente el daño suficiente para dejar fuera de combate al blanco.'
    }, {
      'number': 338,
      'title': 'Forcejeo',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Ardid',
      'errataType': 'replaceText',
      'mainText': '<b>Reacción.</b> Juégala después de que un guerrero enemigo adyacente efectúe una acción de Ataque que haya empujado a un guerrero amigo. Empuja al atacante al hexágono que dejó vacante tu guerrero.'
    }, {
      'number': 343,
      'title': 'Mi turno',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Ardid',
      'errataType': 'reactionMissing',
      'mainText': 'El texto de la carta va precedido por <b>Reacción.</b>'
    }, {
      'number': 424,
      'title': 'Espíritu encadenado',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Mejora',
      'errataType': 'replaceFirstLine',
      'mainText': '<b>Reacción.</b> Durante una acción de Ataque o ardid que deje a este guerrero fuera de combate, tira un dado de defensa.'
    }, {
      'number': 269,
      'title': 'El campo de la muerte',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      'mainText': 'Puntúa en un final de la fase si al menos un guerrero quedó fuera de combate en la anterior fase de acción en territorio enemigo, en tu territorio y en tierra de nadie.'
    }, {
      'number': 258,
      'title': 'Sin miedo',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'replaceText',
      'mainText': 'Puntúa en un final de la fase si hay al menos tres guerreros enemigos adyacentes al mismo guerrero amigo.'
    }, {

      'number': 356,
      'title': 'Lluvia de esquirlas',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Ardid',
      'errataType': 'wrongNaming',
      'mainText': 'Esta carta, la número 356, debería llamarse <b>Tormenta de esquirlas</b>.'
    }, {
      'number': 422,
      'title': 'Agilidad superior',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Mejora',
      'errataType': 'replaceText',
      'mainText': '<b>Reacción.</b> Durante una acción de Ataque en la que este guerrero podría verse empujado puedes, en su lugar, empujarlo un hexágono (aunque tu oponente optase por no hacerlo).'
    }, {
      'number': 16,
      'title': 'Ataque rapaz',
      'season': 'Shadespire',
      'faction': 'Incursores raudos',
      'type': 'Ardid',
      'errataType': 'replaceText',
      'mainText': 'Elige a un guerrero enemigo situado a cuatro hexágonos o menos de tu líder. Dicho guerrero sufre 1 de daño.'
    }, {
      'number': 330,
      'title': 'Ocupar objetivo 1',
      'season': 'Nightvault',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'wrongNamingReplaceText',
      'mainText': '<p>Esta carta, la número 330, debería llamarse <b>Mantener Objetivo 1</b>.</p><div class="text-muted">Sustituye el texto por:</div>Puntúa esta carta en un final de la fase si mantienes el objetivo 1.'
      }, {
      'number': 331,
      'title': 'Ocupar objetivo 2',
      'season': 'Nightvault',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'wrongNamingReplaceText',
      'mainText': '<p>Esta carta, la número 331, debería llamarse <b>Mantener Objetivo 2</b>.</p><div class="text-muted">Sustituye el texto por:</div>Puntúa esta carta en un final de la fase si mantienes el objetivo 2.'
      }, {
      'number': 332,
      'title': 'Ocupar objetivo 3',
      'season': 'Nightvault',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'wrongNamingReplaceText',
      'mainText': '<p>Esta carta, la número 332, debería llamarse <b>Mantener Objetivo 3</b>.</p><div class="text-muted">Sustituye el texto por:</div>Puntúa esta carta en un final de la fase si mantienes el objetivo 3.'
      }, {
      'number': 333,
      'title': 'Ocupar objetivo 4',
      'season': 'Nightvault',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'wrongNamingReplaceText',
      'mainText': '<p>Esta carta, la número 333, debería llamarse <b>Mantener Objetivo 4</b>.</p><div class="text-muted">Sustituye el texto por:</div>Puntúa esta carta en un final de la fase si mantienes el objetivo 4.'
      }, {
      'number': 334,
      'title': 'Ocupar objetivo 5',
      'season': 'Nightvault',
      'faction': 'Universal',
      'type': 'Objetivo',
      'errataType': 'wrongNamingReplaceText',
      'mainText': '<p>Esta carta, la número 334, debería llamarse <b>Mantener Objetivo 5</b>.</p><div class="text-muted">Sustituye el texto por:</div>Puntúa esta carta en un final de la fase si mantienes el objetivo 5.'
    }, {
      'number': 326,
      'title': 'Congelado en el tiempo',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Ardid',
      'errataType': 'replaceFirstLine',
      'mainText': 'Escoge a un guerrero enemigo y tira un dado de defensa.'
    }, {
      'number': 138,
      'title': 'Golpe desafiante',
      'season': 'Shadespire',
      'faction': 'Los hachas escogidas',
      'type': 'Mejora',
      'errataType': 'replaceText',
      'mainText': '<b>Reacción.</b> Durante una acción de Ataque con éxito contra este guerrero, este guerrero no puede ser empujado y efectúa a su vez esta acción de Ataque. Debe escoger como blanco al atacante.'
    }, {
      'number': 42,
      'title': 'Avance rápido',
      'season': 'Shadespire',
      'faction': 'Universal',
      'type': 'Ardid',
      'errataType': 'wrongNaming',
      'mainText': 'Esta carta, la número 42, debería llamarse <b>Avance raudo</b>.'
    }
  ];

  constructor(
    private cardsService: CardsService,
    private readonly afs: AngularFirestore
  ) {
    this.itemsCollection = afs.collection<any>('cards');
    // .valueChanges() is simple. It just returns the
    // JSON data without metadata. If you need the
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. See the addItem()
    // method below for how to persist the id with
    // valueChanges()
    this.items = this.itemsCollection.valueChanges();
  }

  public uploadCard() {

    for (const card of this.collection) {
      console.log(card.title);
      this.itemsCollection.doc(card.season + card.number).set(card);
    }

    // const item = {
    //   'number': 36,
    //   'title': 'Los muertos vengativos',
    //   'season': 'Nightvault',
    //   'faction': 'Espinas de la Reina Zarza',
    //   'type': 'Objetivo',
    //   'errataType': 'replaceText',
    //   'mainText': 'Puntúa en un final de la fase si todos tus guerreros supervivientes (al menos tres) están Inspirados.'
    // };
    // this.itemsCollection.doc(item.season + item.number).set(item);

  }

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
