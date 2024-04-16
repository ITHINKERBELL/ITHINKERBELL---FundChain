import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateCampaign from './pages/CreateCampaign';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/home';

function App() {
  return (
    <Router>
      <div className="relative sm:-8 p-4 bg-white min-h-screen flex flex-row">
        <div className="sm:flex hidden mr-10 fixed">
          <Sidebar />
        </div>

        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/create-campaign" element={<CreateCampaign />} />
            {/* <Route path="/campaign-details/:id" element={<CampaignDetails />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
