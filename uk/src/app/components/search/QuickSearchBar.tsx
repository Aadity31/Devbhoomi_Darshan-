'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, MapPinIcon, CalendarDaysIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function QuickSearchBar() {
  const router = useRouter();
  const [searchData, setSearchData] = useState({
    destination: '',
    activity: '',
    date: '',
    guests: 1
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      destination: searchData.destination,
      activity: searchData.activity,
      date: searchData.date,
      guests: searchData.guests.toString()
    });
    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <section className="relative -mt-20 z-20 max-w-6xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Journey</h2>
          <p className="text-gray-600">Search for destinations, activities, and guides</p>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
          {/* Destination Search */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPinIcon className="w-4 h-4 inline mr-1" />
              Destination
            </label>
            <select
              value={searchData.destination}
              onChange={(e) => setSearchData(prev => ({ ...prev, destination: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Destinations</option>
              <option value="rishikesh">Rishikesh</option>
              <option value="haridwar">Haridwar</option>
              <option value="both">Both Cities</option>
            </select>
          </div>

          {/* Activity Type */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MagnifyingGlassIcon className="w-4 h-4 inline mr-1" />
              Activity Type
            </label>
            <select
              value={searchData.activity}
              onChange={(e) => setSearchData(prev => ({ ...prev, activity: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Activities</option>
              <option value="spiritual">Spiritual</option>
              <option value="adventure">Adventure</option>
              <option value="cultural">Cultural</option>
              <option value="trekking">Trekking</option>
            </select>
          </div>

          {/* Date */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarDaysIcon className="w-4 h-4 inline mr-1" />
              Travel Date
            </label>
            <input
              type="date"
              value={searchData.date}
              onChange={(e) => setSearchData(prev => ({ ...prev, date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Guests & Search Button */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <UserGroupIcon className="w-4 h-4 inline mr-1" />
                Guests
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={searchData.guests}
                onChange={(e) => setSearchData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              Search Now
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
