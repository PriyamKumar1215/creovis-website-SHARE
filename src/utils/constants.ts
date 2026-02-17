export const SITE_NAME = 'Creovis';
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://creovis.co';
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://creovis.co/api';

export const CONTACT_EMAIL = 'hello@creovis.co';
export const CONTACT_PHONE = '+91 98765 43210';
export const CONTACT_ADDRESS = 'Mumbai, India';

export const SERVICES = [
  {
    id: 'marketing',
    name: 'Marketing Strategy',
    description: 'Data-driven strategies to accelerate your growth and market reach.',
    price: 49999,
    duration: 60,
  },
  {
    id: 'branding',
    name: 'Branding',
    description: 'Craft a unique identity that resonates with your target audience.',
    price: 79999,
    duration: 90,
  },
  {
    id: 'web',
    name: 'Website Creation',
    description: 'High-performance websites built with cutting-edge technology.',
    price: 99999,
    duration: 120,
  },
  {
    id: 'video',
    name: 'Video Editing',
    description: 'Compelling video content that tells your brand story.',
    price: 39999,
    duration: 30,
  },
  {
    id: 'social',
    name: 'Social Media Management',
    description: 'Build engaged communities and drive meaningful interactions.',
    price: 29999,
    duration: 30,
  },
  {
    id: 'performance',
    name: 'Performance Marketing',
    description: 'Maximize ROI with targeted campaigns and continuous optimization.',
    price: 59999,
    duration: 60,
  },
];

export const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    company: 'TechVenture Labs',
    content:
      'Creovis transformed our digital presence. Their strategic approach and creative execution resulted in 250% revenue growth in just 6 months.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Marketing Director',
    company: 'FashionHub India',
    content:
      'Professional, responsive, and results-driven. The team understood our vision and delivered beyond expectations. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Amit Patel',
    role: 'Managing Director',
    company: 'Digital Solutions Inc',
    content:
      'Working with Creovis was a game-changer for our brand. Their expertise in branding and digital marketing is unparalleled.',
    rating: 5,
  },
];

export const NAVIGATION_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const SOCIAL_LINKS = [
  { platform: 'linkedin', url: 'https://linkedin.com/company/creovis' },
  { platform: 'twitter', url: 'https://twitter.com/creovis' },
  { platform: 'instagram', url: 'https://instagram.com/creovis' },
  { platform: 'facebook', url: 'https://facebook.com/creovis' },
];