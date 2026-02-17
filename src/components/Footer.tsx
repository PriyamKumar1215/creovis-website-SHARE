'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 border-t border-dark-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-lg"></div>
              <span className="font-bold text-xl">Creovis</span>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed">
              Premium digital growth agency transforming businesses through strategic marketing and innovative design.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <Link href="/services" className="hover:text-accent-500 transition-colors">
                  Marketing Strategy
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent-500 transition-colors">
                  Branding
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent-500 transition-colors">
                  Web Design
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-accent-500 transition-colors">
                  Video Editing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-dark-400">
              <li>
                <Link href="/about" className="hover:text-accent-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-accent-500 transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/book-call" className="hover:text-accent-500 transition-colors">
                  Book a Call
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Get In Touch</h3>
            <ul className="space-y-3 text-sm text-dark-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent-500" />
                <a href="mailto:hello@creovis.co" className="hover:text-accent-500 transition-colors">
                  hello@creovis.co
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent-500" />
                <a href="tel:+919876543210" className="hover:text-accent-500 transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent-500" />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-dark-800 pt-8 mb-8">
          <div className="flex items-center justify-center gap-6 mb-8">
            <a href="#" className="text-dark-400 hover:text-accent-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-dark-400 hover:text-accent-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-dark-400 hover:text-accent-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-dark-400 hover:text-accent-500 transition-colors">
              <Instagram className="w-5 h-5" />