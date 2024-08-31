import { PokeData } from '@/services/loaders/pokeDetails.loader';
import { cls } from '@/utils/className';
import { Ability } from 'pokenode-ts';
import { useRef, useState } from 'react';
import { Await, useAsyncValue } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

export default function PokeAbilities() {
    const { data } = useAsyncValue() as { data: Readonly<PokeData> };
    const [direction, setDirection] = useState<'left' | null | 'right'>(null);
    const [abilities, setAbilities] = useState(data.abilities);
    const activeIndex = useRef(0);

    const handleDirection = (dir: 'left' | 'right') => {
        setDirection(dir);
        activeIndex.current =
            dir === 'right'
                ? (activeIndex.current - 2 * -1) % abilities.length
                : (activeIndex.current + 1) % abilities.length;
        setTimeout(() => {
            setDirection(null);
            setAbilities((prev) => {
                if (dir === 'right') {
                    const last = prev.pop();
                    prev.unshift(last!);
                } else {
                    const first = prev.shift();
                    prev.push(first!);
                }
                return [...prev];
            });
        }, 500);
    };

    return (
        <div className='col'>
            <div className='d-flex align-items-center g-col-3'>
                <button
                    className='btn btn-primary'
                    onClick={() => handleDirection('left')}>
                    &lt;
                </button>
                <div className='d-flex p-relative d-flex align-items-center'>
                    <div
                        className={cls(
                            'poke-ability',
                            direction === 'right' && 'next',
                            direction === 'left' && 'prev',
                            direction === null && 'active'
                        )}>
                        <div className='poke-ability-frame'></div>
                        <div>
                            {abilities.map((_, index) => (
                                <div
                                    key={index}
                                    className={cls(
                                        'poke-ability-light',
                                        index === activeIndex.current &&
                                            'active'
                                    )}>
                                    <div></div>
                                    <div></div>
                                </div>
                            ))}
                        </div>
                        <div className='overflow-hidden p-relative p-4'>
                            <Await
                                resolve={
                                    {
                                        effect_changes: [],
                                        effect_entries: [
                                            {
                                                effect: 'Increases evasion to 1.25x during a sandstorm. Protects against sandstorm damage.',
                                                language: {
                                                    name: 'en',
                                                    url: '',
                                                },
                                                short_effect:
                                                    'Increases damage inflicted to 1.25x against Pokémon of the same gender, but decreases damage to 0.75× against the opposite gender.',
                                            },
                                        ],
                                        flavor_text_entries: [],
                                        generation: { name: '', url: '' },
                                        id: 0,
                                        is_main_series: true,
                                        name: 'What Im doing',
                                        names: [],
                                        pokemon: [],
                                    } satisfies Ability
                                }>
                                <div>
                                    <PokeAbility template />
                                </div>
                            </Await>
                            {/* <Suspense
                                fallback={
                                    <div className='skeleton poke-ability-skeleton r-4'>
                                        <span className='skeleton-text'>
                                            Increases evasion to 1.25x during a
                                            sandstorm. Protects against
                                            sandstorm damage.
                                        </span>
                                    </div>
                                }> */}
                            {abilities.map((ability, index) => (
                                <Fragment key={index}>
                                    <Await resolve={ability}>
                                        <PokeAbility />
                                    </Await>
                                </Fragment>
                            ))}
                            {/* </Suspense> */}
                        </div>
                    </div>
                </div>
                <button
                    className='btn btn-primary fw-bold'
                    onClick={() => handleDirection('right')}>
                    &gt;
                </button>
            </div>
        </div>
    );
}

function PokeAbility({ template }: { template?: boolean }) {
    const ability = useAsyncValue() as Ability;
    return (
        <div className={cls('poke-ability-text', !template && 'data')}>
            <div className='tx-capitalize fs-6 fw-bold'>{ability.name}</div>
            <div className='fw-light z-2'>
                {
                    ability.effect_entries.find(
                        (ab) => ab.language.name === 'en'
                    )?.short_effect
                }
            </div>
        </div>
    );
}
