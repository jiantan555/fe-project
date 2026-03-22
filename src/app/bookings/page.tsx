"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import BookingCard from "../../components/BookingCard";
import { BookingItem } from "../../interface";

export default function BookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);

  useEffect(() => {
    if (session?.user?.token) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings`, {
        headers: { Authorization: `Bearer ${session.user.token}` },
      })
        .then((res) => res.json())
        .then((data) => setBookings(data.data || []));
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${session?.user?.token}` },
    });
    if (res.ok) setBookings(bookings.filter((b) => b._id !== id));
  };

  if (!session) return null;

  const isAdmin = session.user.role === "admin";

  return (
    <div className="mt-8 px-4 max-w-4xl mx-auto font-sans">
      <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          {isAdmin ? "Dashboard (All Bookings)" : "My Reservations"}
        </h1>
        <span className="px-3 py-1 bg-brand-50 text-brand-700 text-sm font-semibold rounded-full border border-brand-200">
          {bookings.length} Bookings
        </span>
      </div>
      
      {bookings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-lg text-slate-500 font-medium">You have no active bookings.</p>
          {!isAdmin && (
            <Link href="/providers">
              <button className="mt-6 px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-xl transition-colors shadow-sm">
                Explore Cars
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {bookings.map((booking) => (
            <BookingCard 
              key={booking._id} 
              booking={booking} 
              isAdmin={isAdmin} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}