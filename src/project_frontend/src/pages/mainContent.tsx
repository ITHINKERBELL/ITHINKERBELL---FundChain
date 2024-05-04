import { useAccount } from "wagmi";
import UserPage from "../layout/User";
import DonorPage from "../layout/Donor";
import DefaultPage from "../layout/Default";
import Register from "./Register";

function MainContent() {

  const { address, isConnected } = useAccount()

  let usertype = "user"

  if (isConnected && usertype === "user") return <><UserPage /></>
  if (isConnected && usertype === "donor") return <><DonorPage /></>
  if (isConnected && usertype === null) return <><Register /></>
  return <><DefaultPage /></>
}

export default MainContent;
