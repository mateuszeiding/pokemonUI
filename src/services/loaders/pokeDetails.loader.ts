import { defer, LoaderFunctionArgs } from 'react-router-dom';
import PokeAPI from '../Poke.API';

export default function pokeDetailsLoader({ params }: LoaderFunctionArgs) {
    return defer({
        pokeData: PokeAPI.getPokemonById(Number(params.id)),
    });
}
