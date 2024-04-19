import { useState, useEffect } from 'react'

import DisplayCampaigns from '../components/DisplayCampaigns';
import {useStateContext} from '../context/index';
import { project_backend } from '../declarations/project_backend';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<any>([]);

//   const { address, contract, getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);

    project_backend.getAllCampaigns().then((res) => {
      console.log(res);
      setCampaigns(res);
    }
    );
    setIsLoading(false);
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home