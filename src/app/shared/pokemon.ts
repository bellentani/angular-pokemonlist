export class Pokemon {
    id: any;
    name: string;
    types: any[];
    base_experience: number;
    stats: any[];
    sprites: any[];

    constructor() {
        this.types = [];
        this.stats = [];
        this.sprites = [];
    }
}
