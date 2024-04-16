import React from 'react';

interface CustomButtonProps {
  btnType: "button" | "submit" | "reset";
  title: string;
  handleClick: () => void;
  styles?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white hover:bg-[#3b3a3a] min-h-[52px] px-4 rounded-[10px] ${styles || ''} transition-all duration-300 ease-in-out`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
