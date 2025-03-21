import { Suspense, useMemo } from 'react';
import './PokeCard.scss';
import { Await, NavLink } from 'react-router-dom';
import { imageSourcePromise } from '@/utils/imageSourcePromise';

type PokeCard = {
    name: string;
    id: string;
};

export default function PokeCard({ name, id }: Readonly<PokeCard>) {
    const src = useMemo(() => imageSourcePromise(`/pokemon/${id}.svg`), [id]);

    return (
        <NavLink
            to={id}
            className='poke-card'
            state={{ name }}
            replace>
            <h3 className='tx-capitalize align-self-end fs-3 fw-regular'>
                Nr {id}
            </h3>
            <h2 className='tx-capitalize'>{name}</h2>
            <Suspense fallback={<div className='poke-img skeleton r-4'></div>}>
                <Await resolve={src}>
                    {(src: string) => (
                        <img
                            className='poke-img'
                            src={src}
                            alt={name}
                        />
                    )}
                </Await>
            </Suspense>
        </NavLink>
    );
}
