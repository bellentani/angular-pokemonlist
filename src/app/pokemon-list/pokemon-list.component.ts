import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  Pokemons: any = [];
  Pokemon: any = [];

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadPokemons(0, 10);
    //console.log(this.Pokemon);
  }
  // Get Pokemons list
  async loadPokemons(init, limit) {
    return this.restApi.listPokemons(init, limit).subscribe((data: {}) => {
      this.Pokemons = data;
      //console.log(this.Pokemons);

      const pokemonList = [];
      

      this.Pokemons.results.forEach(async (pokemon, index) => {
        //let newId = parseInt(id);
        let sumId = index+1;
        
        //console.log('id: ', sumId); // the name of the current key.
        //console.log('name: ', pokemon.name); // the value of the current key.
        //console.log('sprite default: ', spriteDefault); // the value of the current key.

        pokemonList.push(sumId, pokemon.name, pokemon.sprites, pokemon.types );
        
        let pokemonInfo = await this.restApi.getPokemon(sumId);
        let pokemonDetail = await this.restApi.getPokemonDetail(sumId);

        //console.log("detail: ", pokemonDetail);

        pokemon['informations'] = pokemonInfo;
        pokemon['detail'] = pokemonDetail;

        //console.log(pokemon['detail']);

        function defaultSprite(pokemonSprite) { 
          return pokemonSprite.name === 'front_default';
        }
        
        const pokemonDefaultSprite = pokemonInfo.sprites.find(defaultSprite);

        pokemon['default_sprite'] = pokemonDefaultSprite;
        //console.log(pokemonDefaultSprite);
        
        // const entries = Object.entries(val);
        
        // console.log(entries);
        // for (const [name, url] of entries) {
        //   console.log(name, url)
        // }
      });
      //console.log(this.Pokemons.results);
    })
  }

  //Set value to pagination
  SetPokemonCount(max) {
    this.loadPokemons(0, max);
  }
}
