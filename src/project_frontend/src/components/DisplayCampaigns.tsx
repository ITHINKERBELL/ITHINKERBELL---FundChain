import React from "react";
import { useNavigate } from "react-router-dom";
import FundCard from "./FundCard";
import { loader } from "../assets/index";
import NoCampaign from "./NoCampaign";

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: any[];
}

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
}: DisplayCampaignsProps) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign: any) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-gray text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain"
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <NoCampaign />
          // <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          //   You have not created any campaigns yet
          // </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign: any, index: number) => (
            <FundCard
              key={campaign.id} // Assuming campaign.id exists and is unique
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
