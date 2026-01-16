'use client'

import React, { useState, useEffect } from 'react'

export default function SectionTwo({ page }: { page: any }) {
  return (
    <section id="features" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          এই গাইড থেকে <span className="price-highlight"> কী শিখবেন?</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8 text-center group rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-red-600">সাধারণ সমস্যা এবং সমাধান</h3>
            <p className="text-gray-200 mb-6 leading-relaxed">
              যেই সমস্যাগুলো ডাক্তারকে দেখাতে লজ্জা পাচ্ছেন সেগুলোর অনেক কিছুই নিজে থেকে বুঝে ফেলতে
              পারবেন।
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              পুরুষ এবং নারী উভয়েরই সবচেয়ে কমন যৌ*ন স্বাস্থ্য সমস্যা এবং সেগুলোর সমাধান নিয়ে
              বিস্তারিতভাবে আলোচনা করা হয়েছে।
            </p>
            <ul className="space-y-2 text-gray-100">
              <li>✓ পুরুষদের সাধারণ সমস্যা</li>
              <li>✓ মহিলাদের স্বাস্থ্য সমস্যা</li>
              <li>✓ দ্রুত সমাধানের উপায়</li>
              <li>✓ স্ব-সহায়তা গাইডলাইন</li>
            </ul>
          </div>

          <div className="glass-card p-8 text-center group rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-red-600">আনন্দময় জীবন গড়ুন</h3>
            <p className="text-gray-100 mb-6 leading-relaxed">
              দাম্পত্য জীবনে সে*ক্স লাইফকে কীভাবে শারীরিকভাবে এবং মানসিকভাবে আরও আনন্দময় করতে হয়
              তা শিখবেন।
            </p>
            <p className="text-gray-200 mb-6 leading-relaxed">
              &apos;মানুষ জেনে যাবে!&apos; এই ভয়ে যেই সমস্যাগুলো চেপে রেখেছেন, তার সমাধান পাবেন।
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>✓ যোগাযোগের দক্ষতা বৃদ্ধি</li>
              <li>✓ মানসিক সংযোগ গভীর করা</li>
              <li>✓ শারীরিক ও মানসিক ভারসাম্য</li>
              <li>✓ দীর্ঘমেয়াদী সুখ ধরে রাখা</li>
            </ul>
          </div>

          <div className="glass-card p-8 text-center group rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-red-600">বিবাহ-পূর্ব জ্ঞান</h3>
            <p className="text-gray-100 mb-6 leading-relaxed">
              বিয়ের আগে যেই জিনিসগুলো জানা না থাকলে সংসার ভেঙে যায়, সেগুলো এই প্যাকেজে খুবই
              গুছিয়ে উপস্থাপন করা হয়েছে।
            </p>
            <p className="text-gray-200 mb-6 leading-relaxed">
              একটি সুস্থ্য দাম্পত্য জীবনের জন্য এই গাইড অপরিহার্য।
            </p>
            <ul className="space-y-2 text-gray-300">
              <li>✓ প্রত্যাশা পূরণের উপায়</li>
              <li>✓ সম্পর্ক গভীর করার কৌশল</li>
              <li>✓ সাধারণ ভুলগুলি এড়িয়ে চলা</li>
              <li>✓ দীর্ঘস্থায়ী সম্পর্ক তৈরি করা</li>
            </ul>
          </div>

          <div className="glass-card p-8 text-center group rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-red-600">গো*প্নাঙ্গে*র যত্ন</h3>
            <p className="text-gray-100 mb-6 leading-relaxed">
              নারী এবং পুরুষ উভয়ের যৌ*ন স্বাস্থ্য ও সমস্যা নিয়ে বিস্তারিতভাবে আলোচনা করা হয়েছে।
            </p>
            <p className="text-gray-100 mb-6 leading-relaxed">
              গোপ্নাঙ্গের সমস্যা চিহ্নিত করা থেকে সমাধান করা পর্যন্ত সবকিছু।
            </p>
            <ul className="space-y-2 text-gray-100">
              <li>✓ মহিলাদের পিরিয়ড সমস্যা</li>
              <li>✓ ঘনিষ্ঠ স্বাস্থ্য রক্ষা</li>
              <li>✓ সংক্রমণ প্রতিরোধ</li>
              <li>✓ স্বাস্থ্যকর জীবনযাত্রা</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
