import { PokeData } from '@/services/loaders/pokeDetails.loader';
import { Suspense } from 'react';
import { Await, useLoaderData, useLocation } from 'react-router-dom';
import PokeBaseData from './components/PokeBaseData';
import PokeTypes from './components/PokeTypes';
import './PokeDetails.scss';

export default function PokeDetails() {
    const { pokeData } = useLoaderData() as Awaited<{
        pokeData: {
            data: PokeData;
        };
    }>;
    const location = useLocation();
    const name = location.state.name as string;

    return (
        <Suspense fallback={<div className='page-skeleton'></div>}>
            <Await resolve={pokeData}>
                {(pokeData: { data: PokeData }) => (
                    <>
                        <div className='row pb-5'>
                            <div className='col d-flex align-items-center g-col-8 justify-content-between'>
                                <PokeTypes types={pokeData.data.types} />
                                <h2 className='fs-8 tx-capitalize tx-right lh-sm'>
                                    {name}
                                </h2>
                            </div>
                        </div>
                        <div className='row mb-6'>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Await resolve={pokeData.data.pokemon}>
                                    <PokeBaseData />
                                </Await>
                            </Suspense>
                        </div>
                        <div className='row mb-6'>
                            <div className='col'></div>
                        </div>
                    </>
                )}
            </Await>
        </Suspense>
    );
}
