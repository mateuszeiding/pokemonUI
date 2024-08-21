import {
    createBrowserRouter,
    RouterProvider,
    useParams,
} from 'react-router-dom';

import Root from '@/Root';
import PokeList from '@/features/pokemon/pokeList/PokeList';
import PokeDetails from './features/pokemon/pokeDetails/PokeDetails';
import { pokeDetailsHeaderLoader } from './services/loaders/pokeDetails.loader';

export default function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: 'pokemon',
                    element: <PokeList />,
                    children: [
                        {
                            path: ':id',
                            element: <PokeDetailsWrapper />,
                            loader: pokeDetailsHeaderLoader,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

function PokeDetailsWrapper() {
    const { id } = useParams();
    return <PokeDetails key={id} />;
}
