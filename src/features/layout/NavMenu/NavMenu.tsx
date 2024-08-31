import { NavLink } from 'react-router-dom';
import PokeGame from '../../pokeGame/PokeGame';
import SettingsButton from './components/SettingsButton';

export default function NavMenu() {
    return (
        <>
            <PokeGame />
            <nav className='d-flex flex-column g-row-6 flex-fill'>
                <NavLink
                    className='btn btn-link btn-justified tx-uppercase'
                    to='pokemon'>
                    Pokemon
                </NavLink>
                <NavLink
                    className='btn btn-link btn-justified tx-uppercase'
                    to='types'>
                    Types
                </NavLink>
                <NavLink
                    className='btn btn-link btn-justified tx-uppercase'
                    to='pizza'>
                    Pizza
                </NavLink>
            </nav>
            <SettingsButton />
        </>
    );
}
