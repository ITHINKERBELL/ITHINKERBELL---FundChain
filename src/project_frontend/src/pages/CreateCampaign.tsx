import React, { useState, ChangeEvent, FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { ethers } from 'ethers';

// import useStateContext from '../context';
import money from '../assets/money.svg';
import CustomButton from '../components/CustomButton';
import FormField from '../components/FormField';
import Loader from '../components/Loader';
// import checkIfImage from '../utils/checkIfImage';

// Your code using checkIfImage function

const CreateCampaign: React.FC = () => {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',      
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("success");

    // checkIfImage(form.image, async (exists: boolean) => {
    //   if (exists) {
    //     setIsLoading(true);
    //     // await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
    //     // setIsLoading(false);
    //     navigate('/');
    //   } else {
    //     alert('Provide valid image URL');
    //     setForm({ ...form, image: '' });
    //   }
    // })
  }

  return (
    <div className="bg-[#1f1e1c] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Start a Campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Your Name *"
            placeholder="Juan Marie Delos Santos"
            inputType="text"
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField 
            labelName="Business Name *"
            placeholder="Write your business name"
            inputType="text"
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>

        <FormField 
            labelName="Campaign image *"
            placeholder="Place image URL of your campaign"
            inputType="url"
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />

        <FormField 
            labelName="Story *"
            placeholder="Write your story"
            isTextArea
            inputType=''
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        <div className="flex flex-wrap gap-[40px]">
          <FormField 
            labelName="Goal *"
            placeholder="ETH 2.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
          />
          <FormField 
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="Submit new campaign"
              styles="bg-white"
              handleClick={() => {}}
            />
          </div>
      </form>
    </div>
  );
}

export default CreateCampaign;
