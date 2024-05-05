import React from "react";

interface CountBoxProps {
  title: string;
  value: string | number;
}

const CountBox: React.FC<CountBoxProps> = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[200px]">
      <h4 className="font-epilogue font-bold text-[30px] text-[#414141] p-3 bg-[#f1f6fa] rounded-t-[5px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-epilogue font-normal text-[16px] text-[#f1f6fa] bg-[#414141] px-3 py-2 w-full rounded-b-[5px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
