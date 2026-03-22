"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextField, Button, Alert } from "@mui/material";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", { redirect: false, email, password });
    if (result?.error) setError("Invalid email or password");
    else { router.push("/providers"); router.refresh(); }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 w-full max-w-md rounded-2xl shadow-sm border border-slate-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 mt-2">Sign in to manage your rental car bookings</p>
        </div>

        {error && <Alert severity="error" className="mb-6 font-sans">{error}</Alert>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField 
            label="Email Address" 
            type="email" 
            variant="outlined"
            required fullWidth 
            onChange={(e) => setEmail(e.target.value)} 
            InputProps={{ className: "font-sans" }}
            InputLabelProps={{ className: "font-sans" }}
          />
          <TextField 
            label="Password" 
            type="password" 
            variant="outlined"
            required fullWidth 
            onChange={(e) => setPassword(e.target.value)} 
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
            Sign In
          </Button>
        </form>

        <div className="text-center mt-6 text-slate-500 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}