"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:8000/api"; // Laravel backend URL

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [message, setMessage] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      // If using API tokens (Laravel Sanctum), backend returns token
      const res = await axios.post(`${API_URL}/login`, form, {
        withCredentials: true, // needed for cookie-based auth
      });

      // If Laravel returns token:
      // localStorage.setItem("token", res.data.token);

      setMessage("Login successful");
      console.log(res.data); // contains user info
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setMessage(err.response?.data?.message || "Login failed");
      } else if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Login failed");
      }
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
