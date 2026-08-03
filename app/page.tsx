import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            Sykes Holiday Cottages: Booking Experience Product Vision
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-light mb-2">
            Demonstrating Conversion Optimization Opportunities for Account, Loyalty & Booking Flows
          </p>
          <p className="text-sm sm:text-base lg:text-lg opacity-90">
            By Adekunle Okubena | Senior Ecommerce Specialist
          </p>
        </div>
      </header>

      {/* Problems Identified Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Current State Analysis: 23 Issues Identified
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1 - Authentication */}
            <Card className="p-6 border-l-4 border-red-500">
              <div className="text-red-500 text-4xl mb-3">✗</div>
              <h3 className="font-bold text-lg mb-2">Authentication</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• No social login</li>
                <li>• No magic link</li>
                <li>• No guest checkout</li>
                <li>• No &quot;Remember me&quot;</li>
                <li>• Basic forgot password</li>
              </ul>
            </Card>

            {/* Card 2 - Sign-Up */}
            <Card className="p-6 border-l-4 border-red-500">
              <div className="text-red-500 text-4xl mb-3">✗</div>
              <h3 className="font-bold text-lg mb-2">Sign-Up</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• No value proposition</li>
                <li>• Pre-checked marketing</li>
                <li>• Weak password rules</li>
                <li>• Single-step form</li>
                <li>• No social registration</li>
              </ul>
            </Card>

            {/* Card 3 - Checkout */}
            <Card className="p-6 border-l-4 border-red-500">
              <div className="text-red-500 text-4xl mb-3">✗</div>
              <h3 className="font-bold text-lg mb-2">Checkout</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 9 required fields</li>
                <li>• Hidden pricing</li>
                <li>• No inline validation</li>
                <li>• Confirm email anti-pattern</li>
                <li>• No urgency signals</li>
              </ul>
            </Card>

            {/* Card 4 - Dashboard */}
            <Card className="p-6 border-l-4 border-red-500">
              <div className="text-red-500 text-4xl mb-3">✗</div>
              <h3 className="font-bold text-lg mb-2">Dashboard</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• No personalization</li>
                <li>• No loyalty program</li>
                <li>• Non-interactive</li>
                <li>• Generic welcome</li>
                <li>• No gamification</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Solutions Overview Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Optimizations Implemented
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Card 1 - Authentication */}
            <Card className="p-6 border-l-4 border-green-500">
              <div className="text-green-500 text-4xl mb-3">✓</div>
              <h3 className="font-bold text-lg mb-2">Authentication</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Social login (Google, Apple)</li>
                <li>• Magic link option</li>
                <li>• Guest checkout</li>
                <li>• Remember me checkbox</li>
                <li>• Password visibility toggle</li>
              </ul>
            </Card>

            {/* Card 2 - Sign-Up */}
            <Card className="p-6 border-l-4 border-green-500">
              <div className="text-green-500 text-4xl mb-3">✓</div>
              <h3 className="font-bold text-lg mb-2">Sign-Up</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Split-screen with benefits</li>
                <li>• Interactive password meter</li>
                <li>• Opt-in marketing</li>
                <li>• Progressive disclosure</li>
                <li>• Social registration</li>
              </ul>
            </Card>

            {/* Card 3 - Checkout */}
            <Card className="p-6 border-l-4 border-green-500">
              <div className="text-green-500 text-4xl mb-3">✓</div>
              <h3 className="font-bold text-lg mb-2">Checkout</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Reduced to 5 fields</li>
                <li>• Transparent pricing</li>
                <li>• Inline validation</li>
                <li>• Smart defaults</li>
                <li>• Urgency signals</li>
              </ul>
            </Card>

            {/* Card 4 - Dashboard */}
            <Card className="p-6 border-l-4 border-green-500">
              <div className="text-green-500 text-4xl mb-3">✓</div>
              <h3 className="font-bold text-lg mb-2">Dashboard</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Personalized welcome</li>
                <li>• Interactive loyalty</li>
                <li>• Gamification elements</li>
                <li>• Trip countdown</li>
                <li>• Quick actions</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
            Explore Optimizations
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
            {/* Login Demo Card */}
            <Link href="/login" className="group">
              <Card className="p-6 sm:p-8 hover:shadow-2xl transition-shadow border-2 border-transparent group-hover:border-blue-500 min-h-[44px]">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🔐</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-blue-600">
                  1. Login & Authentication
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Social login, magic link, guest checkout
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm sm:text-base">
                  View Demo →
                </div>
              </Card>
            </Link>

            {/* Sign-Up Demo Card */}
            <Link href="/signup" className="group">
              <Card className="p-6 sm:p-8 hover:shadow-2xl transition-shadow border-2 border-transparent group-hover:border-blue-500 min-h-[44px]">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">📝</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-blue-600">
                  2. Sign-Up Experience
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Split-screen with value proposition
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm sm:text-base">
                  View Demo →
                </div>
              </Card>
            </Link>

            {/* Checkout Demo Card */}
            <Link href="/checkout" className="group">
              <Card className="p-6 sm:p-8 hover:shadow-2xl transition-shadow border-2 border-transparent group-hover:border-blue-500 min-h-[44px]">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🛒</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-blue-600">
                  3. Booking Checkout
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Streamlined single-page flow
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm sm:text-base">
                  View Demo →
                </div>
              </Card>
            </Link>

            {/* Dashboard Demo Card */}
            <Link href="/dashboard" className="group">
              <Card className="p-6 sm:p-8 hover:shadow-2xl transition-shadow border-2 border-transparent group-hover:border-blue-500 min-h-[44px]">
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">⭐</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-blue-600">
                  4. Loyalty Dashboard
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                  Interactive loyalty & gamification
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm sm:text-base">
                  View Demo →
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
            Discovery Methodology
          </h2>
          
          <Card className="p-4 sm:p-6 lg:p-8">
            <p className="text-center text-gray-700 mb-6">
              Problems were systematically identified through competitive analysis, heuristic evaluation, and industry research.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center">
                <div className="text-4xl mb-2">🔍</div>
                <h3 className="font-bold mb-2">Heuristic Evaluation</h3>
                <p className="text-sm text-gray-600">
                  Nielsen Norman 10 principles + Baymard 150+ guidelines
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <h3 className="font-bold mb-2">Competitive Benchmarking</h3>
                <p className="text-sm text-gray-600">
                  Analyzed Airbnb, Booking.com, Vrbo, Cottages.com
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-bold mb-2">Rapid Prototyping</h3>
                <p className="text-sm text-gray-600">
                  Functional demo built in 5 days
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <Link href="/methodology">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  View Full Discovery Methodology →
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

