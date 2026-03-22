"use client";
import { use, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TextField, Button, Alert } from "@mui/material";
import Link from "next/link";

export default function ProviderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: session } = useSession();
  const router = useRouter();
  
  const [provider, setProvider] = useState<any>(null);
  const [bookingDate, setBookingDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers/${resolvedParams.id}`)
      .then((res) => res.json())
      .then((data) => setProvider(data.data));
  }, [resolvedParams.id]);

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/providers/${resolvedParams.id}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.token}`,
        },
        body: JSON.stringify({ bookingDate }),
      });
      
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess("Booking created successfully!");
        setError("");
        setTimeout(() => router.push("/bookings"), 1500);
      } else {
        setError(data.message || "Failed to create booking. You may have reached the limit.");
        setSuccess("");
      }
    } catch (err) {
      setError("Network error occurred");
    }
  };

  if (!provider) return <div className="mt-10 text-center font-sans text-slate-500">Loading...</div>;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 font-sans">
      <div className="bg-white p-8 w-full max-w-lg rounded-2xl shadow-sm border border-slate-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{provider.name}</h1>
        <p className="text-slate-600 mb-1">📍 {provider.address}</p>
        <p className="text-slate-600 font-medium mb-8">📞 {provider.tel}</p>

        {error && <Alert severity="error" className="mb-6 font-sans">{error}</Alert>}
        {success && <Alert severity="success" className="mb-6 font-sans">{success}</Alert>}

        {session ? (
          <form onSubmit={handleBook} className="flex flex-col gap-6">
            <TextField
              label="Pick-up Date"
              type="date"
              required
              InputLabelProps={{ shrink: true, className: "font-sans" }}
              InputProps={{ className: "font-sans" }}
              onChange={(e) => setBookingDate(e.target.value)}
            />
            <Button 
              type="submit" 
              variant="contained" 
              disableElevation
              size="large"
              className="bg-brand-600 hover:bg-brand-700 font-sans font-bold rounded-xl py-3 mt-2"
            >
              Confirm Booking
            </Button>
          </form>
        ) : (
          <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200 mt-4">
            <p className="text-slate-600 mb-4 font-medium">Please sign in to book this car.</p>
            <Link href="/login">
              <Button 
                variant="contained" 
                disableElevation
                className="bg-brand-600 hover:bg-brand-700 font-sans font-bold rounded-xl py-2 px-6"
              >
                Sign In to Book
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}