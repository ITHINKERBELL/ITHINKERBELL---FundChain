import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  project_backend,
  createActor,
} from "../../../declarations/project_backend";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

const Auth: React.FC = () => {
  const [actor, setActor] = useState(project_backend);
  const navigate = useNavigate();

  const handleWhoAmIClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const whoAmIButton = e.currentTarget;
    whoAmIButton.setAttribute("disabled", "true");
    try {
      const principal = await actor.getMe();
      console.log(principal.toString());
      document.getElementById("principal")!.innerText = principal.toString();
    } catch (error) {
      console.error("Error retrieving principal:", error);
    } finally {
      whoAmIButton.removeAttribute("disabled");
    }
  };

  const handleLoginClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      let authClient = await AuthClient.create();
      await new Promise<void>((resolve) => {
        authClient.login({
          identityProvider:
            process.env.DFX_NETWORK === "ic"
              ? "https://identity.ic0.app"
              : "http://cuj6u-c4aaa-aaaaa-qaajq-cai.localhost:4943",
          onSuccess: resolve,
        });
      });
      const identity = authClient.getIdentity();
      const canisterId = process.env.CANISTER_ID_PROJECT_BACKEND;

    if (!canisterId) {
      throw new Error('CANISTER_ID_II_INTEGRATION_BACKEND is not set');
    }
    const newActor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
      setActor(newActor);
      console.log(actor);

      const principal = await newActor.getMe();
      console.log("login button, testing if it will get the right principal --> " + principal.toString());
      login(principal);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const login = async (principal: Principal) => {
    try {
      // calls the login function in the backend and pass the principal of the identity 
      const res = await actor.user_II_Login(principal);
      if (res === "User doesn't exist.") {
        console.log("User doesn't exist. Register first.");
        // TODO: navigate to the register page
      } else {
        const result = JSON.parse(res);
        console.log(result.message);
        console.log(result.user);
        if (result.message === "success") {
          navigate("/");
        };
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      let authClient = await AuthClient.create();
      await new Promise<void>((resolve) => {
        authClient.login({
          identityProvider:
            process.env.DFX_NETWORK === "ic"
              ? "https://identity.ic0.app"
              : "http://cuj6u-c4aaa-aaaaa-qaajq-cai.localhost:4943",
          onSuccess: resolve,
        });
      });
      const identity = authClient.getIdentity();
      const canisterId = process.env.CANISTER_ID_PROJECT_BACKEND;
      console.log(canisterId);

    if (!canisterId) {
      throw new Error('CANISTER_ID_II_INTEGRATION_BACKEND is not set');
    }
    const newActor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
      setActor(newActor);
      console.log(actor);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  /// register
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can add your logic for form submission
    console.log(formData);
    // Reset form after submission
    setFormData({
      email: '',
      username: '',
      userType: '',
      wallet: '',
      firstName: '',
      middleName: '',
      lastName: '',
      birthday: '',
    });
  };

  return (
    <main>
      {/* <img src="logo2.svg" alt="DFINITY logo" /> */}
      <br />
      <br />
      <form>
      <div className="bg-white shadow-md rounded-md p-4 w-40">
        <button
          id="login"
          onClick={handleLoginClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
        >
          Login
        </button>

        <button
          id="register"
          onClick={handleRegister}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mb-4"
        >
          Register
        </button>
        <p className="text-sm text-gray-600">Using your <b>Internet Identity</b></p>
      </div>
      </form>
      <br />
      <form>
        <button
          id="whoAmI"
          onClick={handleWhoAmIClick}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Who Am I
        </button>
      </form>
      <section id="principal" className="mt-4"></section>

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
    </main>
  );
};

export default Auth;
