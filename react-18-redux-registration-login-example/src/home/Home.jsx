import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    return (
        <div>
            <h1>Привет, {auth?.firstName}!</h1>
            <p>Вы на домашней страницу!</p>
            <p><Link to="/users">Manage Users</Link></p>
        </div>
    );
}
