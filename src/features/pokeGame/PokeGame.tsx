import { Suspense, useMemo, useState, KeyboardEvent, useEffect } from 'react';
import { Await } from 'react-router-dom';

import './PokeGame.scss';
import { imageSourcePromise } from '@/utils/imageSourcePromise';
import questionmark from '/guess-pokemon.png';
import pokeball from '/icon.png';
import PokeAPI from '@/services/Poke.API';
import happy from '/pika_happy.png';
import angry from '/pika_angry.png';
import who from '/who.png';

enum Result {
    WIN = 'win',
    LOSE = 'lose',
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function PokeGame() {
    const [number, setNumber] = useState<number | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [showPokemon, setShowPokemon] = useState<boolean>(false);
    const [showGame, setShowGame] = useState<boolean>(false);
    const [result, setResult] = useState<Result | null>(null);

    const src = useMemo(
        () => number && imageSourcePromise(`/pokemon/${number}.svg`),
        [number]
    );

    useEffect(() => {
        if (!number) return;
        PokeAPI.getPokemonById(number).then((response) =>
            setName(response.name)
        );
    }, [number]);

    const checkPokemonName = async (e: KeyboardEvent<HTMLInputElement>) => {
        setShowPokemon(true);
        if (e.currentTarget.value.toLowerCase() === name) {
            setTimeout(() => setResult(Result.WIN), 2000);
        } else {
            setTimeout(() => setResult(Result.LOSE), 2000);
        }
        setTimeout(() => setNumber(null), 2000);
        setTimeout(() => {
            setShowPokemon(false);
            setShowGame(false);
            setResult(null);
            setNumber(getRandomInt(0, 649));
        }, 3500);
    };

    useEffect(() => {
        setNumber(getRandomInt(0, 649));
    }, []);

    return showGame ? (
        <div className='mb-9'>
            <div className='d-flex'>
                <input
                    className='name-input'
                    placeholder='Who`s that Pokemon?'
                    onKeyDown={(e) => e.key === 'Enter' && checkPokemonName(e)}
                    disabled={showPokemon}
                />
                <img
                    src={questionmark}
                    className='questionmark'></img>
            </div>
            <div className='poke-frame'>
                <Suspense
                    fallback={
                        <img
                            src={who}
                            className='poke-mask-skeleton'
                        />
                    }>
                    <Await resolve={src}>
                        {(src: string) => (
                            <PokeMask
                                src={src}
                                showPokemon={showPokemon}
                            />
                        )}
                    </Await>
                </Suspense>
                <div className={['game-result', result ?? 'hidden'].join(' ')}>
                    <img src={result === Result.WIN ? happy : angry} />
                </div>
            </div>
        </div>
    ) : (
        <div className='pokeball-wrapper d-flex align-items-center'>
            <button
                className='game-ball'
                onClick={() => setShowGame(true)}>
                <img src={pokeball} />
            </button>
        </div>
    );
}

function PokeMask({ src, showPokemon }: { src: string; showPokemon: boolean }) {
    if (!src) return null;
    return (
        <>
            <div
                style={{
                    maskImage: `url(${src})`,
                    WebkitMaskImage: `url(${src})`,
                }}
                className={['poke-mask', showPokemon && 'hide']
                    .filter(Boolean)
                    .join(' ')}></div>
            <img
                className={['poke-mask-img', showPokemon && 'show']
                    .filter(Boolean)
                    .join(' ')}
                src={src}
                alt='pokemon'
            />
        </>
    );
}
