'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

const heroSlides = [
  {
    id: 1,
    image: '/images/rishikesh-ganga-arti.jpg',
    title: 'Discover Sacred Adventures in Rishikesh & Haridwar',
    subtitle: 'Experience the spiritual heart of India with expert local guides, adventure activities, and customized spiritual journeys along the holy Ganges',
    cta: 'Book Trip Now',
    secondaryCta: 'Watch Video'
  },
  {
    id: 2,
    image: '/images/river-rafting-rishikesh.jpg',
    title: 'Thrilling Adventures Await',
    subtitle: 'From white-water rafting to bungee jumping, experience heart-pounding adventures in the lap of the Himalayas',
    cta: 'Explore Activities',
    secondaryCta: 'View Gallery'
  },
  {
    id: 3,
    image: '/images/yoga-ashram-rishikesh.jpg',
    title: 'Find Your Inner Peace',
    subtitle: 'Join authentic yoga retreats and meditation sessions at world-renowned ashrams guided by experienced teachers',
    cta: 'Book Retreat',
    secondaryCta: 'Learn More'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentHero.image}
          alt={currentHero.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {currentHero.title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
          {currentHero.subtitle}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/packages"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            {currentHero.cta}
            <ChevronRightIcon className="w-5 h-5" />
          </Link>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-2">
            <PlayCircleIcon className="w-6 h-6" />
            {currentHero.secondaryCta}
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
