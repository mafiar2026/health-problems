'use client'

import React, { useState, useEffect } from 'react'

export default function SectionSeven({ page }: { page: any }) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-6 bengali-text">
          🛍️ এখনই <span className="price-highlight">Skillnest এর কালেকশন</span> সংগ্রহ করুন!
        </h2>
        <p className="text-lg text-gray-300 mb-10 bengali-text">
          সীমিত সময়ের অফার! মাত্র <span className="text-accent font-bold">৳২৪৯</span> টাকায় পাবেন
          সম্পূর্ণ যৌ*ন স্বাস্থ্য সমস্যা ও সমাধানের Complete Guideline।
        </p>
        <button className="inline-block bg-gradient-to-r from-primary to-accent text-white px-10 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-xl">
          🚀 এখনই কিনুন
        </button>
      </div>
    </section>
  )
}
