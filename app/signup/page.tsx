"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/useToast';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import PasswordStrengthMeter from '@/components/auth/PasswordStrengthMeter';
import CurrentStateMockup from '@/components/shared/CurrentStateMockup';
import BenchmarkCallout from '@/components/shared/BenchmarkCallout';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [showCurrentState, setShowCurrentState] = useState(false);

  // Password requirements validation
  const passwordRequirements = [
    { label: '10 characters minimum', test: (p: string) => p.length >= 10 },
    { label: 'Include uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'Include lowercase letter', test: (p: string) => /[a-z]/.test(p) },
    { label: 'Include number', test: (p: string) => /[0-9]/.test(p) },
    { label: 'Include special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
  ];

  const handleSocialSignup = (provider: string) => {
    toast({
      title: `Redirecting to ${provider} authentication`,
      variant: 'info',
    });
    setTimeout(() => {
      router.push('/dashboard?welcome=true');
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check all password requirements
    const allPassed = passwordRequirements.every(req => req.test(password));
    if (!allPassed) {
      toast({
        title: 'Please meet all password requirements',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Account created successfully!',
      variant: 'success',
    });
    router.push('/dashboard?welcome=true');
  };

  // Current state mockup
  const currentState = (
    <CurrentStateMockup
      issues={[
        'No value proposition',
        'Too many fields upfront',
        'All marketing pre-checked',
        'Weak password requirements',
        'No social registration',
      ]}
    >
      <div className="space-y-3">
        <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
          First name
        </div>
        <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
          Last name
        </div>
        <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
          Email
        </div>
        <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
          Create password
        </div>
        <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-500">
          Phone number
        </div>
        <div className="bg-blue-500 text-white text-center py-1 rounded text-xs">
          Create Account
        </div>
      </div>
    </CurrentStateMockup>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 lg:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
          Sign-Up Experience Optimization
        </h1>

        {/* Current State Mockup (Collapsible) */}
        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <button 
            onClick={() => setShowCurrentState(!showCurrentState)}
            className="flex items-center justify-between w-full text-left"
          >
            <h3 className="text-lg font-bold text-gray-700">
              Current Sykes Sign-Up
            </h3>
            <span className="text-gray-500">
              {showCurrentState ? '▼ Hide' : '▶ Show'}
            </span>
          </button>
          
          {showCurrentState && (
            <div className="mt-4">
              {currentState}
            </div>
          )}
        </div>

        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Value Proposition Panel - 40% */}
          <div className="lg:col-span-2 p-6 sm:p-8 lg:p-12 rounded-lg flex flex-col justify-center items-center text-center">
            <div className="max-w-md">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-6 text-center whitespace-nowrap">
                Sykes Cottages
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                Join over 250,000 members enjoying faster bookings and exclusive benefits
              </p>
            </div>
          </div>

          {/* Sign-Up Form - 60% */}
          <div className="lg:col-span-3 bg-white p-4 sm:p-6 lg:p-8 xl:p-12 rounded-lg shadow-lg">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                Create your account
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Join and start earning rewards today
              </p>
              
              {/* Social Sign-Up */}
              <div className="mb-6">
                <SocialLoginButtons
                  onGoogleClick={() => handleSocialSignup('Google')}
                  onAppleClick={() => handleSocialSignup('Apple')}
                />
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">or continue with email</span>
                </div>
              </div>

              {/* Email Sign-Up Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                  {email && (
                    <p className="text-xs text-gray-600 mt-1">
                      We&apos;ll send a verification email to <strong>{email}</strong>
                    </p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Create password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  
                  {/* Interactive password requirements */}
                  {password && (
                    <div className="mt-3 space-y-2">
                      {passwordRequirements.map((req, index) => {
                        const isPassed = req.test(password);
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-2 text-sm ${
                              isPassed ? 'text-green-600' : 'text-gray-500'
                            }`}
                          >
                            {isPassed ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <X className="h-4 w-4" />
                            )}
                            <span>{req.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Password strength meter */}
                  <PasswordStrengthMeter password={password} />
                </div>

                {/* Marketing preferences - OPT-IN (not pre-checked) */}
                <div className="pt-4">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="emailMarketing"
                      checked={emailMarketing}
                      onCheckedChange={(checked) => setEmailMarketing(checked as boolean)}
                    />
                    <label htmlFor="emailMarketing" className="text-sm cursor-pointer">
                      Email me exclusive holiday deals and member-only offers
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full h-12 text-lg">
                  Create my Sykes account
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By signing up, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </form>

              <div className="text-center text-sm mt-6 text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline font-medium">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>

        <BenchmarkCallout
          title="Industry Benchmark"
          text="ConversionXL: Split-screen sign-up with clear value proposition increases conversion 25-35% vs. form-only approach. Social sign-up reduces abandonment 40%. Interactive password requirements reduce form errors 60%."
          source="ConversionXL, 2023; Baymard Institute, 2024"
          expectedImpact={{
            accountCreationRate: "+30%",
            formCompletion: "+25%",
            socialSignupAdoption: "45%"
          }}
        />
      </div>
    </div>
  );
}

