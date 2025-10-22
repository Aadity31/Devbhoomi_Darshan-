'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
  PlayIcon,
  PauseIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// Types
interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  location: string;
  designation?: string;
  rating: number;
  review: string;
  activity: string;
  date: string;
  verified: boolean;
  images?: string[];
}

// Mock testimonials data
const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '/images/testimonials/sarah-johnson.jpg',
    location: 'New York, USA',
    designation: 'Yoga Instructor',
    rating: 5,
    review: 'The Ganga Aarti experience in Haridwar was absolutely divine. Our guide Rajesh made sure we got the best spots and explained every ritual beautifully. The spiritual energy was overwhelming and transformative.',
    activity: 'Evening Ganga Aarti',
    date: '2025-09-15',
    verified: true,
    images: ['/images/testimonials/sarah-trip-1.jpg', '/images/testimonials/sarah-trip-2.jpg']
  },
  {
    id: '2',
    name: 'Amit Sharma',
    avatar: '/images/testimonials/amit-sharma.jpg',
    location: 'Delhi, India',
    designation: 'Software Engineer',
    rating: 5,
    review: 'River rafting in Rishikesh was thrilling! The platform made booking so easy and the guides were professional and fun. Safety was their top priority and we felt completely secure throughout the adventure.',
    activity: 'White Water Rafting',
    date: '2025-09-10',
    verified: true
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    avatar: '/images/testimonials/maria-rodriguez.jpg',
    location: 'Barcelona, Spain',
    designation: 'Travel Blogger',
    rating: 5,
    review: 'My yoga retreat in Rishikesh was life-changing. The ashram was peaceful, the teachers were incredibly knowledgeable, and the sunrise sessions by the Ganges were magical. Highly recommended for spiritual seekers.',
    activity: 'Sunrise Yoga Session',
    date: '2025-09-08',
    verified: true,
    images: ['/images/testimonials/maria-trip-1.jpg']
  },
  {
    id: '4',
    name: 'James Wilson',
    avatar: '/images/testimonials/james-wilson.jpg',
    location: 'London, UK',
    designation: 'Adventure Enthusiast',
    rating: 4,
    review: 'Bungee jumping from 83 meters was the most exhilarating experience of my life! The safety standards were excellent and the staff made sure I felt confident before the jump. An absolute must-do in Rishikesh.',
    activity: 'Bungee Jumping',
    date: '2025-09-05',
    verified: true
  },
  {
    id: '5',
    name: 'Priya Patel',
    avatar: '/images/testimonials/priya-patel.jpg',
    location: 'Mumbai, India',
    designation: 'Marketing Manager',
    rating: 5,
    review: 'The temple tour in Haridwar was incredibly enlightening. Our local guide shared fascinating stories about each temple\'s history and significance. The entire experience felt authentic and deeply spiritual.',
    activity: 'Ancient Temples Tour',
    date: '2025-09-03',
    verified: true
  },
  {
    id: '6',
    name: 'David Chen',
    avatar: '/images/testimonials/david-chen.jpg',
    location: 'Sydney, Australia',
    designation: 'Photographer',
    rating: 5,
    review: 'The Himalayan trek was breathtaking! Hidden waterfalls, pristine nature trails, and stunning mountain views. Our guide was very knowledgeable about local flora and fauna. Perfect for nature photographers.',
    activity: 'Himalayan Nature Trek',
    date: '2025-08-28',
    verified: true,
    images: ['/images/testimonials/david-trip-1.jpg', '/images/testimonials/david-trip-2.jpg']
  }
];

// Star Rating Component
interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 5, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(maxRating)].map((_, index) => (
        <StarSolidIcon
          key={index}
          className={`${sizeClasses[size]} ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isActive }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`transition-all duration-500 ${
      isActive ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
    }`}>
      <article className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 mx-2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
          <ChatBubbleLeftRightIcon className="w-full h-full text-orange-600" />
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-6 relative z-10">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {!imageError ? (
              <Image
                src={testimonial.avatar}
                alt={`${testimonial.name} - Customer photo`}
                width={64}
                height={64}
                className="rounded-full object-cover ring-4 ring-orange-100"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {testimonial.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-lg text-gray-900">{testimonial.name}</h3>
              <StarRating rating={testimonial.rating} size="sm" />
            </div>
            <p className="text-sm text-gray-600 mb-1">{testimonial.location}</p>
            {testimonial.designation && (
              <p className="text-sm text-orange-600 font-medium">{testimonial.designation}</p>
            )}
          </div>
        </div>

        {/* Review Text */}
        <blockquote className="text-gray-700 leading-relaxed mb-6 relative z-10">
          <ChatBubbleLeftRightIcon className="w-6 h-6 text-orange-300 mb-2" />
          <p className="text-lg italic">"{testimonial.review}"</p>
        </blockquote>

        {/* Activity & Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium">
            {testimonial.activity}
          </span>
          <span>{new Date(testimonial.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>

        {/* Trip Images */}
        {testimonial.images && testimonial.images.length > 0 && (
          <div className="flex gap-2 mt-4">
            {testimonial.images.slice(0, 3).map((image, index) => (
              <div key={index} className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={`${testimonial.name}'s trip photo ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
            {testimonial.images.length > 3 && (
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-medium">
                +{testimonial.images.length - 3}
              </div>
            )}
          </div>
        )}
      </article>
    </div>
  );
};

// Main TestimonialsSection Component
const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  };

  const [currentItemsPerView, setCurrentItemsPerView] = useState(itemsPerView.desktop);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCurrentItemsPerView(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setCurrentItemsPerView(itemsPerView.tablet);
      } else {
        setCurrentItemsPerView(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - currentItemsPerView);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, isPaused, maxIndex]);

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Calculate visible testimonials
  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + currentItemsPerView);

  // Statistics
  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;
  const totalReviews = testimonials.length;
  const verifiedCount = testimonials.filter(t => t.verified).length;

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Customer Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Travelers
            <span className="text-orange-600 block">Say About Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Real experiences from real travelers who discovered the magic of Rishikesh and Haridwar with our expert guides.
          </p>

          {/* Statistics */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <StarRating rating={Math.floor(averageRating)} />
                <span className="font-bold text-2xl text-gray-900 ml-2">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="font-bold text-2xl text-gray-900 mb-2">
                {totalReviews}+
              </div>
              <p className="text-sm text-gray-600">Happy Travelers</p>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="text-center">
              <div className="font-bold text-2xl text-gray-900 mb-2">
                {verifiedCount}
              </div>
              <p className="text-sm text-gray-600">Verified Reviews</p>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Previous testimonials"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Next testimonials"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                isActive={true}
              />
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          {/* Dots Navigation */}
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-orange-600 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial set ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={toggleAutoPlay}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200"
            aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isAutoPlaying ? (
              <PauseIcon className="w-4 h-4 text-gray-600" />
            ) : (
              <PlayIcon className="w-4 h-4 text-gray-600" />
            )}
            <span className="text-sm text-gray-600">
              {isAutoPlaying ? 'Pause' : 'Play'}
            </span>
          </button>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Your Own Story?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied travelers and experience the magic of sacred India with our expert local guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
                Book Trip Now
              </button>
              <button className="bg-transparent border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200">
                Contact Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
