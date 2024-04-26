import React, { useState } from "react";
import {
  project_backend,
  createActor,
} from "../../../declarations/project_backend";
import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";

const Login_ii: React.FC = () => {
  const [actor, setActor] = useState(project_backend);
  console.log(process.env.CANISTER_ID_INTERNET_IDENTITY);

  const handleWhoAmIClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const whoAmIButton = e.currentTarget;
    whoAmIButton.setAttribute("disabled", "true");
    try {
      const principal = await actor.getMe();
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
      console.log(identity);

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

  return (
    <main>
      <img src="logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form>
        <button id="login" onClick={handleLoginClick}>
          Login!
        </button>
      </form>
      <br />
      <form>
        <button id="whoAmI" onClick={handleWhoAmIClick}>
          Who Am I
        </button>
      </form>
      <section id="principal"></section>
    </main>
  );
};

export default Login_ii;
