import React, { useState } from "react";
import { db } from "./Config/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

type MySpeechRecognitionEvent = Event & {
  results: SpeechRecognitionResultList;
};

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;


export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    scheme: "",
  });
  const [listeningField, setListeningField] = useState<null | string>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "userForms"), formData);
      alert("Data saved successfully!");
      setFormData({ name: "", phone: "", scheme: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to save data.");
    }
  };

  const startListening = (field: string) => {
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListeningField(field);
    };

    recognition.onresult = (event: MySpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({
        ...prev,
        [field]: transcript,
      }));
      setListeningField(null);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      setListeningField(null);
    };

    recognition.start();
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      {["name", "phone", "scheme"].map((field) => (
        <div key={field} className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
            Your {field}
          </label>
          <div className="flex gap-2">
            <input
              name={field}
              type={field === "phone" ? "tel" : "text"}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white"
              placeholder={`Enter your ${field}`}
              value={(formData as any)[field]}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className={`px-3 py-2 rounded-lg text-white text-xs ${
                listeningField === field ? "bg-red-600" : "bg-green-600"
              }`}
              onClick={() => startListening(field)}
            >
              🎤 {listeningField === field ? "Listening..." : "Speak"}
            </button>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};
