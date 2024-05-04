import React from "react";
import campaignIcon from "../assets/campaign-icon.svg";

const NoCampaign: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-col m-auto mt-8">
      <div>
        <img src={campaignIcon} alt="campaignicon" className="h-40 m-5" />
      </div>
      <div className="ml-4 text-center">
        <p className="text-2xl font-bold">Oops!<br />Seems like there’s no campaign yet...</p>
      </div>
    </div>
  );
};

export default NoCampaign;
