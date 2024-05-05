import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import Loader from "../components/Loader";

import { project_backend } from "../../../declarations/project_backend";
import { useAccount } from "wagmi";

const CreateCampaign: React.FC = () => {

  const { address } = useAccount()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    businessOwner: "",
    businessName: "",
    description: "",
    target: "",
    deadline: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        let username = await project_backend.getUsernameByWalletAddress(`${address}`)
          .then((res) => {
            return res
          })
          .catch((error) => {
            return null
          })
        setForm({ ...form, businessOwner: `${username}` })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])
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
    setIsLoading(true);
    const deadlineTimestamp = Date.parse(form.deadline);

    // TODO: add more validations
    if (deadlineTimestamp <= Date.now()) {
      console.error("The deadline should be a date in the future.");
      return;
    }

    project_backend
      .createACampaign(
        form.businessOwner,
        `${address}`,
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
      })
      .finally(() => {
        setIsLoading(false);
      });

    console.log("success");
  };

  return (
    <div className="border-[#1f1e1c] flex justify-center items-start flex-col rounded-tr-lg rounded-br-lg p-10 m-5 bg-white shadow-md">
      {isLoading && <Loader />}
      <h1 className="font-epilogue font-semibold text-[30px] text-gray-400">
        Tell us more <br /> about <span className="text-[45px] text-gray-700">your business..</span>
      </h1>
      <div className="m-5" />
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[20px]">
        <div className="flex sm:flex-row gap-[60px]">
          <div className="flex flex-col gap-[10px]">
            <FormField
              id="businessOwner"
              labelName="Your Name *"
              disable={true}
              placeholder="Juan Marie Delos Santos"
              inputType="text"
              value={form.businessOwner}
              handleChange={(e) => handleFormFieldChange("businessOwner", e)}
              inputStyle={{ width: "450px", height: "50px" }}
              textareaStyle={{ width: "450px", height: "50px" }}
            />
            <FormField
              id="businessName"
              labelName="Business Name *"
              placeholder="Write your business name"
              inputType="text"
              value={form.businessName}
              handleChange={(e) => handleFormFieldChange("businessName", e)}
              inputStyle={{ width: "450px", height: "50px" }}
              textareaStyle={{ width: "450px", height: "50px" }}
            />
            <FormField
              id="image"
              labelName="Campaign image *"
              placeholder="Place image URL of your campaign"
              inputType="url"
              value={form.image}
              handleChange={(e) => handleFormFieldChange("image", e)}
              inputStyle={{ width: "450px", height: "50px" }}
              textareaStyle={{ width: "450px", height: "50px" }}
            />
            <FormField
              id="target"
              labelName="Goal *"
              placeholder="ETH 2.50"
              inputType="text"
              value={form.target}
              handleChange={(e) => handleFormFieldChange("target", e)}
              inputStyle={{ width: "450px", height: "50px" }}
              textareaStyle={{ width: "450px", height: "50px" }}
            />
            <FormField
              id="deadline"
              labelName="End Date *"
              placeholder="End Date"
              inputType="date"
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange("deadline", e)}
              inputStyle={{ width: "450px", height: "50px" }}
              textareaStyle={{ width: "450px", height: "50px" }}
            />
          </div>
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-row gap-[40px]">
              <FormField
                id="story"
                labelName="Business Story *"
                placeholder="Write your story"
                isTextArea
                inputType=""
                value={form.description}
                handleChange={(e) => handleFormFieldChange("description", e)}
                inputStyle={{ width: "450px", height: "440px" }}
                textareaStyle={{ width: "450px", height: "440px" }}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
            btnType="submit"
            title="Submit your business"
            styles="bg-[#1f1e1c]"
            handleClick={() => { }}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
