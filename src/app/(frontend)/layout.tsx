import React from 'react'
import './styles.css'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Playfair_Display } from 'next/font/google'
import { Toaster } from 'sonner'
import FacebookPixel from '@/components/FacebookPixel'
// import { GoogleTagManager } from '@next/third-parties/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
})

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={playfair.variable}>
      {/* <GoogleTagManager gtmId="GTM-KXTSKLLN" gtmScriptUrl='' /> */}

      <body className="overflow-x-hidden">
        <FacebookPixel />
        <Toaster />
        <main className="overflow-x-hidden">
          {' '}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
