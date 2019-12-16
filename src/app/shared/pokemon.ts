export class Pokemon {
    id: any;
    name: string;
    types: any[];
    base_experience: number;
    stats: any[];
    sprites: any[];
    flavor_text_entries: any[];

    constructor() {
        this.types = [];
        this.stats = [];
        this.sprites = [];
        this.flavor_text_entries = [];
    }
}
