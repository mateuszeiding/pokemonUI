import { PokeData } from '@/services/loaders/pokeDetails.loader';
import { imageSourcePromise } from '@/utils/imageSourcePromise';
import { Suspense } from 'react';
import { Await, useLocation } from 'react-router-dom';
import { getSpriteUrl } from '../utils/getSpriteUrl';
import CookieService from '@/utils/cookieService';

export default function PokeBaseData({
    pokeData,
}: {
    pokeData: {
        data: PokeData;
    };
}) {
    const location = useLocation();
    const name = location.state.name as string;
    const pokeStats = [
        'HP',
        'Attack',
        'Defense',
        'Special-Attack',
        'Special-Defense',
        'Speed',
    ] as const;

    const spriteConfig = CookieService.getSpriteConfig();

    const getThreeDigitStat = (stat: number) => {
        return stat.toString().padStart(3, '0');
    };

    return (
        <>
            <div className='col-5 d-flex flex-column g-row-3 pt-6'>
                {pokeStats.map((stat, index) => (
                    <div
                        key={stat}
                        className='d-flex justify-content-between align-items-end g-4'>
                        <span className='tx-capitalize'>{stat}:</span>
                        <Suspense
                            fallback={
                                <div
                                    key={stat}
                                    className='skeleton skeleton-text'>
                                    000
                                </div>
                            }>
                            <Await resolve={pokeData}>
                                {({ data }: { data: PokeData }) => (
                                    <span>
                                        {getThreeDigitStat(
                                            data.pokemon.stats[index].base_stat
                                        )}
                                    </span>
                                )}
                            </Await>
                        </Suspense>
                    </div>
                ))}
            </div>
            <div className='col-7'>
                <Suspense
                    fallback={
                        <div className='skeleton poke-img r-5 mb-5'></div>
                    }>
                    <Await resolve={pokeData}>
                        {({ data }: { data: PokeData }) => (
                            <Suspense
                                fallback={
                                    <div className='skeleton poke-img r-5 mb-5'></div>
                                }>
                                <Await
                                    resolve={imageSourcePromise(
                                        getSpriteUrl(
                                            data.pokemon,
                                            spriteConfig.config,
                                            spriteConfig.subconfig
                                        )
                                    )}>
                                    {(src: string) => (
                                        <img
                                            className='poke-img mb-5'
                                            src={src}
                                            alt={name}
                                        />
                                    )}
                                </Await>
                            </Suspense>
                        )}
                    </Await>
                </Suspense>
                <div className='d-flex flex-column g-row-3'>
                    <Suspense
                        fallback={
                            <>
                                <h3 className='d-flex justify-content-between'>
                                    <span>Weight(kg): </span>
                                    <span className='skeleton skeleton-text'>
                                        000
                                    </span>
                                </h3>
                                <h3 className='d-flex justify-content-between'>
                                    <span>Height(m): </span>
                                    <span className='skeleton skeleton-text'>
                                        000
                                    </span>
                                </h3>
                            </>
                        }>
                        <Await resolve={pokeData}>
                            {({ data }: { data: PokeData }) => (
                                <>
                                    <h3 className='d-flex justify-content-between'>
                                        <span>Weight(kg): </span>
                                        <span>{data.pokemon.weight / 10}</span>
                                    </h3>
                                    <h3 className='d-flex justify-content-between'>
                                        <span>Height(m): </span>
                                        <span>{data.pokemon.height / 10}</span>
                                    </h3>
                                </>
                            )}
                        </Await>
                    </Suspense>
                </div>
            </div>
        </>
    );
}
