import { PokeData } from '@/services/loaders/pokeDetails.loader';
import { Ability } from 'pokenode-ts';
import { Suspense } from 'react';
import { Await, useAsyncValue } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export default function PokeAbilities() {
    const { data } = useAsyncValue() as { data: PokeData };
    const abilities = data.abilities;
    return (
        <div className='col d-flex flex-column g-row-3 flex-wrap'>
            {abilities.map((ability, index) => (
                <Fragment key={index}>
                    <Suspense
                        fallback={
                            <div className='skeleton poke-ability-skeleton r-4'></div>
                        }>
                        <Await resolve={ability}>
                            <PokeAbility />
                        </Await>
                    </Suspense>
                </Fragment>
            ))}
        </div>
    );
}

function PokeAbility() {
    const ability = useAsyncValue() as Ability;
    return (
        <div className='poke-ability'>
            <div className='poke-ability-frame'></div>
            <div className='poke-ability-light top first'>
                <div></div>
                <div></div>
            </div>
            <div className='poke-ability-light top second'>
                <div></div>
                <div></div>
            </div>
            <div className='poke-ability-light top third'>
                <div></div>
                <div></div>
            </div>

            <div className='tx-capitalize fs-6 fw-bold'>{ability.name}</div>
            <div className='fw-light'>
                {
                    ability.effect_entries.find(
                        (ab) => ab.language.name === 'en'
                    )?.short_effect
                }
            </div>

            <div className='poke-ability-light bottom first'>
                <div></div>
                <div></div>
            </div>
            <div className='poke-ability-light bottom second'>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}
