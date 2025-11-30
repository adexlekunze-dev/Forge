"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/useToast';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons';
import MagicLinkForm from '@/components/auth/MagicLinkForm';
import ComparisonView from '@/components/shared/ComparisonView';
import CurrentStateMockup from '@/components/shared/CurrentStateMockup';
import BenchmarkCallout from '@/components/shared/BenchmarkCallout';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showTraditionalForm, setShowTraditionalForm] = useState(false);

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Redirecting to ${provider} authentication`,
      variant: 'info',
    });
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  // Handle magic link
  const handleMagicLink = (email: string) => {
    toast({
      title: `Magic link sent to ${email}`,
      variant: 'success',
    });
  };

  // Handle traditional login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Login successful!',
      variant: 'success',
    });
    router.push('/dashboard');
  };

  // Handle guest checkout
  const handleGuestCheckout = () => {
    toast({
      title: 'Proceeding as guest',
      variant: 'info',
    });
    router.push('/checkout');
  };

  // Current state mockup
  const currentState = (
    <CurrentStateMockup
      issues={[
        'No social login options',
        'No passwordless option',
        'No guest checkout',
        'No "Remember me" option',
      ]}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1 text-gray-600">Email address</label>
          <div className="bg-white border-2 border-gray-300 rounded px-3 py-2 text-gray-500">
            your@email.com
          </div>
        </div>
        
        <div>
          <label className="block text-sm mb-1 text-gray-600">Sykes password</label>
          <div className="bg-white border-2 border-gray-300 rounded px-3 py-2 text-gray-500">
            ••••••••
          </div>
        </div>
        
        <div className="bg-blue-500 text-white text-center py-2 rounded">
          Log in
        </div>
        
        <div className="text-sm text-blue-600 text-center">
          Forgot password?
        </div>
      </div>
    </CurrentStateMockup>
  );

  // Optimized version
  const optimizedState = (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Log in to your account
      </h2>
      
      {/* SECTION 1: Social Login */}
      <div className="mb-6">
        <SocialLoginButtons
          onGoogleClick={() => handleSocialLogin('Google')}
          onAppleClick={() => handleSocialLogin('Apple')}
        />
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">or</span>
        </div>
      </div>

      {/* SECTION 2: Magic Link */}
      <div className="mb-6">
        <MagicLinkForm
          onSubmit={handleMagicLink}
        />
      </div>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">or</span>
        </div>
      </div>

      {/* SECTION 3: Traditional Login */}
      <div className="mb-6">
        {!showTraditionalForm ? (
          <Button
            variant="ghost"
            onClick={() => setShowTraditionalForm(true)}
            className="w-full"
          >
            Login with password instead →
          </Button>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me
                </label>
              </div>
              
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        )}
      </div>

      {/* SECTION 4: Guest Checkout */}
      <div className="border-t pt-6">
        <Button
          onClick={handleGuestCheckout}
          variant="outline"
          className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
        >
          → Continue as guest (no login required)
        </Button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm mt-6 text-gray-600">
        New to Sykes?{' '}
        <a href="/signup" className="text-blue-600 hover:underline font-medium">
          Create account
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
          Login & Authentication Optimization
        </h1>
        
        <div className="space-y-6 sm:space-y-8">
          <ComparisonView
            currentState={currentState}
            optimizedState={optimizedState}
          />
        </div>

        <BenchmarkCallout
          title="Industry Benchmark"
          text="Gigya Research: Social login increases conversion 40-60% compared to traditional forms. Guest checkout option increases booking completion 20-45%. Passwordless authentication reduces abandonment by 35%."
          source="Baymard Institute, 2024; Gigya Identity Research, 2023"
          expectedImpact={{
            loginCompletion: "+35%",
            mobileLogin: "+50%",
            guestCheckoutAdoption: "+25%"
          }}
        />
      </div>
    </div>
  );
}

