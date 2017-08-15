import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from "./Hero";
import { HEROES } from "./mock-heroes";

@Injectable()
export class HeroService {
    heroes: Hero[];
    private heroesUrl = 'api/heroes';
    private headers = new Headers( { 'Content-Type': 'application/json' } );

    constructor( private http: Http ) {

    }

    getHeroes(): Promise<Hero[]> {
        return this.http.get( this.heroesUrl )
            .toPromise()
            .then( response => response.json().data as Hero[] )
            .catch( this.handleError );
    }

    private handleError( error: any ): Promise<any> {
        console.error( 'An error occurred', error ); // for demo purposes only
        return Promise.reject( error.message || error );
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(( resolve, reject ) => {
            setTimeout(() => {
                resolve( this.getHeroes() );
            }, 4000 );
        } );
    }

    getHero( id: number ): Promise<Hero> {
        //        return t        his.getHeroes()
        //            .then(        ( heroes ) => {
        //                return heroes.find( hero => he        ro.id === id );
        //            } );

        return this.http.get( `${ this.heroesUrl }/${ id }` )
            .toPromise()
            .then(( response ) => {
                return response.json().data as Hero;
            } )
            .catch( this.handleError );
    }

    update( hero: Hero ): Promise<Hero> {
        const url = `${ this.heroesUrl }/${ hero.id }`;
        return this.http
            .put( url, JSON.stringify( hero ), { headers: this.headers } )
            .toPromise()
            .then(() => hero )
            .catch( this.handleError );
    };

    create( name: string ): Promise<Hero> {
        return this.http
            .post( this.heroesUrl, JSON.stringify( { name: name } ), { headers: this.headers } )
            .toPromise()
            .then( response => {
                return response.json().data as Hero
            } )
            .catch( this.handleError );
    }

    delete( id: number ): Promise<void> {
        const url = `${ this.heroesUrl }/${ id }`;
        return this.http.delete( url, { headers: this.headers } )
            .toPromise()
            .then(() => null )
            .catch( this.handleError );
    }
}