import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

import { project_backend } from "../../../declarations/project_backend";

const CreateCampaign: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    businessOwner: "",
    businessName: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  const navigate = useNavigate();
  const [res, setRes] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState<number>(Date.now());

  // // thsi will get the current date
  // useEffect(() => {
  //   setCurrentDate(Date.now());
  // }, [form.deadline]);

  const handleFormFieldChange = (
    fieldName: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const deadlineTimestamp = Date.parse(form.deadline);

    // TODO: add more validations
    if (deadlineTimestamp <= Date.now()) {
      console.error("The deadline should be a date in the future.");
      return;
    }

    project_backend
      .createACampaign(
        form.businessOwner,
        form.businessName,
        form.description,
        form.target,
        form.deadline,
        form.image
      )
      .then((res) => {
        console.log(res);
        setRes(res);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("success");
  };

  return (
    <div className="border-[#1f1e1c] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 bg-white">
      {isLoading && <Loader />}
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-gray-100 rounded-lg">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-gray-800">
          Start a Campaign
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full mt-[65px] flex flex-col gap-[30px]"
      >
        <div className="flex flex-wrap gap-[40px]">
          <FormField
            id="businessOwner"
            labelName="Your Name *"
            placeholder="Juan Marie Delos Santos"
            inputType="text"
            value={form.businessOwner}
            handleChange={(e) => handleFormFieldChange("businessOwner", e)}
          />
          <FormField
            id="businessName"
            labelName="Business Name *"
            placeholder="Write your business name"
            inputType="text"
            value={form.businessName}
            handleChange={(e) => handleFormFieldChange("businessName", e)}
          />
        </div>

        <FormField
          id="image"
          labelName="Campaign image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange("image", e)}
        />

        <FormField
          id="story"
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          inputType=""
          value={form.description}
          handleChange={(e) => handleFormFieldChange("description", e)}
        />

        <div className="flex flex-wrap gap-[40px]">
          <FormField
            id="target"
            labelName="Goal *"
            placeholder="ETH 2.50"
            inputType="text"
            value={form.target}
            handleChange={(e) => handleFormFieldChange("target", e)}
          />
          <FormField
            id="deadline"
            labelName="End Date *"
            placeholder="End Date"
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange("deadline", e)}
          />
        </div>

        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit new campaign"
            styles="bg-[#1f1e1c]"
            handleClick={() => { }}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
