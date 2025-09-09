"use client";

import { useState } from "react";
import {
  Bell,
  Menu,
  Briefcase,
  LayoutGrid,
  User2,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white shadow-sm py-3 ">
      <div className="mx-auto flex  items-center justify-between px-4 py-3 md:px-6 innerContainerWrapper">
       <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Tallento.ai" 
            className="h-16 w-auto" 
            width={100} 
            height={20} 
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-black">
          <a
            href="#category"
            className="flex flex-col items-center text-sm font-semibold hover:text-[#f03a74]"
          >
            <LayoutGrid className="h-5 w-5 mb-1" />
            Job Category
          </a>

          <a
            href="#jobs"
            className="flex flex-col items-center text-sm font-semibold hover:text-[#f03a74]"
          >
            <Briefcase className="h-5 w-5 mb-1" />
            Find Jobs
          </a>

          <button className="relative flex flex-col items-center text-sm font-semibold hover:text-[#f03a74]">
            <Bell className="h-5 w-5 mb-1" />
            Notifications
            <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
              2
            </span>
          </button>

          <a
            href="#profile"
            className="flex flex-col items-center text-sm font-semibold hover:text-[#f03a74]"
          >
            <User2 className="h-5 w-5 mb-1" />
            Profile
          </a>
        </nav>

        <a
          href="#post"
          className="hidden md:inline-block rounded-md bg-gradient-to-r from-[#f97c35] to-[#f03a74] hover:from-[#f88c45] hover:to-[#f04a84] px-5 py-2 text-sm font-semibold text-white shadow"
        >
          Post A Free Job !
        </a>

      
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

     
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-slate-200 transform transition-transform duration-300 z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 space-y-6 text-black">
          <a href="#category" className="flex items-center gap-2 text-sm font-medium">
            <LayoutGrid className="h-5 w-5" /> Job Category
          </a>
          <a href="#jobs" className="flex items-center gap-2 text-sm font-medium">
            <Briefcase className="h-5 w-5" /> Find Jobs
          </a>
          <a href="#notifications" className="flex items-center gap-2 text-sm font-medium relative">
            <Bell className="h-5 w-5" /> Notifications
            <span className="absolute ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              2
            </span>
          </a>
          <a href="#profile" className="flex items-center gap-2 text-sm font-medium">
            <User2 className="h-5 w-5" /> Profile
          </a>
          <a
            href="#post"
            className="mt-4 w-full text-center rounded-md bg-gradient-to-r from-[#f97c35] to-[#f03a74] hover:from-[#f88c45] hover:to-[#f04a84] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            Post A Free Job !
          </a>
        </nav>
      </div>

 
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}
    </header>
  );
}
