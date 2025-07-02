"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Weapons Detection
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/" ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === "/about" ? "bg-slate-700 text-white" : "text-slate-300 hover:text-white hover:bg-slate-700"
              }`}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
