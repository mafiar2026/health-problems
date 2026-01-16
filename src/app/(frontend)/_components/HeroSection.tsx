'use client'

import React, { useState, useEffect } from 'react'

export default function HeroSection({ page }: { page: any }) {

  // 🔥 COUNTDOWN TARGET (example: 24 hours from now)
  const OFFER_END_TIME = new Date().getTime() + 2 * 24 * 60 * 60 * 1000

  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = OFFER_END_TIME - now

      if (distance <= 0) {
        clearInterval(timer)
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
        })
        return
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((distance / (1000 * 60)) % 60)
      const seconds = Math.floor((distance / 1000) % 60)

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-5">
        {/* Left Content */}
        <div className="animate-slide-up">
          <div className="inline-flex items-center bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-2 mb-6">
            <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm font-medium bengali-text">
              প্রিমিয়াম কোয়ালিটি ই-বুক কালেকশন
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-bold mb-6 leading-tight">
            <span className="bengali-text">
              যৌ*ন স্বাস্থ্য সমস্যা ও সমাধানের Complete Guideline
            </span>
            <br />
            <span className="bengali-text price-highlight">পূর্ণাঙ্গ গাইড</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 modern-text">
            Professional Grade • High Resolution
          </p>

          {/* Price Section */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center gap-6 mb-4">
              <div className="text-center">
                <div className="text-sm text-gray-400 bengali-text">পূর্বের দাম</div>
                <div className="text-2xl text-red-400 line-through font-bold">৳১৫,০০০</div>
              </div>

              <div className="text-center">
                <div className="text-sm text-accent bengali-text">বর্তমান দাম</div>
                <div className="text-4xl font-bold price-highlight">৳২৪৯</div>
              </div>

              <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-center">
                <div className="text-sm font-bold bengali-text">৯৭% সাশ্রয়</div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="countdown-modern">
              <div className="text-center mb-4">
                <span className="text-lg font-semibold bengali-text text-accent">
                  ⏰ অফার শেষ হবে:
                </span>
              </div>
              <div id="countdown" className="flex justify-center gap-3">
                {[
                  { id: 'days', label: 'দিন', value: timeLeft.days },
                  { id: 'hours', label: 'ঘন্টা', value: timeLeft.hours },
                  { id: 'minutes', label: 'মিনিট', value: timeLeft.minutes },
                  { id: 'seconds', label: 'সেকেন্ড', value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.id} className="countdown-box">
                    <div className="text-2xl font-bold">{item.value}</div>
                    <div className="text-xs bengali-text">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:scale-105 transition-all shadow-2xl border-2 border-primary/30 hover:border-accent/50 hover:shadow-primary/30">
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span>
                <span className="whitespace-nowrap">ইনস্ট্যান্ট ডাউনলোড - ৳২৪৯</span>
              </span>
            </button>

            <button className="glass-card text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full text-base sm:text-lg font-bold hover:scale-105 transition-all border border-white/20 hover:border-white/40 hover:bg-white/10">
              <span className="flex items-center justify-center gap-2">
                <span>📋</span>
                <span>বিস্তারিত দেখুন</span>
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center gap-6 mt-8 pb-4">
            <div className="flex items-center">
              <div className="flex text-accent mr-2">⭐⭐⭐⭐⭐</div>
              <span className="text-sm text-gray-300">4.9/5 (১,২০০+ রিভিউ)</span>
            </div>

            <div className="flex items-center text-base text-gray-300">
              <svg className="w-4 h-4 mr-1 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="bengali-text">১০০% নিরাপদ ও নির্ভরযোগ্য</span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="relative animate-fade-in">
          <div className="relative z-10">
            <div className="glass-card p-8 floating-element">
              <div className="bg-linear-to-br from-secondary to-primary rounded-2xl p-8 text-center">
                <svg
                  className="w-32 h-32 mx-auto mb-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2zm0 0V5a2 2 0 012-2h6l2 2h6a2 2 0 012 2v2M7 13h10l-4-8H7l4 8z"
                  />
                </svg>

                <h3 className="text-2xl font-bold mb-2 bengali-text">
                  যৌ*ন স্বাস্থ্য সমস্যা ও সমাধানের Complete Guideline
                </h3>
                <p className="text-gray-200 bengali-text">PDF + JPG + AutoCAD ফরম্যাট</p>
              </div>
            </div>

            <div
              className="absolute -top-8 -right-8 glass-card p-4 text-center floating-element"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="text-2xl font-bold text-accent">৬ টি</div>
              <div className="text-sm bengali-text">বোনাস ই-বুক</div>
            </div>

            <div
              className="absolute -bottom-8 -left-8 glass-card p-4 text-center floating-element"
              style={{ animationDelay: '1s' }}
            >
              <div className="text-2xl font-bold text-accent">২৪/৭</div>
              <div className="text-sm bengali-text">সাপোর্ট</div>
            </div>
          </div>

          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 right-10 w-20 h-20 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
