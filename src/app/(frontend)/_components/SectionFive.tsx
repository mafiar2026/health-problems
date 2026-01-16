'use client'

import React, { useState, useEffect } from 'react'

export default function SectionFive({ page }: { page: any }) {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 mb-6">
            <span className="text-accent font-semibold bengali-text">🎯 কেন Skillnest ই-বুক?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bengali-text">
            প্রিমিয়াম <span className="price-highlight">ফিচারসমূহ</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="glass-card p-8 text-center group">
            <div className="feature-icon mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 bengali-text">১০০% নির্ভুল </h3>
            <p className="text-gray-300 bengali-text">
              গবেষণা-ভিত্তিক প্রমাণিত কৌশল যা আসলেই কাজ করে।
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-8 text-center group">
            <div className="feature-icon mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 bengali-text">প্রাকৃতিক সমাধান</h3>
            <p className="text-gray-300 bengali-text">
              কোনো ক্ষতিকর কেমিক্যাল নয় — সম্পূর্ণ প্রাকৃতিক উপায়।
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-8 text-center group">
            <div className="feature-icon mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 bengali-text">হাই রেজুলেশন</h3>
            <p className="text-gray-300 bengali-text">
              4K+ রেজুলেশনে প্রিন্ট করুন। A4 থেকে A0 সাইজ পর্যন্ত ক্রিস্টাল ক্লিয়ার প্রিন্ট
              কোয়ালিটি।
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card p-8 text-center group">
            <div className="feature-icon mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 bengali-text">সিকিউর ডাউনলোড</h3>
            <p className="text-gray-300 bengali-text">
              Google Drive এর মাধ্যমে নিরাপদ ও দ্রুত ডাউনলোড।
            </p>
          </div>

          {/* Feature 5 */}
          <div className="glass-card p-8 text-center group">
            <div className="feature-icon mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 bengali-text">ইনস্ট্যান্ট এক্সেস</h3>
            <p className="text-gray-300 bengali-text">
              পারচেজের সাথে সাথেই ডাউনলোড লিংক পাবেন। কোন অপেক্ষা নয়, তৎক্ষণাত ব্যবহার শুরু করুন।
            </p>
          </div>

          {/* Feature 6 */}
          <div className="glass-card p-8 text-center group">
            <div className="feature-icon mx-auto">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-4 bengali-text">২৪/৭ সাপোর্ট</h3>
            <p className="text-gray-300 bengali-text">
              যেকোনো সমস্যায় আমাদের এক্সপার্ট টিম আছে আপনার পাশে। ফোন, ইমেইল বা চ্যাটে যোগাযোগ
              করুন।
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
