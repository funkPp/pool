import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export { Home };

function Home() {
    const auth = useSelector(x => x.auth.value);
    return (
        <div>
            <h3>Добрый день, {auth?.firstname +' '+ auth?.lastname+'!'}</h3>
            <p>Вы на главной странице!</p>
            <p><Link to="/admin">Управление пользователями</Link></p>
        </div>
    );
}
