import MainContent from "./pages/mainContent";
import { ActorProvider } from "./context/ActorContext";

function App() {
  return (
    <ActorProvider>
      <MainContent />
    </ActorProvider>
  );
}

export default App;
