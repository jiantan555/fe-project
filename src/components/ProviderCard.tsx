"use client";
import Link from "next/link";
import { Button } from "@mui/material";
import { ProviderItem } from "../interface";

export default function ProviderCard({ provider }: { provider: ProviderItem }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl hover:shadow-xl transition-shadow duration-300 flex flex-col h-full overflow-hidden font-sans">
      <div className="h-28 bg-gradient-to-r from-brand-50 to-brand-100 border-b border-slate-100 flex items-center justify-center">
        <span className="text-4xl">🚗</span>
      </div>
      <div className="flex flex-col flex-grow p-6 gap-2">
        <h2 className="text-xl font-bold text-slate-800 truncate">
          {provider.name}
        </h2>
        <p className="text-sm text-slate-500 line-clamp-2 min-h-[40px]">
          📍 {provider.address}
        </p>
        <p className="text-sm text-slate-600 font-medium mt-auto mb-4">
          📞 {provider.tel}
        </p>
        
        <Link href={`/providers/${provider._id}`} className="mt-auto block">
          <Button 
            variant="outlined" 
            disableElevation 
            className="w-full rounded-xl border-brand-600 text-brand-600 hover:bg-brand-50 font-sans font-semibold py-2"
          >
            View & Book
          </Button>
        </Link>
      </div>
    </div>
  );
}