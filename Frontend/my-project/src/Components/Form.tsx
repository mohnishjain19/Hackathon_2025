import React, { useState, useEffect } from "react";
import { db } from "../Components/Config/firebaseConfig";
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

const countryCodes = [
  { code: "+91", label: "India" },
  { code: "+1", label: "USA" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "Australia" },
];

export const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    scheme: "",
    countryCode: "+91",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    scheme: "",
  });

  const [listeningField, setListeningField] = useState<null | string>(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name" || name === "scheme") {
      if (!value.trim()) {
        error = `${name[0].toUpperCase() + name.slice(1)} is required.`;
      }
    }

    if (name === "phone") {
      if (!value) {
        error = "Phone number is required.";
      } else if (!/^\d+$/.test(value)) {
        error = "Phone number must contain digits only.";
      } else if (value.length !== 10) {
        error = "Phone number must be exactly 10 digits.";
      }
    }

    return error;
  };

  const validateAll = () => {
    const newErrors = {
      name: validateField("name", formData.name),
      phone: validateField("phone", formData.phone),
      scheme: validateField("scheme", formData.scheme),
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => e === "");
  };

  useEffect(() => {
    setIsFormValid(validateAll());
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));

    setSuccessMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      const dataToSubmit = {
        ...formData,
        fullPhone: formData.countryCode + formData.phone,
      };

      await addDoc(collection(db, "userForms"), dataToSubmit);
      setSuccessMsg("✅ Data submitted successfully!");
      setFormData({ name: "", phone: "", scheme: "", countryCode: "+91" });
      setErrors({ name: "", phone: "", scheme: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      setSuccessMsg("❌ Failed to submit. Please try again.");
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

    recognition.onstart = () => setListeningField(field);

    recognition.onresult = (event: MySpeechRecognitionEvent) => {
      let transcript = event.results[0][0].transcript.trim();

      // Remove spaces for phone number
      if (field === "phone") {
        transcript = transcript.replace(/\s+/g, "");
      }

      setFormData((prev) => ({
        ...prev,
        [field]: transcript,
      }));

      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, transcript),
      }));

      recognition.stop();
      setListeningField(null);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      recognition.stop();
      setListeningField(null);
    };

    recognition.onend = () => {
      setListeningField(null);
    };

    recognition.start();
  };

  return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit} noValidate>
      {["name", "scheme"].map((field) => (
        <div key={field} className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
            Your {field}
          </label>
          <div className="flex gap-2">
            <input
              name={field}
              type="text"
              className={`flex-1 bg-gray-50 border ${
                errors[field as keyof typeof errors]
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white`}
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
          {errors[field as keyof typeof errors] && (
            <p className="text-red-500 text-xs mt-1">
              {errors[field as keyof typeof errors]}
            </p>
          )}
        </div>
      ))}

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Phone Number
        </label>
        <div className="flex gap-2">
          <select
            name="countryCode"
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white"
            value={formData.countryCode}
            onChange={handleChange}
          >
            {countryCodes.map((code) => (
              <option key={code.code} value={code.code}>
                {code.label} ({code.code})
              </option>
            ))}
          </select>

          <input
            name="phone"
            type="tel"
            maxLength={10}
            className={`flex-1 bg-gray-50 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:text-white`}
            placeholder="Enter 10-digit number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className={`px-3 py-2 rounded-lg text-white text-xs ${
              listeningField === "phone" ? "bg-red-600" : "bg-green-600"
            }`}
            onClick={() => startListening("phone")}
          >
            🎤 {listeningField === "phone" ? "Listening..." : "Speak"}
          </button>
        </div>
        {errors.phone && (
          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
        )}
      </div>

      {successMsg && (
        <p
          className={`text-sm mb-4 ${
            successMsg.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {successMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={!isFormValid}
        className={`text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 ${
          isFormValid
            ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Submit
      </button>
    </form>
  );
};
