'use client'

import React, { useState, useEffect } from 'react'

export default function SectionEight({ page }: { page: any }) {

   const handleBuyNow = () => {
     const el = document.getElementById('checkout')
     if (el) {
       el.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
       })
     }
   }

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
              <h3 className="text-xl font-semibold mb-4 bengali-text text-accent">Skillnest </h3>
              <div className="text-4xl font-bold price-highlight mb-2">৳২৪৯</div>
              <ul className="text-sm text-green-400 space-y-1">
                <li className="bengali-text">✅ ৭ টি সম্পূর্ণ ই-বুক</li>
                <li className="bengali-text">✅ 4K+ রেজুলেশন</li>
                <li className="bengali-text">✅ ২৪/৭ সাপোর্ট</li>
              </ul>
            </div>
          </div>

          {/* Countdown in pricing */}
          <div className="countdown-modern mb-6">
            <div className="text-center mb-4">
              <span className="text-lg font-semibold bengali-text text-accent">
                ⏰ অফার শেষ হতে বাকি:
              </span>
            </div>
            <div className="flex justify-center gap-3">
              <div className="countdown-box">
                <div id="pricing-days" className="text-xl font-bold">
                  {timeLeft.days}
                </div>
                <div className="text-xs bengali-text">দিন</div>
              </div>
              <div className="countdown-box">
                <div id="pricing-hours" className="text-xl font-bold">
                  {timeLeft.hours}
                </div>
                <div className="text-xs bengali-text">ঘন্টা</div>
              </div>
              <div className="countdown-box">
                <div id="pricing-minutes" className="text-xl font-bold">
                  {timeLeft.minutes}
                </div>
                <div className="text-xs bengali-text">মিনিট</div>
              </div>
              <div className="countdown-box">
                <div id="pricing-seconds" className="text-xl font-bold">
                  {timeLeft.seconds}
                </div>
                <div className="text-xs bengali-text">সেকেন্ড</div>
              </div>
            </div>
          </div>

          <button onClick={handleBuyNow} className="w-full bg-gradient-to-r from-primary to-accent text-white py-4 rounded-full text-xl font-bold hover:scale-105 transition-all shadow-lg mb-4">
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
