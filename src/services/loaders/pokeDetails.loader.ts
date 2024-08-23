import { defer, LoaderFunctionArgs } from 'react-router-dom';
import PokeAPI from '../Poke.API';
import { Pokemon, Type, VersionSprites, Ability } from 'pokenode-ts';

export type PokeData = {
    pokemon: Pokemon;
    types: (Type & { sprites: VersionSprites })[];
    abilities: Ability[];
};

export async function pokeDetailsLoader({ params }: LoaderFunctionArgs) {
    const pokeData = PokeAPI.getPokemonById(Number(params.id)).then((res) =>
        defer({
            pokemon: res,
            types: res.types.map((type) =>
                PokeAPI.getTypeByName(type.type.name)
            ),
            abilities: res.abilities.map((ability) =>
                PokeAPI.getAbilityByName(ability.ability.name)
            ),
        })
    );
    return defer({
        pokeData: pokeData,
    });
}
