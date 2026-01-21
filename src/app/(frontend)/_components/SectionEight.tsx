'use client'

import React, { useState, useEffect } from 'react'
import CountDownTimer from './CountDownTimer'

export default function SectionEight({ page }: { page: any }) {
  // console.log(page)
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
    <section className="py-20 bg-dark-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center bg-linear-to-r from-red-500/20 to-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-6 py-3 mb-6">
          <span className="text-red-400 font-semibold bengali-text">🔥 সীমিত সময়ের অফার</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-8 bengali-text">
          <span className="price-highlight">৯৭% ছাড়ে</span> পাবেন সম্পূর্ণ প্যাকেজ
        </h2>

        <div className="glass-card p-8 max-w-2xl mx-auto mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 bengali-text text-red-400">
                অন্যান্য জায়গায়
              </h3>
              <div className="text-3xl font-bold text-red-400 line-through mb-2">৳১৫,০০০</div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li className="bengali-text">❌ সীমিত ই-বুক</li>
                <li className="bengali-text">❌ কম রেজুলেশন</li>
                <li className="bengali-text">❌ সাপোর্ট নেই</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 bengali-text text-accent">Vynteex </h3>
              <div className="text-4xl font-bold price-highlight mb-2">৳২৪৯</div>
              <ul className="text-sm text-green-400 space-y-1">
                <li className="bengali-text">✅ ৭ টি সম্পূর্ণ ই-বুক</li>
                <li className="bengali-text">✅ 4K+ রেজুলেশন</li>
                <li className="bengali-text">✅ ২৪/৭ সাপোর্ট</li>
              </ul>
            </div>
          </div>

          {/* Countdown in pricing */}
          <CountDownTimer />

          <button
            onClick={handleBuyNow}
            className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-lg mb-4"
          >
            🛒 এখনই কিনুন - মাত্র ৳২৪৯
          </button>

          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 mt-6">
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="bengali-text">সিকিউর সিস্টেম</span>
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="bengali-text">ইনস্ট্যান্ট ডাউনলোড</span>
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="bengali-text">লাইফটাইম এক্সেস</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
