import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-600 text-white flex items-center justify-center rounded-lg font-bold text-lg group-hover:bg-brand-500 transition-colors">
              R
            </div>
            <span className="font-bold text-xl text-slate-900 tracking-tight">
              Rent<span className="text-brand-600">Car</span>
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              href="/providers" 
              className="text-slate-600 hover:text-brand-600 font-medium transition-colors"
            >
              Providers
            </Link>

            {session?.user ? (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-4 ml-2">
                <Link 
                  href="/bookings" 
                  className="text-slate-600 hover:text-brand-600 font-medium transition-colors"
                >
                  My Bookings
                </Link>
                <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold">
                    {session.user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {session.user.name}
                  </span>
                </div>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link 
                  href="/login" 
                  className="text-slate-600 hover:text-brand-600 font-medium transition-colors px-3 py-2"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="bg-brand-600 hover:bg-brand-500 text-white px-5 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}