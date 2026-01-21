'use client'

import { useEffect, useRef, useState } from 'react'

type TimeLeft = {
  days: string
  hours: string
  minutes: string
  seconds: string
}

export default function CountDownTimer() {
  // fixed once per mount
  const offerEndRef = useRef<number>(Date.now() + 2 * 24 * 60 * 60 * 1000)

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now()
      const distance = offerEndRef.current - now

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
    <div className="countdown-modern">
      <div className="text-center mb-4">
        <span className="text-lg font-semibold bengali-text text-accent">⏰ অফার শেষ হবে:</span>
      </div>

      <div className="flex justify-center gap-3">
        {[
          { label: 'দিন', value: timeLeft.days },
          { label: 'ঘন্টা', value: timeLeft.hours },
          { label: 'মিনিট', value: timeLeft.minutes },
          { label: 'সেকেন্ড', value: timeLeft.seconds },
        ].map((item) => (
          <div key={item.label} className="countdown-box">
            <div className="text-2xl font-bold">{item.value}</div>
            <div className="text-xs bengali-text">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
