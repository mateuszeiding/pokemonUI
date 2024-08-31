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
                ? (activeIndex.current -
                      (abilities.length === 2 ? 1 : 2) * -1) %
                  abilities.length
                : (activeIndex.current + 1) % abilities.length;

        const getNewAbilities = () => {
            if (abilities.length === 2)
                return setAbilities([abilities[1], abilities[0]]);
            switch (dir) {
                case 'left': {
                    const last = abilities[abilities.length - 1];
                    const updatedAbilities = [
                        last,
                        ...abilities.slice(0, abilities.length - 1),
                    ];
                    setAbilities(updatedAbilities);
                    break;
                }
                case 'right': {
                    const first = abilities[0];
                    const updatedAbilities = [...abilities.slice(1), first];
                    setAbilities(updatedAbilities);
                    break;
                }
            }
        };

        setTimeout(() => {
            setDirection(null);
            getNewAbilities();
        }, 500);
    };

    return (
        <div className='col'>
            <div className='d-flex align-items-center g-col-3'>
                <button
                    className='btn btn-primary'
                    onClick={() => handleDirection('left')}
                    disabled={abilities.length < 2}>
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
                                                    'Causes 1/8 max HP in damage each turn during strong sunlight, but heals for 1/8 max HP during rain. Increases damage from fire moves to 1.25×, but absorbs water moves, healing for 1/4 max HP.',
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
                            <div>
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
                                {(abilities.length === 2
                                    ? [abilities[1], ...abilities]
                                    : abilities
                                ).map((ability, index) => (
                                    <Fragment key={index}>
                                        <Await resolve={ability}>
                                            <PokeAbility />
                                        </Await>
                                    </Fragment>
                                ))}
                            </div>

                            {/* </Suspense> */}
                        </div>
                    </div>
                </div>
                <button
                    className='btn btn-primary fw-bold'
                    onClick={() => handleDirection('right')}
                    disabled={abilities.length < 2}>
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
