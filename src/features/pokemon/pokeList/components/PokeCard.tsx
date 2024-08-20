import { Suspense } from 'react';
import './PokeCard.scss';
import { Await, NavLink } from 'react-router-dom';

type PokeCard = {
    name: string;
    id: string;
};

export default function PokeCard({ name, id }: Readonly<PokeCard>) {
    return (
        <NavLink
            to={id}
            className='poke-card'>
            <h3 className='tx-capitalize align-self-end fs-3 fw-regular'>
                Nr {id}
            </h3>
            <h2 className='tx-capitalize'>{name}</h2>
            <Suspense fallback={<div className='poke-img skeleton'></div>}>
                <Await
                    resolve={
                        new Promise((resolve) => {
                            const img = new Image();
                            img.src = `src/assets/pokemon/${id}.svg`;
                            img.onload = () => resolve(img.src);
                        })
                    }>
                    {(img) => (
                        <img
                            className='poke-img'
                            src={img}
                            alt={name}
                        />
                    )}
                </Await>
            </Suspense>
        </NavLink>
    );
}
