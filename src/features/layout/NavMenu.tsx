import { NavLink } from 'react-router-dom';

export default function NavMenu() {
    return (
        <nav>
            <NavLink
                className='btn btn-link btn-justified tx-uppercase'
                to='pokemon'>
                Pokemon
            </NavLink>
        </nav>
    );
}
