import { Pokemon } from 'pokenode-ts';
import { useAsyncValue, useLocation } from 'react-router-dom';

export default function PokeStats() {
    const pokemon = useAsyncValue() as Pokemon;
    const location = useLocation();
    const name = location.state.name as string;

    return (
        <>
            <div className='col-5 d-flex flex-column g-row-3'>
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
                <img
                    src={
                        pokemon.sprites.other?.['official-artwork']
                            .front_default ?? undefined
                    }
                    alt={name}
                />
                <div className='tx-center'>
                    <h3>Weight: {pokemon.weight / 10}kg</h3>
                    <h3>Height: {pokemon.height / 10}m</h3>
                </div>
            </div>
        </>
    );
}
