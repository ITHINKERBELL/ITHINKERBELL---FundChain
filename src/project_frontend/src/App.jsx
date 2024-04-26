import { useEffect, useState } from "react";
import MainContent from "./pages/mainContent";
import Login from "./pages/login";
import Login_ii from "./pages/Login_ii";
import { authenticateToken } from "./services/authentication";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const a = await authenticateToken();
      setIsLoggedIn(a);
    };
    fetchData();
  }, []);
  return <>{isLoggedIn ? <MainContent /> : <Login_ii />}</>;
}

export default App;
