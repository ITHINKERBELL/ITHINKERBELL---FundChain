
import { useEffect, useState } from 'react';
import Login from './pages/login';
import MainContent from './pages/mainContent';
import { authenticateToken } from './services/authentication';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const a = await authenticateToken()
            setIsLoggedIn(a)
        }
        fetchData()
    }, []);
    return <>{isLoggedIn ? <MainContent /> : <Login />}</>;
}

export default App;