'use client'

import React, { useState, useEffect } from 'react'

export default function SectionSix({ page }: { page: any }) {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats */}
          <div>
            <h2 className="text-4xl font-bold mb-8 bengali-text">
              আমাদের <span className="price-highlight">সাফল্যের গল্প</span>
            </h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold price-highlight mb-2">১,২০০+</div>
                <div className="text-gray-300 bengali-text">সন্তুষ্ট মেম্বার</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold price-highlight mb-2">২,৫০,০০০</div>
                <div className="text-gray-300 bengali-text">ই-বুক</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold price-highlight mb-2">৯৯.৯%</div>
                <div className="text-gray-300 bengali-text">নির্ভুলতা</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold price-highlight mb-2">৫+ বছর</div>
                <div className="text-gray-300 bengali-text">অভিজ্ঞতা</div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <div className="text-accent mr-2">⭐⭐⭐⭐⭐</div>
                <span className="font-semibold">ডা. করিম উদ্দিন</span>
                <span className="text-gray-400 ml-2 bengali-text">
                  - যৌন ও প্রজনন স্বাস্থ্য বিশেষজ্ঞ
                </span>
              </div>
              <p className="text-gray-300 bengali-text">
                &quot;রোগীরা অনেকসময় লজ্জায় অনেক গুরুত্বপূর্ণ প্রশ্ন করতে পারে না। এই ই–বুক প্যাকেজটি
                তাদের জন্য দারুণ সহায়ক। খুব পরিষ্কারভাবে সব সমস্যার ব্যাখ্যা দেওয়া আছে। আমি আমার
                অনেক রোগীকেই এটা রিকমেন্ড করি।&quot;
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <div className="text-accent mr-2">⭐⭐⭐⭐⭐</div>
                <span className="font-semibold">সাইফুল ইসলাম নাসিম</span>
                <span className="text-gray-400 ml-2 bengali-text">- জনস্বাস্থ্য বিশেষজ্ঞ</span>
              </div>
              <p className="text-gray-300 bengali-text">
                &quot;বিয়ের পর ঘনিষ্ঠ সম্পর্ক নিয়ে সঠিক ধারণা না থাকায় আমাদের মধ্যে ভুল বোঝাবুঝি হতো। এই
                গাইডলাইনগুলো আমাদের সম্পর্ককে আরও স্বাস্থ্যকর ও বোঝাপড়াপূর্ণ করেছে। সত্যিই অসাধারণ
                একটি প্যাকেজ!&quot;
              </p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center mb-4">
                <div className="text-accent mr-2">⭐⭐⭐⭐⭐</div>
                <span className="font-semibold">সাবিহা রহমান</span>
                <span className="text-gray-400 ml-2 bengali-text">- মনোবিজ্ঞানী</span>
              </div>
              <p className="text-gray-300 bengali-text">
                &quot;সেক্সুয়াল হেলথ নিয়ে বিশ্বস্ত তথ্য এক জায়গায় পাওয়া কঠিন। এই প্যাকেজটি খুবই সাজানো,
                প্রফেশনাল এবং বাস্তবসম্মত। ব্যক্তিগত সচেতনতা বাড়াতে ও দাম্পত্য জীবন উন্নত করতে এটি
                ১০০% সহায়ক।&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
