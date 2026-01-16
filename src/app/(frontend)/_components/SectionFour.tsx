'use client'

import React, { useState, useEffect } from 'react'

export default function SectionFour({ page }: { page: any }) {
  return (
    <section id="content" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          প্যাকেজে <span className="price-highlight"> কী আছে?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-lg font-bold mb-3 text-blue-600">
              ১. সুস্থ ও আনন্দময় ঘনিষ্ঠ জীবন
            </h3>
            <p className="text-gray-700 text-sm">Healthy Intimate Life - মূল গাইড</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border-l-4 border-green-600">
            <h3 className="text-lg font-bold mb-3 text-green-600">২. সুখময় যৌ*ন জীবন</h3>
            <p className="text-gray-700 text-sm">Keys to a Joyful Se*x Life</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg border-l-4 border-purple-600">
            <h3 className="text-lg font-bold mb-3 text-purple-600">৩. প্রতিদিনের প্রশ্ন ও উত্তর</h3>
            <p className="text-gray-700 text-sm">
              Daily Intimacy Guide: Real Questions &amp; Answers
            </p>
          </div>

          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg border-l-4 border-pink-600">
            <h3 className="text-lg font-bold mb-3 text-pink-600">৪. আকাঙ্ক্ষার বিজ্ঞান</h3>
            <p className="text-gray-700 text-sm">The Science of Desire</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border-l-4 border-yellow-600">
            <h3 className="text-lg font-bold mb-3 text-yellow-600">৫. সুখী দাম্পত্যের রহস্য</h3>
            <p className="text-gray-700 text-sm">Golden Rules of Intimacy</p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg border-l-4 border-red-600">
            <h3 className="text-lg font-bold mb-3 text-red-600">
              ৬. লিঙ্গোত্থানজনিত সমস্যা ও অকাল বীর্যপাত
            </h3>
            <p className="text-gray-700 text-sm">Erectile Dysfunction And Premature Ejaculation</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border-l-4 border-blue-600">
            <h3 className="text-lg font-bold mb-3 text-blue-600">
              ৭. মেয়েদের পিরিয়ড সমস্যা ও ঘনিষ্ঠ স্বাস্থ্য
            </h3>
            <p className="text-gray-700 text-sm">Female Period Problems &amp; Intimate Health</p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-blue-600">+ সম্পূর্ণ ই-বুক প্যাকেজ</h3>
          <p className="text-gray-700 mb-4">সব গাইড একসাথে পাবেন সুবিধাজনক ফরম্যাটে:</p>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <li className="flex items-center text-gray-500">
              <span className="text-green-500 mr-3">✓</span> PDF ফরম্যাট
            </li>
            <li className="flex items-center text-gray-500">
              <span className="text-green-500 mr-3">✓</span> মোবাইল অ্যাপ ফরম্যাট
            </li>
            <li className="flex items-center text-gray-500">
              <span className="text-green-500 mr-3">✓</span> প্রিন্টযোগ্য ভার্সন
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
