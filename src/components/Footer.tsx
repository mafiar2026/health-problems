'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import dummyBuyers from './DummyBuyer'

// components/Header.tsx
export default function Footer() {
  const minutesOptions = [1, 2, 3, 5, 7, 8, 10, 13, 15, 20, 25, 30, 35, 40, 45, 50, 55, 58, 59]
  const lastIndex = useRef(0)
  useEffect(() => {
    console.log('lastIndex', lastIndex)
    // Show toast immediately
    const interval = setInterval(() => {
      let index
      do {
        index = Math.floor(Math.random() * dummyBuyers.length)
      } while (index === lastIndex.current)

      lastIndex.current = index
      const buyer = dummyBuyers[index]

      const minutes = minutesOptions[Math.floor(Math.random() * minutesOptions.length)]

      toast(
        <div className="flex items-center justify-center gap-2 ">
          <strong className="text-red-600">
            {buyer.name} from {buyer.city}
          </strong>
          <span>Purchased {minutes} minutes ago</span>
        </div>,
        {
          style: {
            width: 'max-content',
            zIndex: '100 !important',
          },
        },
      )
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className=" bg-black ">
      <footer className="bg-dark-card py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="max-w-[150px]">
                  <img
                    src="https://supabeex.com/upload/images/logo.png"
                    alt="Skillnest"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <p className="text-gray-400 bengali-text text-sm">
                বাংলাদেশের সবচেয়ে বিশ্বস্ত এবং সম্পূর্ণ ডিজিটাল ই-বুক প্রোভাইডার।
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 bengali-text">দ্রুত লিংক</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-accent transition-colors bengali-text">
                    হোম
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors bengali-text">
                    সম্পর্কে
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors bengali-text">
                    যোগাযোগ
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4 bengali-text">সাপোর্ট</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-accent transition-colors bengali-text">
                    হেল্প সেন্টার
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors bengali-text">
                    ডাউনলোড গাইড
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors bengali-text">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors bengali-text">
                    প্রাইভেসি পলিসি
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 bengali-text">যোগাযোগ</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-sm">info@skillnest.com</span>
                </div>

                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                    />
                  </svg>
                  <span className="text-sm">+880 1558-291907</span>
                </div>

                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4z"
                    />
                  </svg>
                  <span className="text-sm">www.Skillnest.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Skillnest. All rights reserved. | Made with ❤️ in
              Bangladesh
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
