import React, { useState } from "react";
import { db } from "../Components/Config/firebaseConfig"; // Adjust path as needed
import { collection, addDoc } from "firebase/firestore";

export const Form = () => {
  // hackathon-84c1f
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    scheme: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "userForms"), formData);
      alert("Data saved successfully!");
      setSubmitted(true);
      setFormData({ name: "", phone: "", scheme: "" }); // Optional: reset form
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save data.");
    }
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your Name
        </label>
        <input
          name="name"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          placeholder="Please enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your Phone Number
        </label>
        <input
          name="phone"
          type="number"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your Scheme Name
        </label>
        <input
          name="scheme"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white"
          value={formData.scheme}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};
