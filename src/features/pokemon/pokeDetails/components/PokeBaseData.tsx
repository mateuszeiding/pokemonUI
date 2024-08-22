import { imageSourcePromise } from '@/utils/imageSourcePromise';
import { Pokemon } from 'pokenode-ts';
import { Suspense } from 'react';
import { Await, useAsyncValue, useLocation } from 'react-router-dom';

export default function PokeBaseData() {
    const pokemon = useAsyncValue() as Pokemon;
    const location = useLocation();
    const name = location.state.name as string;

    return (
        <>
            <div className='col-5 d-flex flex-column g-row-3 justify-content-end'>
                {pokemon.stats.map((stat) => (
                    <div
                        key={stat.stat.name}
                        className='d-flex justify-content-between align-items-end g-4'>
                        <span className='tx-capitalize'>{stat.stat.name}:</span>
                        <span>{stat.base_stat}</span>
                    </div>
                ))}
            </div>
            <div className='col-7'>
                <Suspense
                    fallback={<div className='skeleton poke-img r-5'></div>}>
                    <Await
                        resolve={imageSourcePromise(
                            pokemon.sprites.other?.['official-artwork']
                                .front_default ?? ''
                        )}>
                        {(src: string) => (
                            <img
                                className='poke-img'
                                src={src}
                                alt={name}
                            />
                        )}
                    </Await>
                </Suspense>

                <div className='tx-center'>
                    <h3>Weight: {pokemon.weight / 10}kg</h3>
                    <h3>Height: {pokemon.height / 10}m</h3>
                </div>
            </div>
        </>
    );
}
