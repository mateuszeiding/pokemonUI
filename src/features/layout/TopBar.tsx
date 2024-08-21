import Switch from '@features/_shared/form/Switch';
import { NavLink } from 'react-router-dom';

export default function TopBar() {
    function changeUIMode(value: boolean) {
        document.documentElement.setAttribute(
            'thank-you-for-saving-my-eyes',
            value.toString()
        );
    }

    return (
        <div className='px-5 py-3 border-bottom bg-gray-000 d-flex justify-content-between'>
            <NavLink
                to='/'
                className='btn-link'>
                <h1 className='fs-5 tx-uppercase'>PokeApp</h1>
            </NavLink>
            <Switch
                label='Dark mode'
                initialValue={true}
                onChange={changeUIMode}
            />
        </div>
    );
}
