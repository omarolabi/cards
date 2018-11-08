import { Component } from '@angular/core';
import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('myAnimation', [
      transition('ViewerPage => SelectorPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ left: '-100%' })
        ]),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ left: '100%' }))
          ], { optional: true }),
          query(':enter', [
            animate('200ms ease-out', style({ left: '0%' }))
          ], { optional: true })
        ]),
        query(':enter', animateChild()),
      ]),
      transition('SelectorPage => ViewerPage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100%'
          })
        ], { optional: true }),
        query(':enter', [
          style({ right: '-100%' })
        ]),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('200ms ease-out', style({ right: '100%' }))
          ], { optional: true }),
          query(':enter', [
            animate('200ms ease-out', style({ right: '0%' }))
          ], { optional: true })
        ]),
        query(':enter', animateChild()),
      ])
    ]),

  ]
})
export class AppComponent {

  title = 'WU Cards';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
