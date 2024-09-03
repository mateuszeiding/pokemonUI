import {
    GenerationIIISprites,
    GenerationIISprites,
    GenerationISprites,
    GenerationIVSprites,
    GenerationVIIISprites,
    GenerationVIISprites,
    GenerationVISprites,
    GenerationVSprites,
} from 'pokenode-ts';

// interface ISpriteConfig extends VersionSprites {
//     'generation-i': GenerationISprites;
//     'generation-ii': GenerationIISprites;
//     'generation-iii': GenerationIIISprites;
//     'generation-iv': GenerationIVSprites;
//     'generation-v': GenerationVSprites;
//     'generation-vi': GenerationVISprites;
//     'generation-vii': GenerationVIISprites;
//     'generation-viii': GenerationVIIISprites;
//     other?: OtherPokemonSprites;
// }

export type Generations = GenerationISprites &
    GenerationIISprites &
    GenerationIIISprites &
    GenerationIVSprites &
    GenerationVSprites &
    GenerationVISprites &
    GenerationVIISprites &
    GenerationVIIISprites;

export class SpriteConfig {
    'generation-i' = { 'red-blue': null, yellow: null };
    'generation-ii' = { gold: null, silver: null, crystal: null };
    'generation-iii' = {
        'ruby-sapphire': null,
        emerald: null,
        'firered-leafgreen': null,
    };
    'generation-iv' = {
        'diamond-pearl': null,
        platinum: null,
        'heartgold-soulsilver': null,
    };
    'generation-v' = { 'black-white': null };
    'generation-vi' = { 'x-y': null, 'omegaruby-alphasapphire': null };
    'generation-vii' = { icons: null, 'ultra-sun-ultra-moon': null };
    'generation-viii' = { icons: null };
    'other' = {
        dream_world: null,
        'official-artwork': null,
        home: null,
        showdown: null,
    };
}
