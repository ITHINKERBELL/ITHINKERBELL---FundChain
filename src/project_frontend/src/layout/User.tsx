import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCampaign from "../pages/./CreateCampaign";
import Sidebar from "../components/user/Sidebar";
import Home from "../pages/./home";
import CampaignDetails from "../pages/./CampaignDetails";
import Profile from "../pages/./Profile";

function UserPage() {

  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-row">
      <div className="hidden sm:flex mr-10">
        <Sidebar />
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pl-40">
          <div className="pl-5">
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserPage;