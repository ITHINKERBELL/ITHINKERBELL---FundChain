import { useEffect } from 'react';
import { tagType } from '../assets/index';
import logo from "../../public/fundchain_logo.png"
import { daysLeft } from '../utils/index';
interface FundCardProps {
  ownerName: string;
  title: string;
  description: string;
  target: number;
  deadline: any;
  amountCollected: number;
  image: string;
  handleClick: () => void;
}


const FundCard = ({ ownerName, title, description, target, deadline, amountCollected, image, handleClick }: FundCardProps) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div className="bg-[#FFFFFF] shadow-md rounded-tr-lg rounded-br-lg cursor-pointer flex p-2 items" onClick={handleClick}>
      <img src={image} alt="fund" className="w-[300px] h-[200px] object-cover m-5 items-center" />

      <div className="flex flex-col flex-1 p-4">
        {/* <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain" />
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
        </div> */}

        <div className="block">
        <h3 className="font-epilogue mb-5 font-semibold text-[16px] text-[#808191] text-left leading-[26px] truncate">{title}</h3>
        <div className="description-container overflow-y-hidden mb-5 mr-5 text-justify">
          <p className="font-epilogue font-normal text-[#808191] text-left leading-[18px]">{description}</p>
        </div>
      </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-normal text-[14px] text-[#808191] leading-[22px]">Amount Collected: {Number(amountCollected)}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[14px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised of {target}</p>
          </div>
          
        </div>

        <div className="flex items-center flex-row mt-[25px] gap-[12px] justify-between">
          {/* <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
            <img src={logo} alt="user" className="w-1/2 h-1/2 object-contain" />
          </div> */}
          <p className="font-epilogue font-normal text-[14px] text-[#808191] truncate">By <span className="text-[#808191] font-semibold">{ownerName}</span></p>
          <p className="mt-[3px] font-epilogue font-normal text-[14px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate mr-5">{remainingDays} days left</p>
        </div>
      </div>
    </div>
  )
}

export default FundCard