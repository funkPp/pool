import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    return (
        <div>
            <h1>Привет, {auth?.firstname}!</h1>
            <p>Вы на домашней странице!</p>
            {auth.role === 'admin' || auth.role === 'owner' ? <p><Link to="/admin">Manage Users</Link></p> : null}
        </div>
    );
}
