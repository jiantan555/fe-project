"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Button, Alert } from "@mui/material";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", telephone: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, role: "user" }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        alert("Registration successful! Please log in.");
        router.push("/login");
      } else {
        setError(data.msg || data.message || "Registration failed. Email might already exist.");
      }
    } catch (err) {
      setError("A network error occurred.");
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 w-full max-w-md rounded-2xl shadow-sm border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
          <p className="text-slate-500 mt-2">Sign up to book your next rental car</p>
        </div>

        {error && <Alert severity="error" className="mb-6 font-sans">{error}</Alert>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField 
            label="Full Name" 
            required fullWidth 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
            InputProps={{ className: "font-sans" }}
            InputLabelProps={{ className: "font-sans" }}
          />
          <TextField 
            label="Telephone" 
            required fullWidth 
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} 
            InputProps={{ className: "font-sans" }}
            InputLabelProps={{ className: "font-sans" }}
          />
          <TextField 
            label="Email Address" 
            type="email" 
            required fullWidth 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
            InputProps={{ className: "font-sans" }}
            InputLabelProps={{ className: "font-sans" }}
          />
          <TextField 
            label="Password" 
            type="password" 
            required fullWidth 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            InputProps={{ className: "font-sans" }}
            InputLabelProps={{ className: "font-sans" }}
          />
          <Button 
            type="submit" 
            variant="contained" 
            disableElevation 
            size="large" 
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-bold font-sans mt-2"
          >
            Register
          </Button>
        </form>

        <div className="text-center mt-6 text-slate-500 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}