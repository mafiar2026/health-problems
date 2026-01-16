/* eslint-disable @typescript-eslint/no-explicit-any */

'use client'

import React, { useState, useEffect } from 'react'
import './AgeMaintainEbook.css'

const AgeMaintainEbook = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // FAQ toggle state
  const [openFaq, setOpenFaq] = useState(null)

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { days, hours, minutes, seconds } = prev

        if (seconds > 0) {
          return { ...prev, seconds: seconds - 1 }
        } else if (minutes > 0) {
          return { ...prev, minutes: minutes - 1, seconds: 59 }
        } else if (hours > 0) {
          return { ...prev, hours: hours - 1, minutes: 59, seconds: 59 }
        } else if (days > 0) {
          return { ...prev, days: days - 1, hours: 23, minutes: 59, seconds: 59 }
        } else {
          clearInterval(timer)
          return { days: 0, hours: 0, minutes: 0, seconds: 0 }
        }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Toggle FAQ
  const toggleFaq = (index: any) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="age-maintain-container">
      {/* Problems section */}
      <section className="problems-section">
        <div className="section-header">
          <div className="section-icon">❗</div>
          <h2>আপনিও কি এই সমস্যায় ভুগছেন?</h2>
        </div>

        <h3 className="section-subtitle">এই সমস্যাগুলো কি চেনা লাগছে?</h3>

        <div className="problems-grid">
          <div className="problem-card">
            <div className="problem-icon">😔</div>
            <h4>আয়নায় নিজেকে আগের মতো লাগছে না?</h4>
            <p>স্কিনে টানটান ভাব ও গ্লো হারিয়ে গেছে, চোখের নিচে দাগ বাড়ছে</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">💔</div>
            <h4>বলিরেখা ও লুজ স্কিনে আত্মবিশ্বাস কমছে?</h4>
            <p>চেহারায় বয়সের ছাপ দেখে মন খারাপ হয়ে যাচ্ছে</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">💸</div>
            <h4>দামি ক্রিম ও ট্রিটমেন্টে ফল পাচ্ছেন না?</h4>
            <p>হাজার টাকা খরচেও স্থায়ী সমাধান মিলছে না</p>
          </div>

          <div className="problem-card">
            <div className="problem-icon">🤔</div>
            <h4>ভাবছেন বয়স রোধ করা অসম্ভব?</h4>
            <p>আসল সমাধান কী তা জানা নেই</p>
          </div>
        </div>
      </section>

      {/* Solution section */}
      <section className="solution-section">
        <div className="solution-content">
          <div className="solution-icon">✅</div>
          <h2>সমাধান এখন আপনার হাতে!</h2>
          <p className="solution-text">
            বিজ্ঞান বলছে — বয়সের ছাপ কমানো সম্পূর্ণ সম্ভব! এবং এটা করা যায় একেবারে প্রাকৃতিক ও
            বৈজ্ঞানিক উপায়ে, কোনো পার্শ্বপ্রতিক্রিয়া ছাড়াই।
          </p>
        </div>
      </section>

      {/* What you'll learn section */}
      <section className="learn-section">
        <div className="section-header">
          <div className="section-icon">🔍</div>
          <h2>এই ই-বুকে কী কী থাকছে?</h2>
        </div>

        <h3 className="section-subtitle">যা যা শিখবেন</h3>
        <p className="section-description">
          বয়স কমানোর প্রতিটি বৈজ্ঞানিক পদ্ধতি এবং প্রাকৃতিক কৌশল বিস্তারিত
        </p>

        <div className="learn-grid">
          {[
            {
              number: 1,
              title: 'Biological Age vs Chronological Age',
              desc: 'দুই ধরনের বয়স বুঝুন এবং কীভাবে Biological Age কমানো যায়',
            },
            {
              number: 2,
              title: 'বয়স বাড়ার আসল কারণ',
              desc: 'সেল ড্যামেজ, অক্সিডেটিভ স্ট্রেস ও ফ্রি র্যাডিক্যাল বুঝুন',
            },
            {
              number: 3,
              title: 'কোলাজেন উৎপাদন বৃদ্ধি',
              desc: 'স্কিনের ইলাস্টিসিটি ফিরিয়ে আনার প্রাকৃতিক উপায়',
            },
            {
              number: 4,
              title: 'হরমোন ব্যালান্স করার কৌশল',
              desc: 'হরমোন ভারসাম্য রক্ষা করে তারুণ্য ধরে রাখুন',
            },
            {
              number: 5,
              title: 'সেল রিজেনারেশন বৃদ্ধি',
              desc: 'কোষ পুনর্জন্ম ত্বরান্বিত করার প্রমাণিত পদ্ধতি',
            },
            {
              number: 6,
              title: 'Anti-Aging খাদ্যাভ্যাস',
              desc: 'কোন খাবার খেলে বয়স কমে এবং কী এড়াতে হবে',
            },
            {
              number: 7,
              title: 'ঘুম ও স্ট্রেস ম্যানেজমেন্ট',
              desc: 'গভীর ঘুম ও স্ট্রেস কমিয়ে তারুণ্য ধরে রাখুন',
            },
            {
              number: 8,
              title: 'স্কিনকেয়ার ও হাইড্রেশন',
              desc: 'সঠিক স্কিনকেয়ার রুটিন ও পানির গুরুত্ব',
            },
            {
              number: 9,
              title: 'ব্যায়াম ও ফিটনেস প্ল্যান',
              desc: 'বয়স কমানোর জন্য সঠিক ব্যায়ামের ধরন',
            },
            {
              number: 10,
              title: 'Daily Anti-Aging রুটিন',
              desc: 'সকাল থেকে রাত পর্যন্ত সম্পূর্ণ লাইফস্টাইল প্ল্যান',
            },
          ].map((item, index) => (
            <div className="learn-card" key={index}>
              <div className="learn-number">{item.number}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="features-section">
        <div className="section-header">
          <div className="section-icon">🎯</div>
          <h2>কেন এই ই-বুকটি বিশেষ?</h2>
        </div>

        <h3 className="section-subtitle">প্রিমিয়াম ফিচারসমূহ</h3>
        <p className="section-description">
          বৈজ্ঞানিক গবেষণার ভিত্তিতে তৈরি — বয়স কমানোর প্রতিটি প্রমাণিত পদ্ধতি সহজভাবে ব্যাখ্যা
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h4>১০০% বৈজ্ঞানিক পদ্ধতি</h4>
            <p>গবেষণা-ভিত্তিক প্রমাণিত কৌশল যা আসলেই কাজ করে।</p>
          </div>

          <div className="feature-card">
            <h4>প্রাকৃতিক সমাধান</h4>
            <p>কোনো ক্ষতিকর কেমিক্যাল নয় — সম্পূর্ণ প্রাকৃতিক উপায়।</p>
          </div>

          <div className="feature-card">
            <h4>দ্রুত ফলাফল</h4>
            <p>২-৩ মাসেই চোখে পড়ার মতো পরিবর্তন দেখতে পাবেন।</p>
          </div>

          <div className="feature-card">
            <h4>সহজ বাংলা ভাষা</h4>
            <p>জটিল বৈজ্ঞানিক বিষয় খুব সহজভাবে ব্যাখ্যা করা।</p>
          </div>

          <div className="feature-card">
            <h4>Daily Action Plan</h4>
            <p>প্রতিদিন কী করবেন তার পূর্ণাঙ্গ গাইডলাইন।</p>
          </div>

          <div className="feature-card">
            <h4>ইনস্ট্যান্ট ডাউনলোড</h4>
            <p>পারচেজের সাথে সাথেই PDF ফরম্যাটে ডাউনলোড করুন।</p>
          </div>
        </div>
      </section>

      {/* Bonus section */}

      {/* Testimonials section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>আমাদের সাফল্যের গল্প</h2>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">২,০০০+</div>
            <div className="stat-label">সন্তুষ্ট পাঠক</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">১২০+</div>
            <div className="stat-label">পৃষ্ঠা</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">৪.৯/৫</div>
            <div className="stat-label">রেটিং</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">২৪/৭</div>
            <div className="stat-label">সাপোর্ট</div>
          </div>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              &quot;মাত্র ২ মাসেই আমার চেহারায় অবিশ্বাস্য পরিবর্তন! আমার বয়স ৩৫ কিন্তু এখন দেখতে
              ২৫ এর মতো লাগে।&quot;
            </p>
            <div className="testimonial-author">
              <strong>রাহেলা খানম</strong> - ঢাকা
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              &quot;বৈজ্ঞানিক পদ্ধতিগুলো অসাধারণ! স্কিনে গ্লো ফিরে এসেছে এবং এনার্জি লেভেল অনেক
              বেড়েছে।&quot;
            </p>
            <div className="testimonial-author">
              <strong>তানভীর আহমেদ</strong> - চট্টগ্রাম
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <p className="testimonial-text">
              &quot;দামি ক্রিমে যা হয়নি, এই বইয়ের টিপসে তা সম্ভব হয়েছে। সবাই পড়া উচিত!&quot;
            </p>
            <div className="testimonial-author">
              <strong>নাসরিন সুলতানা</strong> - সিলেট
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>💫 এখনই বয়স ধরে রাখার গাইড সংগ্রহ করুন!</h2>
          <p className="cta-text">
            বয়স ১০ বছর কমানোর বৈজ্ঞানিক কৌশল এখন এক ই-বুকে। সীমিত সময়ের অফার — মাত্র ৳২৪৯ টাকায়।
          </p>
          <button className="cta-button">🚀 এখনই কিনুন</button>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="comparison-section">
        <div className="section-header">
          <div className="section-icon">🔥</div>
          <h2>সীমিত সময়ের অফার</h2>
        </div>

        <h3 className="section-subtitle">৬৭% ছাড়ে পাবেন সম্পূর্ণ প্যাকেজ</h3>

        <div className="comparison-cards">
          <div className="comparison-card other">
            <h3>বাজারে অন্যত্র</h3>
            <div className="comparison-price">৳১,৫০০</div>
            <ul className="comparison-list">
              <li className="negative">❌ শুধু তত্ত্বীয় জ্ঞান</li>
              <li className="negative">❌ বোনাস নেই</li>
              <li className="negative">❌ সাপোর্ট নেই</li>
            </ul>
          </div>

          <div className="comparison-card ours">
            <h3>আমাদের কাছে</h3>
            <div className="comparison-price">৳২৪৯</div>
            <ul className="comparison-list">
              <li className="positive">✅ বৈজ্ঞানিক পদ্ধতি</li>
              <li className="positive">✅ ২টি বোনাস ই-বুক</li>
              <li className="positive">✅ ২৪/৭ সাপোর্ট</li>
            </ul>
          </div>
        </div>

        {/* Countdown timer */}
        <div className="comparison-countdown">
          <div className="countdown-label">⏰ অফার শেষ হতে বাকি:</div>
          <div className="countdown-timer compact">
            <div className="time-unit">
              <div className="time-value">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="time-label">দিন</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit">
              <div className="time-value">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="time-label">ঘন্টা</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit">
              <div className="time-value">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="time-label">মিনিট</div>
            </div>
            <div className="time-separator">:</div>
            <div className="time-unit">
              <div className="time-value">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="time-label">সেকেন্ড</div>
            </div>
          </div>
        </div>

        <div className="security-features">
          <div className="security-item">সিকিউর সিস্টেম</div>
          <div className="security-item">ইনস্ট্যান্ট ডাউনলোড</div>
          <div className="security-item">লাইফটাইম এক্সেস</div>
        </div>
      </section>

      {/* FAQ section */}
      <section className="faq-section">
        <div className="section-header">
          <div className="section-icon">❓</div>
          <h2>প্রশ্ন ও উত্তর</h2>
        </div>

        <h3 className="section-subtitle">সাধারণত জিজ্ঞাসিত প্রশ্ন</h3>

        <div className="faq-list">
          {[
            {
              question: 'Q: এই ই-বুকটি কাদের জন্য?',
              answer:
                'যারা বয়সের ছাপ কমাতে চান, তরুণ দেখতে চান এবং স্বাস্থ্যকর জীবনযাপন করতে চান — সবার জন্যই এই বইটি উপযোগী। ২৫+ বয়সের যেকেউ এই বই থেকে উপকৃত হবেন।',
            },
            {
              question: 'Q: কতদিনে ফলাফল পাবো?',
              answer:
                'নিয়মিত অনুসরণ করলে ২-৩ মাসেই চোখে পড়ার মতো পরিবর্তন দেখতে পাবেন। তবে কিছু পরিবর্তন ১-২ সপ্তাহেই অনুভব করবেন।',
            },
            {
              question: 'Q: কি কোনো দামি প্রোডাক্ট কিনতে হবে?',
              answer:
                'না! এই বইয়ের সব টিপস প্রাকৃতিক এবং সহজলভ্য। কোনো দামি ক্রিম বা সাপ্লিমেন্ট কেনার দরকার নেই। খাদ্যাভ্যাস ও জীবনযাত্রায় পরিবর্তনই যথেষ্ট।',
            },
            {
              question: 'Q: পুরুষ ও মহিলা উভয়ের জন্য?',
              answer:
                'হ্যাঁ, এই বইটি পুরুষ ও মহিলা উভয়ের জন্যই সমান কার্যকর। বয়স কমানোর বিজ্ঞান সবার জন্যই একই।',
            },
            {
              question: 'Q: বোনাস ই-বুক দুটি কী?',
              answer:
                "বোনাসে পাবেন: (১) 'চিনি ছাড়া মিষ্টি জীবন' — Stevia ও Monk Fruit ব্যবহারের গাইড এবং (২) 'Healthy Food, Healthy Life' — খাদ্য ও ফিটনেসের সম্পূর্ণ নির্দেশিকা।",
            },
          ].map((faq, index) => (
            <div className="faq-item" key={index}>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                {faq.question}
                <span className="faq-toggle">{openFaq === index ? '−' : '+'}</span>
              </div>
              <div className={`faq-answer ${openFaq === index ? 'open' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <h2>💫 তরুণ থাকার সময় এখনই!</h2>
          <p className="final-cta-text">
            সময় থামানো না গেলেও, তার ছাপ থামানো যায় — বিজ্ঞান জানে কিভাবে!
            <br />
            মাত্র ৳২৪৯ টাকায় পাচ্ছেন ৩টি প্রিমিয়াম ই-বুক।
          </p>

          <div className="final-security-features">
            <div className="security-badge">সিকিউর পেমেন্ট</div>
            <div className="security-badge">ইনস্ট্যান্ট ডাউনলোড</div>
            <div className="security-badge">লাইফটাইম এক্সেস</div>
          </div>

          <button className="final-cta-button">🚀 এখনই অর্ডার করুন</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Age Maintain E-Book. সকল স্বত্ব সংরক্ষিত।</p>
      </footer>
    </div>
  )
}

export default AgeMaintainEbook
