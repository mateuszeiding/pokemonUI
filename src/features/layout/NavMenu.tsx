import { NavLink } from 'react-router-dom';

export default function NavMenu() {
    return (
        <nav className='d-flex flex-column g-row-6'>
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
    );
}
