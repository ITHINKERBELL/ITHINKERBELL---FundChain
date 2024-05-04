import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCampaign from "../pages/./CreateCampaign";
import Sidebar from "../components/donor/Sidebar";
import Home from "../pages/./home";
import CampaignDetails from "../pages/./CampaignDetails";
import Profile from "../pages/./Profile";

function DonorPage() {

    return (
        <div className="relative bg-gray-100 min-h-screen flex flex-row">
            <div className="hidden sm:flex mr-10">
                <Sidebar />
            </div>
            <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pl-40">
                <div className="pl-5">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default DonorPage;