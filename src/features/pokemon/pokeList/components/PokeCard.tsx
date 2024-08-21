import { Suspense, useMemo } from 'react';
import './PokeCard.scss';
import { Await, NavLink } from 'react-router-dom';

type PokeCard = {
    name: string;
    id: string;
};

export default function PokeCard({ name, id }: Readonly<PokeCard>) {
    const image = useMemo(
        () =>
            new Promise<string>((resolve) => {
                const img = new Image();
                img.src = `/pokemon/${id}.svg`;
                img.onload = () => {
                    resolve(img.src);
                };
            }),
        [id]
    );

    return (
        <NavLink
            to={id}
            className='poke-card'
            state={{ name }}>
            <h3 className='tx-capitalize align-self-end fs-3 fw-regular'>
                Nr {id}
            </h3>
            <h2 className='tx-capitalize'>{name}</h2>
            <Suspense fallback={<div className='poke-img skeleton'></div>}>
                <Await resolve={image}>
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
