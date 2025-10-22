export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  highlights: string[];
  location: {
    coordinates: [number, number];
    address: string;
  };
  bestTimeToVisit: string;
  averageRating: number;
  reviewCount: number;
  activities: Activity[];
}

export interface Activity {
  id: string;
  name: string;
  slug: string;
  type: 'adventure' | 'spiritual' | 'cultural' | 'food' | 'trekking';
  description: string;
  duration: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  difficulty: 'easy' | 'moderate' | 'difficult';
  location: string;
  images: string[];
  reviews: Review[];
  rating: number;
  includes: string[];
}

export interface TravelPackage {
  id: string;
  name: string;
  slug: string;
  type: 'spiritual' | 'adventure' | 'combined' | 'custom';
  duration: {
    days: number;
    nights: number;
  };
  price: {
    starting: number;
    currency: string;
  };
  destinations: string[];
  activities: string[];
  includes: string[];
  itinerary: ItineraryDay[];
  images: string[];
  rating: number;
  reviewCount: number;
}

export interface LocalGuide {
  id: string;
  name: string;
  avatar: string;
  specialities: string[];
  languages: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  price: number;
  availability: boolean;
  certifications: string[];
  description: string;
  location: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface SearchFilters {
  location?: string;
  activityType?: Activity['type'];
  priceRange?: [number, number];
  duration?: string;
  difficulty?: Activity['difficulty'];
  rating?: number;
  date?: string;
  guests?: number;
}
