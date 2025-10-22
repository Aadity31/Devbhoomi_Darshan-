'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  StarIcon, 
  MapPinIcon, 
  EyeIcon, 
  HeartIcon,
  ArrowRightIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

// Types
interface FeaturedDestination {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  popularActivities: string[];
  bestTimeToVisit: string;
  startingPrice: number;
  badgeText?: string;
  badgeType?: 'popular' | 'trending' | 'new';
}

// Mock data - In real app, this would come from props or API
const featuredDestinations: FeaturedDestination[] = [
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    slug: 'rishikesh',
    shortDescription: 'The Yoga Capital of the World offering spiritual retreats and thrilling adventures along the holy Ganges River.',
    image: '/images/destinations/rishikesh-featured.jpg',
    location: 'Uttarakhand, India',
    rating: 4.8,
    reviewCount: 1250,
    popularActivities: ['Yoga Retreats', 'River Rafting', 'Temple Visits'],
    bestTimeToVisit: 'Oct - Feb',
    startingPrice: 2999,
    badgeText: 'Most Popular',
    badgeType: 'popular'
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    slug: 'haridwar',
    shortDescription: 'One of India\'s seven holiest cities where the Ganges descends from the Himalayas to the plains.',
    image: '/images/destinations/haridwar-featured.jpg',
    location: 'Uttarakhand, India',
    rating: 4.7,
    reviewCount: 980,
    popularActivities: ['Ganga Aarti', 'Temple Tours', 'Spiritual Walks'],
    bestTimeToVisit: 'Oct - Mar',
    startingPrice: 2499,
    badgeText: 'Sacred Journey',
    badgeType: 'trending'
  }
];

// Badge Component
interface BadgeProps {
  text: string;
  type: 'popular' | 'trending' | 'new';
}

const Badge: React.FC<BadgeProps> = ({ text, type }) => {
  const getBadgeStyles = () => {
    switch (type) {
      case 'popular':
        return 'bg-orange-500 text-white';
      case 'trending':
        return 'bg-purple-500 text-white';
      case 'new':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyles()}`}>
      {text}
    </span>
  );
};

// Destination Card Component
interface DestinationCardProps {
  destination: FeaturedDestination;
  isLiked: boolean;
  onLikeToggle: (destinationId: string) => void;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ 
  destination, 
  isLiked, 
  onLikeToggle 
}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        {!imageError ? (
          <Image
            src={destination.image}
            alt={`${destination.name} - ${destination.shortDescription}`}
            fill
            className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
              imageLoading ? 'blur-sm' : 'blur-0'
            }`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={destination.badgeType === 'popular'}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <EyeIcon className="w-12 h-12 mx-auto mb-2" />
              <span className="text-sm">Image unavailable</span>
            </div>
          </div>
        )}
        
        {/* Loading overlay */}
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Loading...</div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

        {/* Top badges and controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {destination.badgeText && destination.badgeType && (
            <Badge text={destination.badgeText} type={destination.badgeType} />
          )}
          
          <button
            onClick={(e) => {
              e.preventDefault();
              onLikeToggle(destination.id);
            }}
            className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors duration-200"
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isLiked ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600 hover:text-red-500" />
            )}
          </button>
        </div>

        {/* Rating badge */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
          <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-semibold text-sm text-gray-900">{destination.rating}</span>
          <span className="text-xs text-gray-600">({destination.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 mb-3">
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">{destination.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
          {destination.name}
        </h3>

        {/* Description */}
        <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
          {destination.shortDescription}
        </p>

        {/* Activities */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Popular Activities:</h4>
          <div className="flex flex-wrap gap-2">
            {destination.popularActivities.slice(0, 3).map((activity, index) => (
              <span
                key={index}
                className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs font-medium border border-orange-200"
              >
                {activity}
              </span>
            ))}
            {destination.popularActivities.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{destination.popularActivities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Best time and price */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ClockIcon className="w-4 h-4" />
            <span>Best time: {destination.bestTimeToVisit}</span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ₹{destination.startingPrice.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-gray-500">per person</div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/destinations/${destination.slug}`}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-semibold text-center block transition-all duration-300 hover:shadow-lg group-hover:bg-orange-700 flex items-center justify-center gap-2"
        >
          Explore Destination
          <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </article>
  );
};

// Main FeaturedDestinations Component
const FeaturedDestinations: React.FC = () => {
  const [likedDestinations, setLikedDestinations] = useState<Set<string>>(new Set());

  const handleLikeToggle = (destinationId: string) => {
    setLikedDestinations(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(destinationId)) {
        newLiked.delete(destinationId);
      } else {
        newLiked.add(destinationId);
      }
      return newLiked;
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Sacred Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover Your Perfect
            <span className="text-orange-600 block">Spiritual Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the spiritual heartland of India with our carefully curated destinations, 
            each offering unique experiences from ancient temples to adventure sports.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {featuredDestinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isLiked={likedDestinations.has(destination.id)}
              onLikeToggle={handleLikeToggle}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold border-2 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 hover:shadow-lg"
          >
            View All Destinations
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDestinations;
