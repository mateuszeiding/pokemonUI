import { Suspense, useMemo, useState, KeyboardEvent, useEffect } from 'react';
import { Await } from 'react-router-dom';

import './PokeGame.scss';
import { imageSourcePromise } from '@/utils/imageSourcePromise';
import questionmark from '/guess-pokemon.png';
import pokeball from '/icon.png';
import PokeAPI from '@/services/Poke.API';
import happy from '/pika_happy.png';
import angry from '/pika_angry.png';

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
    const imageStore = useMemo(() => {
        const imageMap = new Map();
        const pokeballImg = (new Image().src = pokeball);
        const happyImg = (new Image().src = happy);
        const angryImg = (new Image().src = angry);

        imageMap.set('pokeball', pokeballImg);
        imageMap.set('happy', happyImg);
        imageMap.set('angry', angryImg);
        return {
            get(src: string) {
                return imageMap.get(src);
            },
            set(src: string, image: HTMLImageElement) {
                imageMap.set(src, image);
            },
        };
    }, []);

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
    }, [imageStore]);

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
                <Suspense fallback={<div className='poke-mask-skeleton'></div>}>
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
                    <img
                        src={
                            result === Result.WIN
                                ? imageStore.get('happy')
                                : imageStore.get('angry')
                        }
                    />
                </div>
            </div>
        </div>
    ) : (
        <div className='pokeball-wrapper d-flex align-items-center'>
            <button
                className='game-ball'
                onClick={() => setShowGame(true)}>
                <img src={imageStore.get('pokeball')} />
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
