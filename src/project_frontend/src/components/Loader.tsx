import React from 'react'
import HashLoader from "react-spinners/HashLoader";
import loader from '../assets/loader.svg';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      {/* <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain"/> */}
      <HashLoader color="#a9c0d0" />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center"><br /> Please wait...</p>
    </div>
  )
}

export default Loader
