import { Ability } from 'pokenode-ts';
import { Suspense } from 'react';
import { Await, useAsyncValue } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export default function PokeAbilities({ abilities }: { abilities: Ability[] }) {
    console.log(abilities);
    return (
        <div className='d-flex flex-column g-3 flex-wrap'>
            {abilities.map((ability, index) => (
                <Fragment key={index}>
                    <Suspense
                        fallback={
                            <div
                                className='skeleton r-4'
                                style={{ height: 120, width: '100%' }}></div>
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
            <div>
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
