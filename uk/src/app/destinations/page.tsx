import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { StarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/solid';
import type { Destination } from '../types';

export const metadata: Metadata = {
  title: 'Sacred Destinations - Explore Rishikesh & Haridwar | Sacred Journeys',
  description: 'Explore sacred destinations in Uttarakhand. Visit Rishikesh for yoga & adventure, Haridwar for Ganga Aarti. Book guided tours with local experts today!',
  keywords: 'Rishikesh destinations, Haridwar attractions, spiritual tours, yoga capital, Ganga Aarti'
};

// Mock data - In real app, this would come from API/database
const destinations: Destination[] = [
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    slug: 'rishikesh',
    shortDescription: 'Known as the "Yoga Capital of the World," Rishikesh offers the perfect blend of spirituality and adventure.',
    description: 'Nestled in the foothills of the Himalayas along the banks of the holy Ganges, Rishikesh is globally recognized as the "Yoga Capital of the World" and offers an extraordinary blend of spiritual enlightenment and thrilling adventures.',
    image: '/images/rishikesh-overview.jpg',
    gallery: ['/images/rishikesh-1.jpg', '/images/rishikesh-2.jpg'],
    highlights: [
      'World-renowned yoga centers and ashrams',
      'White-water rafting on the Ganges',
      'Iconic suspension bridges - Laxman Jhula and Ram Jhula',
      'Evening Ganga Aarti at Triveni Ghat'
    ],
    location: {
      coordinates: [30.0869, 78.2676],
      address: 'Rishikesh, Uttarakhand, India'
    },
    bestTimeToVisit: 'October to February',
    averageRating: 4.8,
    reviewCount: 1250,
    activities: []
  },
  {
    id: 'haridwar',
    name: 'Haridwar',
    slug: 'haridwar',
    shortDescription: 'One of India\'s seven holiest cities, where the Ganges descends from the Himalayas to the plains.',
    description: 'One of India\'s seven holiest cities, Haridwar is where the Ganges descends from the Himalayas to the plains. Experience divine ceremonies, ancient temples, and sacred rituals.',
    image: '/images/haridwar-overview.jpg',
    gallery: ['/images/haridwar-1.jpg', '/images/haridwar-2.jpg'],
    highlights: [
      'Magnificent Ganga Aarti at Har Ki Pauri',
      'Ancient temples: Mansa Devi, Chandi Devi',
      'Sacred bathing ghats along the Ganges',
      'Kumbh Mela pilgrimage site'
    ],
    location: {
      coordinates: [29.9457, 78.1642],
      address: 'Haridwar, Uttarakhand, India'
    },
    bestTimeToVisit: 'October to March',
    averageRating: 4.7,
    reviewCount: 980,
    activities: []
  }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: destinations.map((destination, index) => ({
    '@type': 'TouristDestination',
    position: index + 1,
    name: destination.name,
    description: destination.description,
    image: destination.image,
    address: {
      '@type': 'PostalAddress',
      addressLocality: destination.location.address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: destination.location.coordinates[0],
      longitude: destination.location.coordinates[1]
    }
  }))
};

export default function DestinationsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-64 bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sacred Destinations</h1>
            <p className="text-xl max-w-2xl mx-auto px-4">
              Explore the spiritual heartland of India with our carefully curated destinations
            </p>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {destinations.map((destination) => (
              <article
                key={destination.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-64">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold">{destination.averageRating}</span>
                    <span className="text-gray-600 text-sm">({destination.reviewCount})</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span className="text-sm">{destination.location.address}</span>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {destination.name}
                  </h2>

                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {destination.shortDescription}
                  </p>

                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Highlights:</h3>
                    <ul className="space-y-2">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ClockIcon className="w-4 h-4" />
                      Best time: {destination.bestTimeToVisit}
                    </div>
                    
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-200"
                    >
                      Explore Destination
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-orange-600 text-white py-16">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Sacred Journey?</h2>
            <p className="text-xl mb-8">
              Let our expert local guides create unforgettable experiences tailored to your interests
            </p>
            <Link
              href="/contact"
              className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Guide
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
