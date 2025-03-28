import { useCallback, useEffect, useRef, useState } from 'react';

import PokeCard from './components/PokeCard';
import PokeAPI from '@/services/Poke.API';
import { Outlet } from 'react-router-dom';
import { NamedAPIResourceList } from 'pokenode-ts';

export default function PokeList() {
    const [pokemons, setPokemons] = useState<NamedAPIResourceList>({
        count: 0,
        next: null,
        previous: null,
        results: [],
    });

    const listRef = useRef<HTMLDivElement>(null);

    const fetchPokemons = useCallback((pokeArrayLength?: number) => {
        if (!listRef.current) return;
        PokeAPI.listPokemons(pokeArrayLength, 20)
            .then((response) => {
                setPokemons((prev) => {
                    if (
                        (pokeArrayLength === undefined &&
                            prev.results.length === 0) ||
                        prev.results.length + 2 === pokeArrayLength
                    )
                        return {
                            ...response,
                            results: [...prev.results, ...response.results],
                        };
                    else {
                        return prev;
                    }
                });
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        fetchPokemons();
    }, [fetchPokemons]);

    useEffect(() => {
        if (listRef.current) {
            const { clientHeight, scrollHeight } = listRef.current;
            if (scrollHeight <= clientHeight + 100) {
                fetchPokemons(pokemons.results.length + 2);
            }
        }
        const handleScroll = () => {
            if (!listRef.current) return;
            const { scrollTop, clientHeight, scrollHeight } = listRef.current;
            if (
                scrollTop + clientHeight >= scrollHeight - 300 ||
                scrollHeight <= clientHeight
            ) {
                fetchPokemons(pokemons.results.length + 2);
            }
        };
        const controller = new AbortController();
        listRef.current?.addEventListener('scroll', handleScroll, {
            signal: controller.signal,
        });

        return () => {
            controller.abort();
        };
    }, [fetchPokemons, pokemons.results.length]);

    return (
        <div className='row h-100'>
            <div
                ref={listRef}
                className='col-7 overflow-y-scroll overflow-x-hidden h-100 pt-6'>
                <div className='row row-cols-sm-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-5 g-row-6 pb-3'>
                    {pokemons?.results.map((pokemon) => (
                        <div
                            className='col'
                            key={pokemon.name}>
                            <PokeCard
                                id={pokemon.url.split('/').slice(-2)[0]}
                                name={pokemon.name}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className='col-5 border-left pt-6 p-relative'>
                <Outlet />
            </div>
        </div>
    );
}
