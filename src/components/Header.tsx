'use client'

import Link from 'next/link'

// components/Header.tsx
export default function Header() {
  const handleBuyNow = () => {
    const el = document.getElementById('checkout')
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
  return (
    <div className="shadow-md fixed top-0 w-full  z-99 glass-card ">
      <header className="flex max-sm:flex-col max-sm:gap-3 items-center justify-between px-6 py-5  -sm  max-w-7xl mx-auto">
        <Link href="/" className="font-playfair text-[1.75rem] font-bold tracking-">
          যৌ*ন স্বাস্থ্য
        </Link>
        <button
          onClick={handleBuyNow}
          className="bg-linear-to-r from-primary to-accent text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform text-md cursor-pointer enroll_Now"
        >
          কিনুন
        </button>
      </header>
    </div>
  )
}
