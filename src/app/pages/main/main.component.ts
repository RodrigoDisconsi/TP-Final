import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* => homePage', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%'
          })
        ]),
        query(':enter', [
          style({ bottom: '-100%' })
        ]),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('300ms ease-out', style({ bottom: '100%' }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms ease-out', style({ bottom: '0%' }))
          ]),
        ]),
      ]),
      transition('* => fadePage', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            left: 0,
            width: '100%',
            opacity: 0,
            transform: 'scale(0) translateY(100%)'
          }),
        ]),
        query(':enter', [
          animate('600ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)'}))
        ])
      ])
    ])
  ]
})
export class MainComponent implements OnInit {

  constructor(private contexts:ChildrenOutletContexts) { }

  ngOnInit(): void {
  }


  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

}
