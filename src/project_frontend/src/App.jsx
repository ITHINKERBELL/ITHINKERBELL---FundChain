import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCampaign from "./pages/CreateCampaign";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/home";
import CampaignDetails from "./pages/CampaignDetails";
import { ToastContainer } from "react-toastify";

function App() {

  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition: Bounce
    />
    {/* Same as */}
  <ToastContainer />

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
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
