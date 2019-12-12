import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from '../shared/pokemon';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'https://pokeapi.co/api/v2/';
  spriteURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch Pokemons list
  listPokemons(offset: number, limit: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.apiURL + `pokemon?offset=${offset}&limit=${limit}`)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch Pokemon
  async getPokemon(id: number) {
    var response:any = await this.http.get(`${this.apiURL}pokemon/${id}/`)
      .toPromise();

      console.log(id);
      //let response = JSON.parse(JSON.stringify(res._body || null ));
      let pokemon = new Pokemon();

      console.log(pokemon);
      pokemon.name = response.name;
      pokemon.id = response.id;

      response.types.forEach((type) => {
        pokemon.types.push(type.type.name);
      });

      response.stats.forEach((stat) => {
        pokemon.stats.push({
          name: stat.stat.name,
          value: stat.base_stat
        });
      });

      for (let sprite in response.sprites) {
        if (response.sprites[sprite]) {
          pokemon.sprites.push({
            name: sprite,
            imagePath: response.sprites[sprite]
          });
        }
      }

      return pokemon;
 
      //});
  }
  
  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }
}
