"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:8000/api"; // Laravel backend URL

type FormData = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  gender: string;
  hobbies: string[];
  country: string;
};

const hobbiesOptions = ["Reading", "Gaming", "Traveling", "Sports"];
const countries = ["USA", "UK", "Canada", "Australia"];

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>({
    full_name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    gender: "",
    hobbies: [],
    country: "",
  });

  const [message, setMessage] = useState<string>("");

  // Handle text / select inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkboxes (hobbies)
  const handleHobbyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm((prev) => {
      const hobbies = new Set(prev.hobbies);
      if (checked) hobbies.add(value);
      else hobbies.delete(value);
      return { ...prev, hobbies: Array.from(hobbies) };
    });
  };

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/register`, form);
      setMessage(res.data.message);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Registration failed");
      } else if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Registration failed");
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password_confirmation"
          value={form.password_confirmation}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="border p-2 rounded"
          required
        />

        {/* Gender */}
        <div>
          <label className="block mb-1 font-semibold">Gender:</label>
          <div className="flex gap-4">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                  required
                />
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div>
          <label className="block mb-1 font-semibold">Hobbies:</label>
          <div className="flex flex-wrap gap-2">
            {hobbiesOptions.map((h) => (
              <label key={h} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  value={h}
                  checked={form.hobbies.includes(h)}
                  onChange={handleHobbyChange}
                />
                {h}
              </label>
            ))}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1 font-semibold">Country:</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Country</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
