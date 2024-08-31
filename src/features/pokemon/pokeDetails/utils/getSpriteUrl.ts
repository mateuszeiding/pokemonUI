import { Pokemon, VersionSprites } from 'pokenode-ts';

// Function to create a generation string
export type GenerationGamePair<
    G extends keyof VersionSprites,
    Game extends keyof VersionSprites[G],
> = {
    generation: G;
    game: Game;
};

export function getSpriteUrl<
    G extends keyof VersionSprites,
    Game extends keyof VersionSprites[G],
>(pokemon: Pokemon, generation: G, game: Game): string {
    const sprites: VersionSprites[G] = pokemon.sprites.versions[generation];
    const sprite = sprites[game];
    if (
        sprite !== null &&
        typeof sprite === 'object' &&
        'front_default' in sprite &&
        typeof sprite.front_default === 'string'
    ) {
        return sprite.front_default;
    } else {
        return pokemon.sprites.other?.['official-artwork'].front_default ?? '';
    }
}
