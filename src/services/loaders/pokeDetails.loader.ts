import { defer, LoaderFunctionArgs } from 'react-router-dom';
import PokeAPI from '../Poke.API';
import { Pokemon, Type, VersionSprites } from 'pokenode-ts';

export type PokeData = {
    pokemon: Pokemon;
    types: (Type & { sprites: VersionSprites })[];
};

export async function pokeDetailsHeaderLoader({ params }: LoaderFunctionArgs) {
    const pokeData = await PokeAPI.getPokemonById(Number(params.id)).then(
        (res) =>
            defer({
                pokemon: res,
                types: res.types.map((type) =>
                    PokeAPI.getTypeByName(type.type.name)
                ),
            })
    );
    return defer({
        pokeData: pokeData,
    });
}
