import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '_store';

export { Nav };

function Nav() {
    const auth = useSelector(x => x.auth.value);
    const dispatch = useDispatch();
    const logout = () => dispatch(authActions.logout());

    // only show nav when logged in
    if (!auth) return null;
    
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
            <div className="navbar-nav">
                <NavLink to="/" className="nav-item nav-link">Главная страница</NavLink>
                {auth.role === 'admin' || auth.role === 'owner' ? <NavLink to="/admin" className="nav-item nav-link">Админка</NavLink> : null}
                <button onClick={logout} className="btn btn-link nav-item nav-link">Выход</button>
            </div>
        </nav>
    );
}