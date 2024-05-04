import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  project_backend,
  createActor,
} from "../../../declarations/project_backend";
import { useActor } from "../context/ActorContext";
import { Principal } from '@dfinity/principal';


// TODO: connect the form to userRegistration function in our backend

const Register: React.FC = () => {
  // const [actor, setActor] = useState(project_backend);
  const { actor } = useActor();
  const navigate = useNavigate();
  const [res, setRes] = useState<any>(null);
  const [principal, setPrincipal] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    userType: '',
    wallet: '',
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
  });

  useEffect(() => {
    console.log(actor);
    getMe();
  }, []);

  const getMe = async () => {
    const principal_id = await actor.getMe();
    setPrincipal(principal_id);
    console.log(principal_id.toString());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const emailInput = form.elements.namedItem(
      "email"
    ) as HTMLInputElement;
    const usernameInput = form.elements.namedItem(
      "username"
    ) as HTMLInputElement;
    const userTypeInput = form.elements.namedItem(
      "userType"
    ) as HTMLInputElement;
    const walletInput = form.elements.namedItem(
      "wallet") as HTMLInputElement;
    const firstNameInput = form.elements.namedItem(
      "firstName"
    ) as HTMLInputElement;
    const middleNameInput = form.elements.namedItem(
      "middleName") as HTMLInputElement;
    const lastNameInput = form.elements.namedItem(
      "lastName"
    ) as HTMLInputElement;
    const birthdayInput = form.elements.namedItem(
      "birthday") as HTMLInputElement;

    const emailValue = emailInput.value;
    const usernameValue = usernameInput.value;
    const userTypeValue = userTypeInput.value;
    const walletValue = walletInput.value;
    const firstNameValue = firstNameInput.value;
    const middleNameValue = middleNameInput.value;
    const lastNameValue = lastNameInput.value;
    const birthdayValue = birthdayInput.value;

    project_backend
      .userRegistration(
        principal,
        emailValue,
        usernameValue,
        userTypeValue,
        walletValue,
        firstNameValue,
        middleNameValue,
        lastNameValue,
        birthdayValue
      )
      .then((res) => {
        console.log(res);
        console.log("Registered successfully! Please login.")
        setRes(res);
        navigate("/auth");
      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userType" className="block text-gray-700 font-semibold mb-2">
            User Type
          </label>
          <input
            type="text"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="wallet" className="block text-gray-700 font-semibold mb-2">
            Wallet
          </label>
          <Link to="https://nns.ic0.app/" target="_blank" rel="noopener noreferrer">
            <div className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-2'> Get wallet address </div>
          </Link>

          <input
            type="text"
            id="wallet"
            name="wallet"
            value={formData.wallet}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="middleName" className="block text-gray-700 font-semibold mb-2">
            Middle Name
          </label>
          <input
            type="text"
            id="middleName"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthday" className="block text-gray-700 font-semibold mb-2">
            Birthday
          </label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
