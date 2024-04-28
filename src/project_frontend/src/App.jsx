import React, { useEffect, useState } from "react";
import MainContent from "./pages/mainContent";
import { authenticateToken } from "./services/authentication";
import { ActorProvider } from "./context/ActorContext"; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const a = await authenticateToken();
      setIsLoggedIn(a);
    };
    fetchData();
  }, []);

  return (
    <ActorProvider> 
      {isLoggedIn ? <MainContent /> : <MainContent />}
    </ActorProvider>
  );
}

export default App;