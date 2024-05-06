import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountBox from "../components/CountBox";
import Loader from "../components/Loader";
import { profile } from "../assets";
import { daysLeft } from "../utils";
import { calculateBarPercentage } from "../utils";
import { useAccount, useSendTransaction, useTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import { project_backend } from "../../../declarations/project_backend";
import { convertIdToUsername } from "../services/convertion";

interface Campaign {
  campaignId: string,
  title: string,
  ownerName: string,
  ownerWallet: string,
  description: string,
  target: string,
  deadline: string,
  amountCollected: number,
  image: string,
  donators: [],
  donations: []
}

const CampaignDetails: React.FC = () => {
  const { data: hash, sendTransaction, isPending } = useSendTransaction()
  const { state } = useLocation();
  const navigate = useNavigate();
  // const { donate, getDonations, contract, address } = useStateContext();
  const { address } = useAccount()
  const [usertype, setUsertype] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<any | null>({});
  const [username, setUsername] = useState<any>([]);

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
        setCampaign(await project_backend.getCampaignById(state.campaignId)
          .then((res) => {
            return res[0]
          })
          .catch((error) => {
            return null
          }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [address, state])

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState<
    { donator: string; donation: number }[]
  >([]);

  useEffect(() => {
    if (campaign.donators && campaign.donators.length > 0) {
      campaign.donators.map((data: any, idx: any) => {
        setDonators((prevState: any) => [...prevState, { donator: data, donation: campaign.donations[idx] }])
      })
    }
    const fetchData = async () => {
      const username = await Promise.all(campaign.donators.map((id: any) => convertIdToUsername(id)));
      setUsername(username);
    };
    if (campaign.donators && campaign.donators.length > 0) {
      fetchData();
    }
  }, [campaign])

  const remainingDays = daysLeft(new Date(campaign.deadline));
  // const fetchDonators = async () => {
  //   const data = await getDonations(campaign.pId);

  //   setDonators(data);
  // };

  // useEffect(() => {
  //   if (contract) fetchDonators();
  // }, [contract, address]);

  // useEffect(() => {
  //   console.log(state);
  // });

  const handleDonate = async () => {
    setIsLoading(true);
    sendTransaction({
      to: campaign.ownerWallet,
      value: parseEther(amount),
    });
    setIsLoading(false);
  };
  const result = useTransactionReceipt({
    hash: hash,
  });
  if (result.data) {
    console.log(result.data);
    const fetchData = async () => {
      await project_backend.updateCampaignOnDonation(campaign.campaignId, `${address}`, amount)
        .then((res) => {
          console.log(res)
          return res
        })
        .catch((error) => {
          console.log(error)
          return null
        });
    }

    if (result.data.status === "success") {
      fetchData()
    }
  }
  return (
    <div className="w-full bg-white shadow-md rounded-tr-lg rounded-br-lg p-10 mt-10 mb-10">
      {isLoading && <Loader />}

      <h3 className="font-epilogue mb-8 font-semibold text-[24px] text-[#414141] text-left leading-[26px] uppercase truncate pl-5">{campaign.title}</h3>

      <div className="flex justify-center items-center h-[350px]">
        <img
          src={campaign.image}
          alt="campaign"
          className="w-[800px] h-[350px] object-cover rounded-sm"
        />
      </div>
      <div className="w-full flex md:flex-row flex-col justify-center gap-[30px] mt-10">
        {/* <div
            // className="absolute h-full bg-[#4acd8d]"
            className="absolute h-[100px] w-[200px] bg-[#4acd8d]"
            style={{
              width: `${calculateBarPercentage(
                campaign.target,
                campaign.amountCollected
              )}%`,
              maxWidth: "100%",
            }}
          >

        </div> */}
        <div className="flex flex-wrap justify-center mt-4">
          <div className="mr-4">
            <CountBox title="Days Left" value={remainingDays} />
          </div>
          <div className="mr-4">
            <CountBox
              title={`Raised of ${campaign.target}`}
              value={Number(campaign.amountCollected)}
            />
          </div>
          <div>
            <CountBox title="Total Backers" value={campaign.donators ? campaign.donators.length : "0"} />
          </div>
        </div>
      </div>


      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px] p-10">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#414141] uppercase">
              Business Owner
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img
                  src={profile}
                  alt="user"
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-[#414141] break-all">
                  {campaign.ownerName}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  10 Campaigns
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#414141] uppercase">
              Business Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {campaign.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-[#414141] uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                      {index + 1}. {username[index]}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet.
                </p>
              )}
            </div>
          </div>
        </div>
        {usertype === "donor" &&
          <div className="flex-1">
            {/* <h4 className="font-epilogue font-semibold text-[18px] text-[#414141] uppercase flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
              Fund
            </h4> */}

            <div className="mt-[20px] flex flex-col p-4 bg-[#f1f6fa] rounded-[10px]">
              <p className="font-epilogue font-semibold text-[20px] leading-[30px] text-center text-[#414141]">
                FUND THE CAMPAIGN
              </p>
              <div className="mt-[30px]">
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-[#414141] text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="my-[20px] p-4">
                  <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-[#414141]">
                    Back it because you believe in it.
                  </h4>
                  <h4 className="font-epilogue font-normal text-[14px] leading-[22px] text-[#414141] mt-1">
                    Support the project for no reward, just because it speaks to
                    you.
                  </h4>
                </div>

                <button
                  disabled={isPending}
                  type="button"
                  className="font-epilogue font-semibold text-[16px] leading-[26px] text-white hover:bg-[#3b3a3a] min-h-[52px] px-4 rounded-[10px] w-full bg-[#414141] transition-all duration-300 ease-in-out"
                  onClick={handleDonate}
                >
                  {isPending ? 'Confirming...' : 'Fund'}
                </button>
                {hash && <div>Transaction Hash: {hash}</div>}
              </div>

            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default CampaignDetails;
