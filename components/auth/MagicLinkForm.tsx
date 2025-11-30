"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle } from 'lucide-react';

interface MagicLinkFormProps {
  onSubmit: (email: string) => void;
  successMessage?: string;
}

export default function MagicLinkForm({
  onSubmit,
  successMessage,
}: MagicLinkFormProps) {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    onSubmit(email);
    setShowSuccess(true);
    
    // Reset after 5 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setEmail('');
    }, 5000);
  };

  if (showSuccess) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center gap-2 text-green-700">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Magic link sent!</span>
        </div>
        <p className="text-sm text-green-600 mt-1">
          {successMessage || `Check your email at ${email} for the login link`}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-medium">
        Email address
      </label>
      <div className="flex gap-2">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Send Magic Link
        </Button>
      </div>
    </form>
  );
}



