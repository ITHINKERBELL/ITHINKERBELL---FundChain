import React, { useEffect, useState } from 'react';
import { useActor } from "../context/ActorContext";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const { actor } = useActor();
  const navigate = useNavigate();

  // const [principal, setPrincipal] = useState<any>(null);

  useEffect(()=>{
    console.log(actor);
    getMe();
  }, []);

  const getMe = async () => {
    const principal_id = await actor.getMe();
    console.log(principal_id.toString());
    // setPrincipal(principal_id);
    const res = await actor.userDetails(principal_id);
      console.log(res);
      if (res === "unregistered") {
        navigate("/");
      } else if (res.message === "success") {
        console.log(res);
        console.log(res.user); // user details
      }
  };

  return (
    <div>
      Profile
      Transactions
    </div>
  )
}

export default Profile
