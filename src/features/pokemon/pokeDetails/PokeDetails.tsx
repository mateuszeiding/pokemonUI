import { PokeData } from '@/services/loaders/pokeDetails.loader';
import { Suspense } from 'react';
import { Await, useLoaderData, useLocation } from 'react-router-dom';
import PokeBaseData from './components/PokeBaseData';
import PokeTypes from './components/PokeTypes';
import './PokeDetails.scss';
import PokeAbilities from './components/PokeAbilities';

export default function PokeDetails() {
    const { pokeData } = useLoaderData() as Awaited<{
        pokeData: {
            data: PokeData;
        };
    }>;
    const location = useLocation();
    const name = location.state.name as string;

    return (
        <div style={{ maxWidth: '700px' }}>
            <div className='row pb-5'>
                <div className='col d-flex align-items-center g-col-8 justify-content-between'>
                    <Suspense
                        fallback={
                            <div
                                className='skeleton'
                                style={{
                                    height: 20,
                                    width: 90,
                                }}></div>
                        }>
                        <Await resolve={pokeData}>
                            <PokeTypes />
                        </Await>
                    </Suspense>
                    <h2 className='fs-8 tx-capitalize tx-right lh-sm'>
                        {name}
                    </h2>
                </div>
            </div>
            <div className='row mb-6'>
                <PokeBaseData pokeData={pokeData} />
            </div>
            <div className='row mb-6'>
                <Suspense>
                    <Await resolve={pokeData}>
                        {(pokeData: { data: PokeData }) => (
                            <PokeAbilities
                                abilities={pokeData.data.abilities}
                            />
                        )}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}
