import { Component, Input } from '@angular/core';

import { Hero } from './hero';

@Component( {
    selector: 'my-instant-hero-editor',
    template: `
    <div *ngIf="hero">
        Id: <input [(ngModel)]="hero.id" placeholder="id">
        <br/>
        Name: <input [(ngModel)]="hero.name" placeholder="name">
    </div>
    `
} )
export class HeroInstantEditorComponent {
    @Input() hero: Hero;
}