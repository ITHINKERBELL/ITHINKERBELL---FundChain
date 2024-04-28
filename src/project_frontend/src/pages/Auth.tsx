import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  project_backend,
  createActor,
} from "../../../declarations/project_backend";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { useActor } from "../context/ActorContext";

const Auth: React.FC = () => {

  const navigate = useNavigate();
  const { setActor, actor } = useActor();

  // useEffect(() => {
  //   // const principal = actor.getMe();
  //   // console.log("getting the principal at the start --> " + principal.toString());
  // }, [actor]);


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
        navigate("/register");
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
  
  const userChecker = async (principal: Principal) => {
    try {
      console.log(principal);
      console.log("user checker --> " + principal.toString());
      const res = await actor.userChecker(principal);
      console.log(principal.toString());
      console.log(res);
      if (res === "unregistered") {
        console.log("User doesn't exist. Register first.");
        navigate("/register");
      } else if (res === "registered") {
        console.log("Sorry, this internet identity is already registered. Please try logging in with your existing account.");
        navigate("/auth");
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
      const principal = await newActor.getMe();
      console.log(principal);
      console.log("register button, principal --> " + principal.toString());
      await userChecker(principal);
    } catch (error) {
      console.error("Error logging in:", error);
    }
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
    </main>
  );
};

export default Auth;
