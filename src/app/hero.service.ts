import { Injectable } from '@angular/core';


import { Hero } from "./Hero";
import { HEROES } from "./mock-heroes";

@Injectable()
export class HeroService {
    heroes: Hero[];

    getHeroes(): Promise<Hero[]> {
        return Promise.resolve( HEROES );
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(( resolve, reject ) => {
            setTimeout(() => {
                resolve( this.getHeroes() );
            }, 4000 );
        } );
    }

    getHero( id: number ): Promise<Hero> {
        return this.getHeroes()
            .then(( heroes ) => {
                return heroes.find( hero => hero.id === id );
            } );
    }
}