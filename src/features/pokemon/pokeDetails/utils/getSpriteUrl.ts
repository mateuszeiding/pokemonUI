import { OtherPokemonSprites, Pokemon, VersionSprites } from 'pokenode-ts';

type FrontDefault = {
    front_default: string;
};

// Typescript won the battle
export function getSpriteUrl(
    pokemon: Pokemon,
    category: unknown,
    subcategory: unknown
): string {
    if (!category || !subcategory) {
        return pokemon.sprites.front_default ?? '';
    }
    let spriteUrl: string;

    if (category === 'other') {
        const other = pokemon.sprites.other;

        spriteUrl =
            other?.[subcategory as keyof OtherPokemonSprites].front_default ??
            '';
    } else {
        const versions = pokemon.sprites.versions;
        const subcat = versions[category as keyof VersionSprites]?.[
            subcategory as keyof VersionSprites[keyof VersionSprites]
        ] as FrontDefault;

        spriteUrl = subcat?.front_default ?? '';
    }

    return spriteUrl ?? '';
}
