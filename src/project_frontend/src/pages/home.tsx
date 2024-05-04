import { useState, useEffect } from "react";
import DisplayCampaigns from "../components/DisplayCampaigns";
import { project_backend } from "../../../declarations/project_backend";
import SearchBar from "../components/Searchbar";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<any>([]);

  //   const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);

    project_backend.getAllCampaigns().then((res) => {
      console.log(res);
      setCampaigns(res);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div>
      <div className="mt-10 mb-10 flex flex-row items-center justify-between">
        <SearchBar /> 
        <w3m-button />
      </div>

      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Home;
