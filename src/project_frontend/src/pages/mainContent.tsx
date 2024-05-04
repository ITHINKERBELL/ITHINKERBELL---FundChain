import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import UserPage from "../layout/User";
import DonorPage from "../layout/Donor";
import DefaultPage from "../layout/Default";
import Register from "./Register";

import { project_backend } from "../../../declarations/project_backend";
function MainContent() {

  const { address, isConnected } = useAccount()
  let [usertype, setUsertype] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setUsertype(await project_backend.getUserTypeByWalletAddress(`${address}`)
          .then((res) => {
            return res
          })
          .catch((error) => {
            return null
          }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [isConnected, address])
  // TODO: Create a loading page before uncommenting this 
  // if (isConnected && usertype === null) return <><Loading /></>
  if (isConnected && usertype === "user") return <><UserPage /></>
  else if (isConnected && usertype === "donor") return <><DonorPage /></>
  else if (isConnected && usertype === "User not found") return <><Register /></>
  else return <><DefaultPage /></>
}

export default MainContent;
