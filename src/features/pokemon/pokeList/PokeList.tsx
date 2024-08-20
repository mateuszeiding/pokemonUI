import { useEffect, useState } from 'react';

import { NamedAPIResource } from 'pokenode-ts';
import PokeCard from './components/PokeCard';
import PokeAPI from '@/services/Poke.API';
import { Outlet } from 'react-router-dom';

export default function PokeList() {
    const [pokemons, setPokemons] = useState<NamedAPIResource[]>([]);

    useEffect(() => {
        PokeAPI.listPokemons()
            .then((response) => {
                setPokemons(response.results);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className='row h-100'>
            <div className='col-7 overflow-y-scroll overflow-x-hidden h-100'>
                <div className='row d-flex g-6 pb-3'>
                    {pokemons.map((pokemon) => (
                        <div className='col'>
                            <PokeCard
                                id={pokemon.url.split('/').slice(-2)[0]}
                                key={pokemon.name}
                                name={pokemon.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-5'>
                <Outlet />
            </div>
        </div>
    );
}
