import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component( {
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: [
        './heroes.component.css'
    ]
} )
export class HeroesComponent implements OnInit {
    selectedHero: Hero;

    heroes: Hero[];

    constructor( private heroService: HeroService, private router: Router ) {

    }

    onSelect( hero: Hero ): void {
        this.selectedHero = hero;
    }

    getHeroes(): void {
        this.heroService.getHeroes().then( h => { this.heroes = h } );
    }

    goToDetail(): void {
        this.router.navigate( [ '/detail', this.selectedHero.id ] );
    }

    add( name: string ): void {
        name = name.trim() || null;
        if ( !name ) {
            return;
        }
        this.heroService.create( name ).then( hero => {
            this.heroes.push( hero );
            this.selectedHero = null;
        } );
    }

    onEnter( name: string ): void {
        this.add( name );
    }

    delete( hero: Hero ): void {
        this.heroService
            .delete( hero.id )
            .then(() => {
                this.heroes = this.heroes.filter(( h ) => {
                    return h !== hero
                } )
                if ( this.selectedHero === hero ) {
                    this.selectedHero = null;
                }
            } );
    }

    ngOnInit() {
        this.getHeroes()
    }
}
