import { Pokemon } from 'pokenode-ts';
import { Suspense } from 'react';
import { Await, useLoaderData, useParams } from 'react-router-dom';

export default function PokeDetails() {
    const { id } = useParams<{ id: string }>();
    const { pokeData } = useLoaderData() as Awaited<{ pokeData: Pokemon }>;

    return (
        <div>
            <h1>PokeDetails: {id}</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={pokeData}>
                    {(pokeData: Pokemon) => (
                        <div className='d-flex flex-column g-4'>
                            {Object.keys(pokeData).map((key) => (
                                <h2>{key}</h2>
                            ))}
                        </div>
                    )}
                </Await>
            </Suspense>
        </div>
    );
}
