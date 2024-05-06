import React, { useEffect, useState } from 'react';
import { useActor } from "../context/ActorContext";
import { useNavigate } from "react-router-dom";
import { useWalletInfo } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi';
import { project_backend } from "../../../declarations/project_backend";
import NoHistory from '../components/NoHistory';
import { convertIdToTitle } from '../services/convertion';
import TransactionHistory from '../components/TransactionHistory';

const Profile = () => {
  const { address } = useAccount();
  const [userData, setUserData] = useState<any>(null);
  const [titles, setTitles] = useState<any>(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const result = await project_backend.getUserDetailsByWalletAddress(`${address}`);
    const res = JSON.parse(result);
    setUserData(res);
  };

  useEffect(() => {
    const fetchData = async () => {
      const titles = await Promise.all(userData.historyCampaigns.map((id: any) => convertIdToTitle(id)));
      setTitles(titles);
    };
    if (userData && userData.historyCampaigns) {
      fetchData();
    }
  }, [userData]);
  return (
    <div className="mt-16">
      <div className="">
        <h1 className="py-8 text-4xl font-medium text-gray-700 py-2">
          {userData && `Hello, ${userData.name.firstName}!`}
        </h1>
        <div className="border-[#1f1e1c] w-1200 flex items-start flex-col rounded-tr-lg rounded-br-lg p-10 bg-white shadow-md">
          {userData && (
            <>
              <h1 className='text-s text-[#2d2d2d] my-2'>
                <b>Name</b> : {userData.name && `${userData.name.firstName} ${userData.name.lastName}`}
              </h1>
              <h1 className='text-s text-[#2d2d2d] my-2'>
                <b>Email</b> : {userData.email}
              </h1>
              <h1 className='text-s text-[#2d2d2d] my-2'>
                <b>Birthday</b> : {userData.name && userData.name.birthday}
              </h1>
            </>
          )}
        </div>
      </div>
      <TransactionHistory userData={userData} titles={titles} />
    </div>
  );
};

export default Profile;
