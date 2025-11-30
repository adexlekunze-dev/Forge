"use client"

import { Button } from '@/components/ui/button';
import { Chrome, Apple } from 'lucide-react';

interface SocialLoginButtonsProps {
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
  variant?: 'default' | 'signup';
}

export default function SocialLoginButtons({
  onGoogleClick,
  onAppleClick,
  variant = 'default',
}: SocialLoginButtonsProps) {
  return (
    <div className="space-y-3">
      <Button
        onClick={onGoogleClick}
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12"
      >
        <Chrome className="h-5 w-5" />
        <span>Continue with Google</span>
      </Button>
      
      <Button
        onClick={onAppleClick}
        variant="outline"
        className="w-full flex items-center justify-center gap-2 h-12 bg-black text-white hover:bg-gray-800"
      >
        <Apple className="h-5 w-5" />
        <span>Continue with Apple</span>
      </Button>
    </div>
  );
}



