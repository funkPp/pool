import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '_helpers';

export function PrivateAdminRoute() {
    const auth = useSelector(x => x.auth.value);
    console.log(auth.role)
    if (!(auth.role === 'admin') && !(auth.role === 'owner')) {
        // not logged in so redirect to login page with the return url
        console.log('!!!')
        return <Navigate to="/account/login" state={{ from: history.location }} />
    }
    return <Outlet />;
}