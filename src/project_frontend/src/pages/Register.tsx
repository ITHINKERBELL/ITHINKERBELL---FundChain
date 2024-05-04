import React, { useEffect, useState } from 'react';
import {
  project_backend,
} from "../../../declarations/project_backend";
import { useAccount } from 'wagmi';



const Register: React.FC = () => {
  const [err, setErr] = useState<string | null>(null);
  const { address } = useAccount()
  const [formData, setFormData] = useState({
    wallet: address,
    email: '',
    username: '',
    userType: 'donor',
    firstName: '',
    lastName: '',
    middleName: '',
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
    project_backend
      .userRegistration(
        `${formData.wallet}`,
        `${formData.email}`,
        `${formData.username}`,
        `${formData.userType}`,
        `${formData.firstName}`,
        `${formData.lastName}`,
        `${formData.middleName}`,
        `${formData.birthday}`,
      )
      .then((res) => {
        console.log(res);
        if (res === "success") {
          document.location.reload()
        } else {
          setErr(res)
        }
      })
      .catch((error) => {
        console.error(error);
      });

  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {err && <label className='text-red-800'>{err}</label>}
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
          {/* TODO: change to radio button donor and organizer (?) as choices */}
          <label htmlFor="userType" className="block text-gray-700 font-semibold mb-2">
            User Type
          </label>
          <div>
            <input
              type="radio"
              name="userType"
              value="donor"
              checked={formData.userType === "donor"}
              onChange={handleChange}
            />
            <label htmlFor="Donor">Donor</label>
          </div>
          <div>
            <input
              type="radio"
              name="userType"
              value="user"
              checked={formData.userType === "user"}
              onChange={handleChange}
            />
            <label htmlFor="Trustee">Trustee</label>
          </div>
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
